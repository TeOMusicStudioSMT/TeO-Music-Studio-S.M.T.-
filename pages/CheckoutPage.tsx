
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SUBSCRIPTION_TIERS_DATA } from '../constants';
import { CreditCardIcon, WalletIcon, BitcoinIcon, EthereumIcon, CopyIcon, CrownIcon } from '../components/icons';
import toast from 'react-hot-toast';

type PaymentMethod = 'card' | 'gpay' | 'crypto';
type BillingCycle = 'monthly' | 'annually';

const CheckoutPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [activeTab, setActiveTab] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const selectedTier = state?.selectedTier || 'Premium';
    const billingCycle: BillingCycle = state?.billingCycle || 'monthly';
    const tierData = SUBSCRIPTION_TIERS_DATA.find(t => t.tier === selectedTier);

    if (!tierData) {
        navigate('/subscriptions');
        return null;
    }
    
    const isAnnual = billingCycle === 'annually';
    const displayPrice = isAnnual ? tierData.yearlyPrice : tierData.price;

    const handlePayment = () => {
        setIsProcessing(true);
        toast.loading('Processing payment...');
        setTimeout(() => {
            setIsProcessing(false);
            toast.dismiss();
            login(tierData.tier);
            toast.success(`Welcome to the ${tierData.tier} tier!`);
            navigate('/');
        }, 2500);
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Address copied to clipboard!");
    };


    return (
        <div className="bg-brand-dark min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-brand-bg rounded-2xl p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-white">Order Summary</h2>
                    <div className="border border-brand-surface rounded-xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                               {tierData.tier === 'VIP' && <CrownIcon className="w-6 h-6 text-yellow-400" />}
                               {tierData.tier} Plan ({isAnnual ? 'Annual' : 'Monthly'})
                            </h3>
                            <p className="text-lg text-white">{displayPrice}</p>
                        </div>
                        <ul className="text-sm text-brand-text-secondary list-disc list-inside space-y-1">
                            {tierData.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                    </div>
                    <div className="border-t border-brand-surface pt-4 flex justify-between items-center font-bold text-white text-xl">
                        <span>Total Due Today</span>
                        <span>{displayPrice}</span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-brand-bg rounded-2xl p-8">
                    <div className="flex border-b border-brand-surface mb-6">
                        <TabButton id="card" activeTab={activeTab} setActiveTab={setActiveTab} icon={<CreditCardIcon className="w-5 h-5"/>} label="Card" />
                        <TabButton id="gpay" activeTab={activeTab} setActiveTab={setActiveTab} icon={<WalletIcon className="w-5 h-5"/>} label="Google Pay" />
                        <TabButton id="crypto" activeTab={activeTab} setActiveTab={setActiveTab} icon={<BitcoinIcon className="w-5 h-5"/>} label="Crypto" />
                    </div>
                    
                    {activeTab === 'card' && <CreditCardForm onPayment={handlePayment} isProcessing={isProcessing} />}
                    {activeTab === 'gpay' && <GPay onPayment={handlePayment} isProcessing={isProcessing} />}
                    {activeTab === 'crypto' && <CryptoPayment onCopy={copyToClipboard} />}
                </div>
            </div>
        </div>
    );
};

