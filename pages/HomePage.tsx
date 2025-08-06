
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, UsersIcon, ArrowRightIcon, StarIcon, YoutubeIcon, GridIcon } from '../components/icons';
import { useContent } from '../hooks/useContent';
import { NewsArticle, Artist, DisplayTrack, SpotlightItem, Track, Release, SubscriptionTier } from '../types';
import toast from 'react-hot-toast';

const isStreamableUrl = (url?: string): boolean => {
    if (!url) return false;
    const playableExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];
    const lowercasedUrl = url.toLowerCase();
    if (lowercasedUrl.startsWith('https://storage.googleapis.com/')) {
        return true;
    }
    return playableExtensions.some(ext => lowercasedUrl.endsWith(ext));
};

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl font-bold text-white">{value}</p>
        <p className="text-sm text-brand-text-secondary">{label}</p>
    </div>
);

const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => (
    <Link to={`/artists/${artist.id}`} className="group relative overflow-hidden rounded-lg block h-96">
        <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white">{artist.name}</h3>
            <p className="text-brand-accent">{artist.genre}</p>
        </div>
    </Link>
);

const TrackCard: React.FC<{ track: DisplayTrack }> = ({ track }) => (
     <div className="bg-brand-surface/50 rounded-lg p-4 flex items-center space-x-4 hover:bg-brand-surface transition-colors duration-200">
        <img src={track.imageUrl} alt={track.title} className="w-20 h-20 rounded-md object-cover" />
        <div className="flex-grow">
            <h4 className="font-semibold text-white">{track.title}</h4>
            <p className="text-sm text-brand-text-secondary">{track.artist}</p>
        </div>
        <a href={track.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-primary/20 text-brand-primary p-3 rounded-full hover:bg-brand-primary hover:text-white transition-colors">
            <PlayIcon className="w-5 h-5" />
        </a>
    </div>
);

const NewsCard: React.FC<{ article: NewsArticle, index: number }> = ({ article, index }) => (
    <Link to={`/news/${index}`} className="bg-brand-surface/50 rounded-lg overflow-hidden group hover:bg-brand-surface transition-colors duration-300 flex flex-col">
        <div className="overflow-hidden">
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <p className="text-sm text-brand-text-secondary mb-2">{article.date}</p>
            <h3 className="text-xl font-bold text-white mb-2 flex-grow">{article.title}</h3>
            <p className="text-brand-text-secondary text-sm">{article.summary}</p>
        </div>
    </Link>
);

const getYouTubeEmbedUrl = (url: string, autoplay: boolean = false) => {
    if(!url) return null;
    try {
        const videoUrl = new URL(url);
        let videoId = videoUrl.searchParams.get('v');
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
        }
        if (videoUrl.hostname === 'youtu.be') {
            videoId = videoUrl.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
        }
    } catch (error) {
        console.error("Invalid YouTube URL", error);
        return null;
    }
    return null;
};

const FeaturedVideo: React.FC = () => {
    const { featuredVideoUrls } = useContent();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!featuredVideoUrls || featuredVideoUrls.length === 0) return null;
    
    const currentVideoUrl = featuredVideoUrls[currentIndex];
    const embedUrl = getYouTubeEmbedUrl(currentVideoUrl);

    if (!embedUrl) return (
        <div className="container mx-auto px-4 text-center">
             <p className="text-red-400">Invalid Featured Video URL provided in settings.</p>
        </div>
    );
    
    const goToPrevious = () => setCurrentIndex(prev => (prev === 0 ? featuredVideoUrls.length - 1 : prev - 1));
    const goToNext = () => setCurrentIndex(prev => (prev === featuredVideoUrls.length - 1 ? 0 : prev + 1));

    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white">Featured Video</h2>
                <p className="text-lg text-brand-text-secondary mt-2">Our latest premiere</p>
            </div>
            <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl shadow-brand-primary/20">
                    <iframe 
                        src={embedUrl}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                 {featuredVideoUrls.length > 1 && (
                    <>
                        <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors">
                            &#10094;
                        </button>
                        <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors">
                             &#10095;
                        </button>
                    </>
                 )}
            </div>
        </div>
    )
}

