import React, { useState } from 'react';
import { SparklesIcon, XIcon } from '../icons';
import { generateImage } from '../../services/geminiService';
import toast from 'react-hot-toast';

interface ImageGenerationInputProps {
    value: string;
    onValueChange: (newValue: string) => void;
    placeholder?: string;
    inputClassName?: string;
}

const ImageGenerationModal: React.FC<{
    onClose: () => void;
    onImageSelect: (imageUrl: string) => void;
}> = ({ onClose, onImageSelect }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error("Please enter a prompt.");
            return;
        }
        setIsGenerating(true);
        setError('');
        setGeneratedImageUrl(null);
        try {
            const base64Bytes = await generateImage(prompt);
            const fullUrl = `data:image/jpeg;base64,${base64Bytes}`;
            setGeneratedImageUrl(fullUrl);
            toast.success("Image generated!");
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
            toast.error(err.message || "Failed to generate image.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUseImage = () => {
        if (generatedImageUrl) {
            onImageSelect(generatedImageUrl);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-brand-bg rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-brand-text-secondary hover:text-white"><XIcon/></button>
                <h3 className="text-xl font-bold text-white mb-4">Generate Image</h3>
                <div className="space-y-4">
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the image you want to create..."
                        className="w-full bg-brand-surface rounded-lg p-3 text-white placeholder-brand-text-secondary min-h-[80px]"
                        disabled={isGenerating}
                    />
                    <button onClick={handleGenerate} disabled={isGenerating || !prompt} className="btn-primary-gen w-full">
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {isGenerating && (
                        <div className="text-center p-4">
                            <p className="animate-pulse text-white">Contacting creative matrix...</p>
                        </div>
                    )}
                    {generatedImageUrl && (
                        <div className="space-y-4">
                            <img src={generatedImageUrl} alt="Generated preview" className="rounded-lg w-full max-h-96 object-contain bg-black"/>
                             <button onClick={handleUseImage} className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-500">
                                Use This Image
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
            .btn-primary-gen {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                background-color: #8A42DB;
                color: white;
                font-weight: 600;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                transition: opacity 0.2s;
            }
            .btn-primary-gen:hover:not(:disabled) {
                opacity: 0.9;
            }
            .btn-primary-gen:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            `}</style>
        </div>
    );
};


export const ImageGenerationInput: React.FC<ImageGenerationInputProps> = ({ value, onValueChange, placeholder, inputClassName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const defaultClasses = "w-full bg-brand-surface rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary";

    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={placeholder}
                className={inputClassName || defaultClasses}
            />
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-brand-primary hover:text-brand-accent transition-colors"
                title="Generate image with AI"
            >
                <SparklesIcon className="w-5 h-5" />
            </button>
            {isModalOpen && (
                <ImageGenerationModal
                    onClose={() => setIsModalOpen(false)}
                    onImageSelect={onValueChange}
                />
            )}
        </div>
    );
};

export default ImageGenerationInput;
