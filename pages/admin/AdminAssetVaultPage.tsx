
import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import toast from 'react-hot-toast';
import { Asset, AssetType, SoundStemCategory } from '../../types';

const AdminAssetVaultPage: React.FC = () => {
    const { assetVault, addAsset, deleteAsset } = useContent();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<SoundStemCategory | ''>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (file && !file.type.startsWith('audio/')) {
            setSelectedCategory('');
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            toast.error("Please select a file first.");
            return;
        }

        const assetType = selectedFile.type.startsWith('image/') ? AssetType.IMAGE :
                          selectedFile.type.startsWith('audio/') ? AssetType.AUDIO :
                          selectedFile.type.startsWith('video/') ? AssetType.VIDEO : AssetType.IMAGE;
        
        if (assetType === AssetType.AUDIO && !selectedCategory) {
            toast.error("Please select a category for the audio file.");
            return;
        }

        const localUrl = `/public/audio/${selectedFile.name.replace(/\s+/g, '_')}`;

        const newAsset: Asset = {
            id: `asset_${Date.now()}`,
            name: selectedFile.name,
            type: assetType,
            url: localUrl,
            ...(assetType === AssetType.AUDIO && { category: selectedCategory as SoundStemCategory })
        };

        addAsset(newAsset);
        toast.success(`Simulated upload for "${selectedFile.name}" and added to vault.`);

        setSelectedFile(null);
        setSelectedCategory('');
    };


    const handleDelete = (assetId: string) => {
        if (window.confirm('Are you sure you want to delete this asset from the vault?')) {
            deleteAsset(assetId);
            toast.success('Asset deleted!');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">S.M.T. Asset Vault</h1>
            <div className="bg-brand-bg p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Upload New Asset</h2>
                 <p className="text-sm text-brand-text-secondary mb-4">
                    This is a simulation. In a real app, this would upload to a server. Here, it will generate a local path.
                </p>
                <div className="space-y-4">
                    <input
                        type="file"
                        key={selectedFile ? selectedFile.name : 'file-input'}
                        onChange={handleFileChange}
                        className="block w-full text-sm text-brand-text-secondary
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-brand-primary file:text-white
                            hover:file:bg-brand-primary/80"
                    />
                    {selectedFile && selectedFile.type.startsWith('audio/') && (
                        <div>
                             <label className="text-sm font-medium text-brand-text-secondary mb-2 block">Audio Category</label>
                             <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value as SoundStemCategory)}
                                className="w-full bg-brand-surface rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            >
                                <option value="" disabled>Select a category...</option>
                                {Object.values(SoundStemCategory).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                             </select>
                        </div>
                    )}
                    {selectedFile && (
                        <button onClick={handleUpload} className="bg-brand-secondary text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90">
                            Add "{selectedFile.name}" to Vault
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-brand-bg p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Vault Contents ({assetVault.length})</h2>
                <div className="space-y-2">
                    {assetVault.map(asset => (
                        <div key={asset.id} className="bg-brand-surface p-3 rounded-lg flex items-center justify-between">
                            <div>
                                <span className="font-semibold text-white">{asset.name}</span>
                                {asset.category && <span className="text-xs bg-brand-primary/50 text-brand-primary font-bold px-2 py-1 rounded-full ml-2 align-middle">{asset.category}</span>}
                                <p className="text-xs text-brand-text-secondary">{asset.url}</p>
                            </div>
                            <button onClick={() => handleDelete(asset.id)} className="text-red-500 hover:text-red-400 text-sm">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAssetVaultPage;