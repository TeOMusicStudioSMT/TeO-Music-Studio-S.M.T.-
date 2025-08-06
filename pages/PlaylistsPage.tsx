
import React, { useMemo, useState } from 'react';
import { useContent } from '../hooks/useContent';
import { Playlist, PlaylistCategory, CurrentlyPlayingTrack, SubscriptionTier } from '../types';
import { PlayIcon, MusicNoteIcon } from '../components/icons';
import toast from 'react-hot-toast';

const getYouTubeEmbedUrl = (url: string, autoplay: boolean = false) => {
    if(!url) return null;
    try {
        const videoUrl = new URL(url);
        let videoId = videoUrl.searchParams.get('v');
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
        }
        if (videoUrl.hostname === 'youtu.be') {
            videoId = videoUrl.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
        }
    } catch (error) {
        console.error("Invalid YouTube URL", error);
    }
    const standardMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
    if (standardMatch && standardMatch[1]) {
        return `https://www.youtube.com/embed/${standardMatch[1]}?rel=0&showinfo=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
    }
    const shortMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch && shortMatch[1]) {
        return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&showinfo=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
    }
    return null;
};

const VideoModal: React.FC<{ videoUrl: string, onClose: () => void }> = ({ videoUrl, onClose }) => {
    const embedUrl = getYouTubeEmbedUrl(videoUrl, true);
    if (!embedUrl) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={onClose}>
            <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl shadow-brand-primary/20" onClick={(e) => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute -top-10 right-0 text-white text-3xl font-bold">&times;</button>
                 <iframe
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>
    );
};

const isYouTubeUrl = (url?: string): boolean => {
    if (!url) return false;
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url);
};

const isStreamableUrl = (url?: string): boolean => {
    if (!url) return false;
    const playableExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];
    const lowercasedUrl = url.toLowerCase();
    if (lowercasedUrl.startsWith('https://storage.googleapis.com/')) {
        return true;
    }
    return playableExtensions.some(ext => lowercasedUrl.endsWith(ext));
};


const PlaylistCard: React.FC<{ item: Playlist, onPlayVideo: (url: string) => void }> = ({ item, onPlayVideo }) => {
    const { playPlaylist, allTracksMap } = useContent();
    const isVideo = isYouTubeUrl(item.externalUrl);
    
    const playableTrackIds = useMemo(() => 
        item.trackIds.filter(id => {
            const track = allTracksMap.get(id);
            return track && isStreamableUrl(track.sourceUrl);
        })
    , [item.trackIds, allTracksMap]);

    const canPlayInApp = playableTrackIds.length > 0;

    const handlePlayInApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!canPlayInApp) return;

        const tracksToPlay: CurrentlyPlayingTrack[] = playableTrackIds
            .map(trackId => allTracksMap.get(trackId))
            .filter((t): t is CurrentlyPlayingTrack => t !== undefined);

        if (tracksToPlay.length > 0) {
            playPlaylist(tracksToPlay);
            toast.success(`Playing playlist: ${item.title}`);
        } else {
            toast.error("Could not find playable tracks for this playlist.");
        }
    };

    const getHost = (url?: string) => {
        if (!url) return 'Link';
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return 'Link';
        }
    }

    return (
        <div className="group bg-brand-surface rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 flex flex-col">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden relative">
                <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-brand-text-secondary mt-2 text-sm flex-grow min-h-[60px]">
                    {item.description}
                </p>
                <div className="mt-4 pt-4 border-t border-brand-primary/10 space-y-2">
                    {canPlayInApp && (
                        <button 
                            onClick={handlePlayInApp}
                            className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <MusicNoteIcon className="w-5 h-5" />
                            Play in App
                        </button>
                    )}
                     {isVideo && (
                        <button
                            onClick={() => item.externalUrl && onPlayVideo(item.externalUrl)}
                             className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-opacity"
                        >
                            <PlayIcon className="w-5 h-5" />
                           Watch Video
                        </button>
                    )}
                    {!isVideo && item.externalUrl && item.externalUrl !== '#' && (
                         <a 
                            href={item.externalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full block text-center bg-brand-surface text-brand-text-secondary font-semibold py-2 rounded-lg hover:bg-brand-dark transition-colors"
                        >
                           Open on {getHost(item.externalUrl)}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const PlaylistSection: React.FC<{ title: string, playlists: Playlist[], onPlayVideo: (url: string) => void }> = ({ title, playlists, onPlayVideo }) => {
    if (playlists.length === 0) {
        return null;
    }
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {playlists.map(item => (
                    <PlaylistCard key={item.id} item={item} onPlayVideo={onPlayVideo} />
                ))}
            </div>
        </section>
    );
};

const PlaylistsPage: React.FC = () => {
    const { playlists } = useContent();
    const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

    const categoryOrder = [
        PlaylistCategory.TEO_OFFICIAL,
        PlaylistCategory.SMT_SELECTS,
        PlaylistCategory.SHOWCASE,
        PlaylistCategory.OCCASIONAL,
        PlaylistCategory.USER_PLAYLISTS,
    ];

    const groupedPlaylists = useMemo(() => {
        const groups: Record<string, Playlist[]> = {};
        for (const category of categoryOrder) {
            groups[category] = [];
        }

        playlists.forEach(p => {
            if (p.category && groups[p.category]) {
                groups[p.category].push(p);
            } else {
                if (!groups['Other']) groups['Other'] = [];
                groups['Other'].push(p);
            }
        });
        return groups;
    }, [playlists]);

    return (
        <div className="bg-brand-bg min-h-screen">
            {playingVideoUrl && <VideoModal videoUrl={playingVideoUrl} onClose={() => setPlayingVideoUrl(null)} />}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white">Curated Playlists</h1>
                    <p className="text-lg text-brand-text-secondary mt-4 max-w-3xl mx-auto">
                        Explore hand-picked collections of tracks from our artists and community, perfect for any mood or occasion.
                    </p>
                </div>
                
                {playlists.length > 0 ? (
                    <div>
                        {categoryOrder.map(category => (
                            <PlaylistSection
                                key={category}
                                title={category}
                                playlists={groupedPlaylists[category] || []}
                                onPlayVideo={setPlayingVideoUrl}
                            />
                        ))}
                         {groupedPlaylists['Other'] && groupedPlaylists['Other'].length > 0 && (
                             <PlaylistSection
                                title="Other"
                                playlists={groupedPlaylists['Other']}
                                onPlayVideo={setPlayingVideoUrl}
                            />
                         )}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-2xl text-white">No playlists yet.</p>
                        <p className="text-brand-text-secondary mt-2">Our curators are busy compiling new collections. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistsPage;
