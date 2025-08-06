
import React from 'react';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';

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

const NewsArchivePage: React.FC = () => {
    const { news } = useContent();

    return (
        <div className="bg-brand-bg min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white">News Archive</h1>
                    <p className="text-lg text-brand-text-secondary mt-4 max-w-3xl mx-auto">
                        All the latest updates and announcements from TeO Music Studio.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((article, index) => <NewsCard key={index} article={article} index={index} />)}
                </div>
            </div>
        </div>
    );
};

export default NewsArchivePage;