const VideoModal: React.FC<{ videoUrl: string, onClose: () => void }> = ({ videoUrl, onClose }) => {
    const embedUrl = getYouTubeEmbedUrl(videoUrl, true);
    if (!embedUrl) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={onClose}>
            <div className="relative w-full max-w-4xl aspect-video bg-black" onClick={(e) => e.stopPropagation()}>
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

interface EnrichedSpotlightItem {
    item: SpotlightItem;
    track: Track | null;
    release: Release | null;
    artist: Artist | null;
}

const SpotlightSection: React.FC<{ onPlay: (videoUrl: string) => void }> = ({ onPlay }) => {
    const { artists, spotlightItems } = useContent();
    
    const enrichedSpotlightItems = useMemo((): EnrichedSpotlightItem[] => {
        return spotlightItems
            .map(item => {
                if (!item.trackId) return { item, track: null, release: null, artist: null };
                
                for (const artist of artists) {
                    for (const release of artist.discography) {
                        const track = release.tracks.find(t => t.id === item.trackId);
                        if (track) {
                            return { item, track, release, artist };
                        }
                    }
                }
                return { item, track: null, release: null, artist: null };
            })
            .filter(enriched => enriched.track && enriched.release && enriched.artist);
    }, [artists, spotlightItems]);

    if (enrichedSpotlightItems.length === 0) return null;

    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white">S.M.T. Spotlight</h2>
                <p className="text-lg text-brand-text-secondary mt-2">Our hand-picked featured music videos</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {enrichedSpotlightItems.map(({item, track, release, artist}) => {
                    if(!track || !release || !artist) return null;
                    
                    const playUrl = item.videoUrl || track.sourceUrl;

                    return (
                        <div key={track.id} className="group cursor-pointer" onClick={() => playUrl && onPlay(playUrl)}>
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                                 <img src={release.coverImageUrl} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <PlayIcon className="w-16 h-16 text-white" />
                                 </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold text-white text-lg">{track.title}</h3>
                                <p className="text-brand-text-secondary text-sm">{artist.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
    const { artists, news, trendingTracks, playTrack, heroBackgroundImage, portalUrl } = useContent();
    const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

    const allTracks = useMemo(() => {
       return artists.flatMap(artist => 
            artist.discography.flatMap(release => 
                release.tracks.map(track => ({...track, artist, release}))
            )
       )
    }, [artists]);

    const handlePlayRandomTrack = () => {
        if (allTracks.length === 0) return;
        const freeTracks = allTracks.filter(t => 
            (!t.accessTier || t.accessTier === SubscriptionTier.FREE) && isStreamableUrl(t.sourceUrl)
        );
        if(freeTracks.length === 0) {
            toast.error("No streamable free tracks available at the moment.");
            return;
        };

        const randomTrack = freeTracks[Math.floor(Math.random() * freeTracks.length)];
        playTrack(randomTrack, randomTrack.release, randomTrack.artist);
    };

    return (
        <div className="bg-brand-dark">
            {playingVideoUrl && <VideoModal videoUrl={playingVideoUrl} onClose={() => setPlayingVideoUrl(null)} />}

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[90vh] flex items-center justify-center text-center text-white overflow-hidden"
                style={{ backgroundImage: `url(${heroBackgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                 {/* Floating dots */}
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-brand-primary/50" style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float 25s ease-in-out infinite`,
                        animationDelay: `${Math.random() * -25}s`
                    }}></div>
                ))}
                <div className="relative z-10 p-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4" style={{textShadow: '0 0 20px rgba(138, 66, 219, 0.5)'}}>TeO Music Studio</h1>
                    <p className="text-lg md:text-xl text-brand-text-secondary mb-4">TeO-CONGLOMERATE of all Life in creation</p>
                    <p className="max-w-3xl mx-auto text-base md:text-lg text-brand-text mb-8">
                        At TeO Music Studio, we're pioneering the future of music through artificial intelligence and human creativity. Our revolutionary CoAI artists represent a new era of musical expression, each with unique personalities and distinctive sounds that push the boundaries of what's possible.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                        <button onClick={handlePlayRandomTrack} className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity transform hover:scale-105">
                            <PlayIcon className="w-6 h-6" />
                            <span>Play Featured Track</span>
                        </button>
                         <Link to="/artists" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand-surface/50 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-brand-surface transition-colors transform hover:scale-105">
                            <UsersIcon className="w-6 h-6" />
                            <span>Meet Our Artists</span>
                        </Link>
                        <Link to="/constellation" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand-surface/50 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-brand-surface transition-colors transform hover:scale-105">
                            <GridIcon className="w-6 h-6" />
                            <span>Explore The Wave</span>
                        </Link>
                    </div>
                     <div className="flex justify-center items-center space-x-8 md:space-x-16">
                        <StatItem value={String(artists.length)} label="CoAI Artists" />
                        <StatItem value={String(allTracks.length)} label="Tracks" />
                        <StatItem value={String(artists.reduce((acc, a) => acc + a.discography.length, 0))} label="Releases" />
                        <StatItem value="1.2K+" label="Views" />
                    </div>
                </div>
            </section>
            
            {/* Featured Artists */}
            <section className="py-20 bg-brand-bg">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4 text-white">Featured CoAI Artists</h2>
                    <p className="text-lg text-brand-text-secondary mb-12 max-w-2xl mx-auto">Meet our revolutionary CoAI artists, each with their own unique personality and musical style</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                        {artists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
                    </div>
                    <Link to="/artists" className="inline-flex items-center space-x-2 text-brand-primary hover:text-white transition-colors duration-200">
                        <span>View All Artists</span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>
            </section>
            
            {/* Trending Tracks */}
            <section className="py-20 bg-brand-dark">
                 <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4 text-white">Trending Tracks</h2>
                    <p className="text-lg text-brand-text-secondary mb-12 max-w-2xl mx-auto">Discover the most popular tracks from our CoAI artists</p>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6 mb-12 text-left">
                        {trendingTracks.map(track => <TrackCard key={track.id} track={track} />)}
                    </div>
                    <Link to="/artists" className="inline-flex items-center space-x-2 text-brand-primary hover:text-white transition-colors duration-200">
                        <span>Browse All Music</span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>
            </section>
            
            {/* Latest News */}
            <section className="py-20 bg-brand-bg">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">Latest News</h2>
                        <p className="text-lg text-brand-text-secondary mt-2">Stay updated with the latest from TeO Music Studio</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.slice(0, 3).map((article, index) => <NewsCard key={index} article={article} index={index} />)}
                    </div>
                    {news.length > 3 && (
                         <div className="text-center mt-12">
                            <Link to="/news" className="inline-flex items-center space-x-2 text-brand-primary hover:text-white transition-colors duration-200">
                                <span>Browse All News</span>
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Spotlight Section */}
            <section className="py-20 bg-brand-dark">
                <SpotlightSection onPlay={setPlayingVideoUrl}/>
            </section>

             {/* Featured Video Section */}
            <section className="py-20 bg-brand-bg">
                <FeaturedVideo />
            </section>

            {/* Interactive Portal */}
            <section className="py-20 bg-brand-dark text-center">
                <h2 className="text-3xl font-bold text-white mb-8 animate-pulse" style={{ fontFamily: 'monospace' }}>...To YourSelf....</h2>
                <a href={portalUrl} target="_blank" rel="noopener noreferrer" 
                    className="inline-block relative w-48 h-48 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full animate-spin-slow">
                        <div className="absolute h-1/2 w-1/2 top-0 left-0 bg-gradient-to-br from-brand-primary to-transparent rounded-full opacity-70"></div>
                        <div className="absolute h-1/4 w-1/4 bottom-0 right-0 bg-gradient-to-tl from-brand-secondary to-transparent rounded-full opacity-50"></div>
                    </div>
                    <div className="absolute inset-2 bg-brand-dark rounded-full"></div>
                    <div className="absolute inset-4 border-2 border-brand-primary/50 rounded-full animate-portal-pulse"></div>
                    <div className="absolute inset-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-brand-primary font-bold text-lg tracking-widest uppercase group-hover:scale-110 group-hover:tracking-wider transition-all duration-300">Enter</span>
                    </div>
                </a>
            </section>
            
            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-brand-primary/80 to-brand-secondary/80">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Ready to Experience the Future of Music?</h2>
                    <p className="text-lg mb-8">Join thousands of music lovers discovering revolutionary CoAI-generated tracks</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/subscriptions" className="flex items-center space-x-2 bg-white text-brand-dark font-semibold px-8 py-3 rounded-full text-lg hover:bg-gray-200 transition-colors">
                            <StarIcon className="w-6 h-6" />
                            <span>View Tiers</span>
                        </Link>
                        <a href="https://www.youtube.com/channel/UCFGMuAEBRjmXSNmb6CdKbCg" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-red-700 transition-colors">
                            <YoutubeIcon className="w-6 h-6" />
                            <span>Watch on YouTube</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
