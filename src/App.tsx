/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  PieChart, 
  ArrowLeftRight, 
  Plus, 
  Scan, 
  MapPin, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownLeft,
  History,
  User,
  Bell,
  Search,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { QRCodeSVG } from 'qrcode.react';
import { PROJECTS, MOCK_CHART_DATA } from './constants';
import { Project, Transaction, Asset } from './types';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'deposit', icon: Wallet, label: 'Dépôt' },
    { id: 'market', icon: TrendingUp, label: 'Marché' },
    { id: 'portfolio', icon: PieChart, label: 'Portefeuille' },
    { id: 'transactions', icon: ArrowLeftRight, label: 'Paiements' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            activeTab === tab.id ? "text-onyx-blue" : "text-slate-400"
          )}
        >
          <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div 
              layoutId="activeTab"
              className="absolute -top-3 w-12 h-1 bg-onyx-blue rounded-full"
            />
          )}
        </button>
      ))}
    </nav>
  );
};

const Header = ({ title }: { title: string }) => (
  <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-40">
    <h1 className="text-2xl font-bold text-onyx-blue">{title}</h1>
    <div className="flex gap-3">
      <button className="p-2 bg-slate-50 rounded-full text-slate-600">
        <Bell size={20} />
      </button>
      <button className="p-2 bg-slate-50 rounded-full text-slate-600">
        <User size={20} />
      </button>
    </div>
  </header>
);

// --- Screens ---

