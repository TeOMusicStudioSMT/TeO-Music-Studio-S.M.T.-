
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SUBSCRIPTION_TIERS_DATA } from '../constants';
import { SubscriptionTierInfo } from '../types';
import { StarIcon, CrownIcon } from '../components/icons';

type BillingCycle = 'monthly' | 'annually';

const TierCard: React.FC<{ tierInfo: SubscriptionTierInfo, billingCycle: BillingCycle }> = ({ tierInfo, billingCycle }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isCurrentPlan = user?.tier === tierInfo.tier;

    const isAnnual = billingCycle === 'annually';
    const displayPrice = isAnnual && tierInfo.yearlyPrice ? tierInfo.yearlyPrice : tierInfo.price;
    const displayPriceDesc = isAnnual && tierInfo.yearlyPriceDescription ? tierInfo.yearlyPriceDescription : tierInfo.priceDescription;
    const discount = isAnnual ? tierInfo.yearlyDiscount : null;
    const canBeAnnual = tierInfo.tier !== 'Free' && tierInfo.yearlyPrice;

    return (
        <div className={`relative border rounded-xl p-8 flex flex-col ${
            tierInfo.isFeatured ? 'border-brand-primary bg-brand-surface shadow-2xl shadow-brand-primary/20' : 'border-brand-surface bg-brand-bg'
        }`}>
            {discount && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {discount}
                </div>
            )}
            <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {tierInfo.tier === 'VIP' && <CrownIcon className="w-6 h-6 text-yellow-400" />}
                    {tierInfo.tier}
                </h3>
                <p className="text-4xl font-extrabold text-white my-4">{canBeAnnual ? displayPrice : tierInfo.price} 
                    <span className="text-base font-normal text-brand-text-secondary"> {canBeAnnual ? displayPriceDesc : tierInfo.priceDescription}</span>
                </p>
                <ul className="space-y-3 text-brand-text-secondary">
                    {tierInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                           <StarIcon className="w-4 h-4 text-brand-primary mr-3 mt-1 flex-shrink-0" />
                           <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                onClick={() => navigate('/checkout', { state: { selectedTier: tierInfo.tier, billingCycle } })}
                disabled={isCurrentPlan || tierInfo.tier === 'Free'}
                className={`mt-8 w-full py-3 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                    isCurrentPlan 
                        ? 'bg-brand-surface text-brand-text-secondary cursor-not-allowed'
                        : tierInfo.tier === 'Free'
                        ? 'bg-brand-surface text-brand-text-secondary cursor-not-allowed'
                        : tierInfo.isFeatured
                        ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:opacity-90'
                        : 'bg-brand-surface text-white hover:bg-brand-primary'
                }`}
            >
                {isCurrentPlan ? 'Current Plan' : tierInfo.tier === 'Free' ? 'Your Plan' : 'Choose Plan'}
            </button>
        </div>
    );
};


const SubscriptionsPage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
        <div className="bg-brand-dark min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white">Choose Your Access</h1>
                    <p className="text-lg text-brand-text-secondary mt-4 max-w-3xl mx-auto">
                        Unlock the full potential of TeO Music Studio. Join our community and support the future of AI-driven music creation.
                    </p>
                </div>
                 <div className="flex justify-center items-center space-x-2 bg-brand-dark p-1.5 rounded-xl mb-12 max-w-xs mx-auto">
                    <button onClick={() => setBillingCycle('monthly')} className={`w-full py-2 rounded-lg font-semibold transition-colors ${billingCycle === 'monthly' ? 'bg-brand-primary text-white' : 'text-brand-text-secondary hover:text-white'}`}>
                        Monthly
                    </button>
                    <button onClick={() => setBillingCycle('annually')} className={`w-full py-2 rounded-lg font-semibold transition-colors ${billingCycle === 'annually' ? 'bg-brand-primary text-white' : 'text-brand-text-secondary hover:text-white'}`}>
                        Annually
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {SUBSCRIPTION_TIERS_DATA.map(tierInfo => (
                        <TierCard key={tierInfo.tier} tierInfo={tierInfo} billingCycle={billingCycle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
