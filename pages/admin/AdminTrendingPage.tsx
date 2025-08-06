
import React, { useState, useMemo } from 'react';
import { useContent } from '../../hooks/useContent';
import toast from 'react-hot-toast';
import { Track } from '../../types';

const AdminTrendingPage: React.FC = () => {
    const { artists, trendingTrackIds, updateTrendingTrackIds } = useContent();
    const [currentTrending, setCurrentTrending] = useState<string[]>(
        [...trendingTrackIds, '', '', ''].slice(0, 3)
    );

    const allTracks = useMemo(() => {
        return artists.flatMap(artist => 
            artist.discography.flatMap(release => 
                release.tracks.map(track => ({ ...track, artistName: artist.name }))
            )
        );
    }, [artists]);

    const handleSelectChange = (index: number, trackId: string) => {
        const newTrending = [...currentTrending];
        newTrending[index] = trackId === "none" ? "" : trackId;
        setCurrentTrending(newTrending);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalIds = currentTrending.filter(id => id);
        updateTrendingTrackIds(finalIds);
        toast.success('Trending tracks updated successfully!');
    };

    const TrackSelector: React.FC<{ index: number }> = ({ index }) => {
        const selectedId = currentTrending[index] || "none";
        return (
            <div className="bg-brand-surface p-4 rounded-lg">
                <label className="text-sm font-semibold text-white mb-2 block">Trending Slot #{index + 1}</label>
                <select
                    value={selectedId}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                    className="w-full bg-brand-dark rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                    <option value="none">-- None --</option>
                    {allTracks.map(track => (
                        <option key={track.id} value={track.id}>
                            {track.title} ({track.artistName})
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Manage Trending Tracks</h1>
            <form onSubmit={handleSubmit} className="bg-brand-bg p-8 rounded-lg space-y-6 max-w-2xl">
                <div>
                    <p className="text-brand-text-secondary mb-4">Select up to 3 tracks to feature in the "Trending Tracks" section on the homepage.</p>
                    <div className="space-y-4">
                        <TrackSelector index={0} />
                        <TrackSelector index={1} />
                        <TrackSelector index={2} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-brand-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90">
                        Save Trending Tracks
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminTrendingPage;
