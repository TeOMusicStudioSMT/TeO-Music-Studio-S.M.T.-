
import React, { useState, useMemo } from 'react';
import { useContent } from '../../hooks/useContent';
import toast from 'react-hot-toast';
import { Artist, Track, Release, SpotlightItem } from '../../types';

const AdminSpotlightPage: React.FC = () => {
    const { artists, spotlightItems, updateSpotlightItems } = useContent();
    const [currentSpotlight, setCurrentSpotlight] = useState<SpotlightItem[]>(
        // Ensure there are always 3 items for the UI
        [...spotlightItems, {trackId: null}, {trackId: null}, {trackId: null}].slice(0, 3)
    );

    const allTracks = useMemo(() => {
        return artists.flatMap(artist => 
            artist.discography.flatMap(release => 
                release.tracks.map(track => ({ ...track, artistName: artist.name }))
            )
        );
    }, [artists]);

    const handleSelectChange = (index: number, field: keyof SpotlightItem, value: string) => {
        const newItems = [...currentSpotlight];
        const currentItem = { ...newItems[index] };
        
        if (field === 'trackId') {
            currentItem.trackId = value === "none" ? null : value;
        } else if (field === 'videoUrl') {
            currentItem.videoUrl = value;
        }

        newItems[index] = currentItem;
        setCurrentSpotlight(newItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Filter out any slots that don't have a track selected
        const finalItems = currentSpotlight.filter(item => item.trackId);
        updateSpotlightItems(finalItems);
        toast.success('Spotlight items updated successfully!');
    };

    const TrackSelector: React.FC<{ index: number }> = ({ index }) => {
        const item = currentSpotlight[index];
        return (
            <div className="bg-brand-surface p-4 rounded-lg space-y-3">
                <label className="text-sm font-semibold text-white mb-2 block">Spotlight Slot #{index + 1}</label>
                <div>
                    <label className="text-xs font-medium text-brand-text-secondary mb-1 block">Track</label>
                    <select
                        value={item.trackId || "none"}
                        onChange={(e) => handleSelectChange(index, 'trackId', e.target.value)}
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
                 <div>
                    <label className="text-xs font-medium text-brand-text-secondary mb-1 block">Video URL (optional)</label>
                    <input
                        type="text"
                        value={item.videoUrl || ''}
                        onChange={(e) => handleSelectChange(index, 'videoUrl', e.target.value)}
                        placeholder="e.g., https://youtube.com/watch?v=..."
                        className="w-full bg-brand-dark rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                     />
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Manage Spotlight</h1>
            <form onSubmit={handleSubmit} className="bg-brand-bg p-8 rounded-lg space-y-6 max-w-2xl">
                <div>
                    <p className="text-brand-text-secondary mb-4">Select up to 3 tracks to feature in the "S.M.T. Spotlight" section. Add an optional video URL to override the track's default source.</p>
                    <div className="space-y-4">
                        <TrackSelector index={0} />
                        <TrackSelector index={1} />
                        <TrackSelector index={2} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-brand-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90">
                        Save Spotlight
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSpotlightPage;