const DepositScreen = () => {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="px-6">
        <div className="bg-onyx-blue rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-blue-200 text-sm font-medium mb-1">Solde Actuel</p>
            <h2 className="text-3xl font-bold">140 000 FCFA</h2>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="px-6 flex flex-col gap-4">
        <h3 className="font-bold text-slate-800">Moyens de dépôt</h3>
        
        <button className="flex items-center gap-4 p-4 glass-card hover:border-onyx-gold transition-colors">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-bold">
            M
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold">Mobile Money</p>
            <p className="text-xs text-slate-500">Mixx by Yas, Flooz</p>
          </div>
          <ChevronRight className="text-slate-300" />
        </button>

        <button className="flex items-center gap-4 p-4 glass-card hover:border-onyx-gold transition-colors">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Wallet size={24} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold">Cartes Bancaires</p>
            <p className="text-xs text-slate-500">Visa, Mastercard</p>
          </div>
          <ChevronRight className="text-slate-300" />
        </button>

        <div className="mt-4 p-6 bg-onyx-gold/10 rounded-3xl border border-onyx-gold/20 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-onyx-gold rounded-full flex items-center justify-center shadow-lg">
            <Scan size={32} className="text-slate-900" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-900">Scanner pour Déposer</p>
            <p className="text-xs text-slate-600 mt-1">Chez un agent Onyx agréé</p>
          </div>
          <button 
            onClick={() => setShowScanner(true)}
            className="btn-primary w-full"
          >
            Ouvrir le Scanner
          </button>
        </div>

        <button className="flex items-center justify-center gap-2 text-onyx-blue font-bold py-2">
          <MapPin size={18} />
          <span>Trouver un agent proche</span>
        </button>
      </div>

      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-sm aspect-square border-2 border-onyx-gold rounded-3xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onyx-gold/20 to-transparent animate-scan" />
              <Camera size={48} className="text-white/20" />
              <p className="absolute bottom-10 text-white/60 text-sm">Visez le QR Code de l'agent</p>
            </div>
            <button 
              onClick={() => setShowScanner(false)}
              className="mt-12 text-white font-bold underline"
            >
              Annuler
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MarketScreen = () => {
  const [filter, setFilter] = useState('Tous');
  const [showScanner, setShowScanner] = useState(false);
  const categories = ['Tous', 'Agriculture', 'Industrie', 'Energie', 'Commerce'];

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="px-6 overflow-x-auto flex gap-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              filter === cat ? "bg-onyx-blue text-white" : "bg-slate-100 text-slate-600"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-6 flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h3 className="font-bold text-lg text-slate-800">Projets à Impact</h3>
          <span className="text-xs text-onyx-blue font-bold">Voir tout</span>
        </div>

        {PROJECTS.filter(p => filter === 'Tous' || p.category === filter).map((project) => (
          <motion.div 
            layout
            key={project.id}
            className="glass-card overflow-hidden flex flex-col"
          >
            <div className="h-40 relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-onyx-blue uppercase tracking-wider">
                {project.category}
              </div>
              <div className="absolute bottom-3 right-3 bg-onyx-gold px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-lg">
                {project.yield} / an
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-slate-900">{project.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{project.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Impact Social</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${project.impactScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-green-600">{project.impactScore}</span>
                  </div>
                </div>
                <button className="bg-onyx-blue text-white text-xs font-bold px-4 py-2 rounded-lg">
                  Investir
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scan-to-Invest Floating Button */}
      <button 
        onClick={() => setShowScanner(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-onyx-gold rounded-full shadow-2xl flex items-center justify-center text-slate-900 z-50 border-4 border-white active:scale-90 transition-transform"
      >
        <div className="flex flex-col items-center">
          <Scan size={24} />
          <span className="text-[8px] font-bold uppercase mt-0.5">Scan Invest</span>
        </div>
      </button>

      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-sm aspect-square border-2 border-onyx-gold rounded-3xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onyx-gold/20 to-transparent animate-scan" />
              <Camera size={48} className="text-white/20" />
              <p className="absolute bottom-10 text-white/60 text-sm text-center px-6">Visez le QR Code sur l'emballage du produit pour investir</p>
            </div>
            <button 
              onClick={() => setShowScanner(false)}
              className="mt-12 text-white font-bold underline"
            >
              Annuler
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PortfolioScreen = () => {
  const assets: Asset[] = [
    { projectId: 'cacao-1', title: 'Cacao Excellence', amount: 45000, sector: 'Terre' },
    { projectId: 'soja-1', title: 'Soja Bio Unit', amount: 30000, sector: 'Usine' },
    { projectId: 'solaire-1', title: 'Village Solar', amount: 25000, sector: 'Energie' },
    { projectId: 'boutique-1', title: 'Local Shops', amount: 15000, sector: 'Boutique' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="px-6">
        <div className="glass-card p-6 border-onyx-blue/10">
          <p className="text-slate-400 text-sm font-medium">Valeur Totale</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-slate-900">140 000</h2>
            <span className="text-lg font-bold text-onyx-blue">FCFA</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-green-600 font-bold text-sm">
            <ArrowUpRight size={16} />
            <span>+12.5% ce mois</span>
          </div>
        </div>
      </div>

      <div className="px-6 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_CHART_DATA}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0047AB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0047AB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" hide />
            <YAxis hide domain={['dataMin - 10000', 'dataMax + 10000']} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0047AB" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="px-6 flex flex-col gap-4">
        <h3 className="font-bold text-slate-800">Mes Actifs par Secteur</h3>
        <div className="grid grid-cols-2 gap-3">
          {assets.map((asset) => (
            <div key={asset.projectId} className="glass-card p-4 flex flex-col gap-2">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                asset.sector === 'Terre' ? "bg-green-100 text-green-600" :
                asset.sector === 'Usine' ? "bg-blue-100 text-blue-600" :
                asset.sector === 'Energie' ? "bg-yellow-100 text-yellow-600" :
                "bg-purple-100 text-purple-600"
              )}>
                {asset.sector === 'Terre' ? <TrendingUp size={16} /> :
                 asset.sector === 'Usine' ? <TrendingUp size={16} /> :
                 asset.sector === 'Energie' ? <TrendingUp size={16} /> :
                 <TrendingUp size={16} />}
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{asset.sector}</p>
                <p className="font-bold text-sm truncate">{asset.title}</p>
                <p className="text-onyx-blue font-bold text-xs mt-1">{asset.amount.toLocaleString()} FCFA</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-onyx-gold shadow-sm">
              <History size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Historique des Dividendes</p>
              <p className="text-xs text-slate-500">Dernier versement: +2 450 FCFA</p>
            </div>
          </div>
          <ChevronRight className="text-slate-300" />
        </div>
      </div>
    </div>
  );
};

const TransactionsScreen = () => {
  const [showQR, setShowQR] = useState(false);
  
  const transactions: Transaction[] = [
    { id: '1', type: 'depot', amount: 50000, date: '24 Mars, 14:20', description: 'Dépôt Mobile Money', status: 'termine' },
    { id: '2', type: 'investissement', amount: 25000, date: '22 Mars, 09:15', description: 'Investissement Cacao', status: 'termine' },
    { id: '3', type: 'transfert_p2p', amount: 10000, date: '20 Mars, 18:45', description: 'Envoi à Moussa', status: 'termine' },
    { id: '4', type: 'dividende', amount: 2450, date: '18 Mars, 08:00', description: 'Dividende Soja Bio', status: 'termine' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="px-6 grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center gap-2 p-4 glass-card">
          <div className="w-12 h-12 bg-onyx-gold/20 rounded-2xl flex items-center justify-center text-onyx-gold">
            <ArrowDownLeft size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase">Dépôt</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 glass-card">
          <div className="w-12 h-12 bg-onyx-blue/10 rounded-2xl flex items-center justify-center text-onyx-blue">
            <ArrowUpRight size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase">Retrait</span>
        </button>
        <button 
          onClick={() => setShowQR(true)}
          className="flex flex-col items-center gap-2 p-4 glass-card"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
            <Scan size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase">Mon QR</span>
        </button>
      </div>

      <div className="px-6">
        <div className="bg-onyx-blue rounded-3xl p-6 text-white">
          <h3 className="font-bold mb-4">Transfert P2P</h3>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input 
                type="text" 
                placeholder="Nom d'utilisateur ou ID" 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-blue-300 focus:outline-none focus:border-onyx-gold transition-colors"
              />
            </div>
            <button className="btn-primary w-full">
              Envoyer des FCFA
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Historique</h3>
          <button className="text-xs text-onyx-blue font-bold">Filtrer</button>
        </div>

        <div className="flex flex-col gap-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 p-3 glass-card border-none bg-slate-50/50">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                tx.type === 'depot' ? "bg-green-100 text-green-600" :
                tx.type === 'retrait' ? "bg-red-100 text-red-600" :
                tx.type === 'investissement' ? "bg-blue-100 text-blue-600" :
                tx.type === 'transfert_p2p' ? "bg-purple-100 text-purple-600" :
                "bg-onyx-gold/20 text-onyx-gold"
              )}>
                {tx.type === 'depot' ? <ArrowDownLeft size={18} /> :
                 tx.type === 'retrait' ? <ArrowUpRight size={18} /> :
                 tx.type === 'investissement' ? <TrendingUp size={18} /> :
                 tx.type === 'transfert_p2p' ? <ArrowLeftRight size={18} /> :
                 <TrendingUp size={18} />}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{tx.description}</p>
                <p className="text-[10px] text-slate-400 font-medium">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className={cn(
                  "font-bold text-sm",
                  tx.type === 'depot' || tx.type === 'dividende' ? "text-green-600" : "text-slate-900"
                )}>
                  {tx.type === 'depot' || tx.type === 'dividende' ? '+' : '-'}{tx.amount.toLocaleString()}
                </p>
                <p className="text-[10px] font-bold text-onyx-blue">FCFA</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center gap-6 w-full max-w-xs"
            >
              <h4 className="font-bold text-onyx-blue text-lg">Mon QR Code Onyx</h4>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <QRCodeSVG value="onyx_user_123456" size={200} />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900">Samuel G.</p>
                <p className="text-xs text-slate-500">ID: ONYX-789-X</p>
              </div>
              <button 
                onClick={() => setShowQR(false)}
                className="btn-secondary w-full"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-onyx-gold rounded-2xl shadow-xl flex items-center justify-center"
        >
          <div className="w-8 h-8 border-4 border-onyx-blue border-t-transparent rounded-full animate-spin" />
        </motion.div>
        <h1 className="text-2xl font-black text-onyx-blue tracking-tighter">ONYX MONEY</h1>
        <p className="text-slate-400 text-sm animate-pulse">Chargement sécurisé...</p>
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'deposit': return <DepositScreen />;
      case 'market': return <MarketScreen />;
      case 'portfolio': return <PortfolioScreen />;
      case 'transactions': return <TransactionsScreen />;
      default: return <PortfolioScreen />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'deposit': return 'Alimenter';
      case 'market': return 'Investir';
      case 'portfolio': return 'Mon Onyx';
      case 'transactions': return 'Paiements';
      default: return 'Onyx Money';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-onyx-gold/30">
      <Header title={getTitle()} />
      
      <main className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