const TabButton: React.FC<{id: PaymentMethod, activeTab: PaymentMethod, setActiveTab: (id: PaymentMethod) => void, icon: React.ReactNode, label: string}> = ({id, activeTab, setActiveTab, icon, label}) => (
    <button onClick={() => setActiveTab(id)} className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-semibold border-b-2 transition-colors ${
        activeTab === id ? 'border-brand-primary text-white' : 'border-transparent text-brand-text-secondary hover:text-white'
    }`}>
        {icon}
        {label}
    </button>
);

const CreditCardForm: React.FC<{onPayment: () => void, isProcessing: boolean}> = ({onPayment, isProcessing}) => (
    <div className="space-y-4">
        <input type="text" placeholder="Card Number" className="input-field" />
        <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="MM / YY" className="input-field" />
            <input type="text" placeholder="CVC" className="input-field" />
        </div>
        <input type="text" placeholder="Cardholder Name" className="input-field" />
        <button onClick={onPayment} disabled={isProcessing} className="btn-primary w-full mt-4">
            {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
    </div>
);

const GPay: React.FC<{onPayment: () => void, isProcessing: boolean}> = ({onPayment, isProcessing}) => (
    <div className="text-center">
        <p className="text-brand-text-secondary mb-6">Click the button below to complete your purchase with Google Pay.</p>
        <button onClick={onPayment} disabled={isProcessing} className="bg-black text-white px-8 py-3 rounded-lg flex items-center justify-center mx-auto hover:bg-gray-800 transition-colors">
            <span className="mr-2">Pay with</span>
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20.2,8.1c0,0-0.1-0.1-0.1-0.1c-0.3-0.5-0.6-1-1.1-1.3c-0.5-0.3-1.1-0.5-1.7-0.5H6.5v0H6.4c-0.6,0-1.2,0.1-1.7,0.4C4.1,7,3.6,7.6,3.2,8.2C3.2,8.3,3.1,8.4,3.1,8.4c-0.2,0.4-0.4,0.8-0.5,1.3C2.6,10.2,2.6,10.8,2.7,11.3c0,0.1,0,0.1,0,0.2c0.2,0.9,0.5,1.7,1,2.5c0.5,0.8,1.2,1.4,2,1.9c0,0,0.1,0,0.1,0.1c0.1,0,0.2,0.1,0.3,0.1h0v0h11.2c0.6-0.1,1.2-0.3,1.7-0.6c0.6-0.3,1-0.8,1.4-1.4c0.4-0.6,0.7-1.3,0.8-2c0.1-0.3,0.1-0.6,0.1-0.9C20.4,10.1,20.4,9.1,20.2,8.1z M6.6,13.7c-0.6,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S7.2,13.7,6.6,13.7z M17.2,13.7c-0.6,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S17.7,13.7,17.2,13.7z" fill="#fff"/></svg>
        </button>
    </div>
);

const CryptoPayment: React.FC<{onCopy: (text:string) => void}> = ({ onCopy }) => {
    const [currency, setCurrency] = useState('BTC');
    const address = currency === 'BTC' ? '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' : '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <button onClick={() => setCurrency('BTC')} className={`flex-1 p-2 rounded-lg flex items-center justify-center gap-2 ${currency==='BTC' ? 'bg-brand-primary' : 'bg-brand-surface'}`}><BitcoinIcon className="w-5 h-5"/> BTC</button>
                <button onClick={() => setCurrency('ETH')} className={`flex-1 p-2 rounded-lg flex items-center justify-center gap-2 ${currency==='ETH' ? 'bg-brand-primary' : 'bg-brand-surface'}`}><EthereumIcon className="w-5 h-5"/> ETH</button>
            </div>
            <p className="text-sm text-brand-text-secondary">Send the exact amount to the address below. Your plan will be activated after network confirmation.</p>
            <div className="bg-brand-dark p-4 rounded-lg space-y-2">
                <p className="text-xs text-brand-text-secondary">Amount</p>
                <p className="font-mono text-lg text-white">{currency === 'BTC' ? '0.00037 BTC' : '0.0075 ETH'}</p>
                 <p className="text-xs text-brand-text-secondary pt-2">To Address</p>
                 <div className="flex items-center bg-brand-surface rounded-md p-2">
                    <p className="font-mono text-sm text-white truncate flex-grow">{address}</p>
                    <button onClick={() => onCopy(address)} className="p-1 text-brand-text-secondary hover:text-white"><CopyIcon className="w-4 h-4"/></button>
                 </div>
            </div>
             <p className="text-center text-sm text-brand-text-secondary">...or scan the QR code with your wallet app.</p>
        </div>
    )
}

// Add global styles for reuse
const styles = `
.input-field {
    width: 100%;
    background-color: #242038; /* brand-surface */
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: #F0F0F0; /* brand-text */
    border: 1px solid transparent;
}
.input-field:focus {
    outline: none;
    --tw-ring-color: #8A42DB; /* brand-primary */
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.btn-primary {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-image: linear-gradient(to right, #8A42DB, #D94A8C);
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    transition: opacity 0.2s;
}
.btn-primary:hover {
    opacity: 0.9;
}
.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
`
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default CheckoutPage;
