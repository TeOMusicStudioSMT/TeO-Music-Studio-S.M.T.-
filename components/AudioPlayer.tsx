
import React, { useRef, useEffect, useState } from 'react';
import { useContent } from '../hooks/useContent';
import { PlayCircleIcon, PauseCircleIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from './icons';
import toast from 'react-hot-toast';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const isStreamableUrl = (url?: string): boolean => {
    if (!url) return false;
    const playableExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];
    const lowercasedUrl = url.toLowerCase();
    // Also check for googleapis storage URLs which don't have extensions but are streamable
    if (lowercasedUrl.startsWith('https://storage.googleapis.com/')) {
        return true;
    }
    return playableExtensions.some(ext => lowercasedUrl.endsWith(ext));
}

const AudioPlayer: React.FC = () => {
    const { currentTrack, playNext, playPrevious, clearCurrentTrack } = useContent();
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (currentTrack && isStreamableUrl(currentTrack.sourceUrl) && audio) {
            audio.src = currentTrack.sourceUrl;
            audio.play().then(() => setIsPlaying(true)).catch(error => {
                console.error("Audio play failed:", error);
                setIsPlaying(false);
            });
        } else if (currentTrack && !isStreamableUrl(currentTrack.sourceUrl)) {
             console.warn(`Attempted to play a non-streamable URL: ${currentTrack.sourceUrl}`);
             toast.error("This link isn't a direct audio file and can't be played here.", { id: 'stream-error' });
             clearCurrentTrack();
        } else if (!currentTrack && audio) {
            audio.pause();
            audio.src = '';
            setIsPlaying(false);
        }
    }, [currentTrack, clearCurrentTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        }
        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', playNext);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', playNext);
        };
    }, [playNext]);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio || !audio.src) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true));
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const time = Number(e.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    };

    if (!currentTrack) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-bg/90 backdrop-blur-sm border-t border-brand-primary/20 p-4 shadow-2xl">
            <audio ref={audioRef} />
            <div className="container mx-auto flex items-center justify-between gap-4">
                {/* Track Info */}
                <div className="flex items-center gap-4 w-1/4">
                    <img src={currentTrack.coverImageUrl} alt={currentTrack.releaseTitle} className="w-16 h-16 rounded-md object-cover" />
                    <div className="truncate">
                        <p className="font-bold text-white truncate">{currentTrack.title}</p>
                        <p className="text-sm text-brand-text-secondary truncate">{currentTrack.artistName}</p>
                    </div>
                </div>

                {/* Player Controls */}
                <div className="flex flex-col items-center justify-center gap-2 w-1/2">
                    <div className="flex items-center gap-4">
                        <button onClick={playPrevious} className="text-brand-text-secondary hover:text-white transition-colors"><ChevronLeftIcon className="w-6 h-6"/></button>
                        <button onClick={handlePlayPause}>
                            {isPlaying 
                                ? <PauseCircleIcon className="w-12 h-12 text-white hover:text-brand-primary transition-colors" />
                                : <PlayCircleIcon className="w-12 h-12 text-white hover:text-brand-primary transition-colors" />
                            }
                        </button>
                        <button onClick={playNext} className="text-brand-text-secondary hover:text-white transition-colors"><ChevronRightIcon className="w-6 h-6"/></button>
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <span className="text-xs text-brand-text-secondary w-10 text-right">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            value={currentTime}
                            max={duration || 0}
                            onChange={handleProgressChange}
                            className="w-full h-1 bg-brand-surface rounded-lg appearance-none cursor-pointer range-thumb"
                        />
                        <span className="text-xs text-brand-text-secondary w-10">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Close Button */}
                <div className="w-1/4 flex justify-end">
                     <button onClick={clearCurrentTrack} className="text-brand-text-secondary hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <style>{`
                .range-thumb {
                    -webkit-appearance: none;
                    background-color: #242038;
                }
                .range-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    background: #F0F0F0;
                    cursor: pointer;
                    border-radius: 50%;
                }
                .range-thumb::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                    background: #F0F0F0;
                    cursor: pointer;
                    border-radius: 50%;
                }
            `}</style>
        </div>
    );
};

export default AudioPlayer;
