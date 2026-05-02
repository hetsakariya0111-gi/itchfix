import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  PieChart as PieIcon,
  Activity,
  ChevronDown
} from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Toast from '../../components/ui/Toast';

const Analytics = () => {
  const [toasts, setToasts] = useState([]);
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const metrics = [
    { label: 'Total Revenue', value: '₹24,85,000', trend: '+12.5%', isUp: true, icon: <DollarSign size={20} /> },
    { label: 'Active Deals', value: '18', trend: '+2', isUp: true, icon: <Activity size={20} /> },
    { label: 'Supplier Growth', value: '14%', trend: '+3.2%', isUp: true, icon: <Users size={20} /> },
    { label: 'Escrow Success', value: '99.2%', trend: '-0.1%', isUp: false, icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Toast Container */}
      <div className="fixed top-24 right-6 z-[200] space-y-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Breadcrumbs items={[{ label: 'TrustBiz', path: '/' }, { label: 'Analytics', path: '/analytics' }]} />
          <h1 className="text-2xl md:text-3xl font-bold font-display text-text-primary tracking-tight flex items-center gap-3">
            Business Analytics <Badge variant="teal" size="sm">Real-time</Badge>
          </h1>
          <p className="text-text-muted text-xs md:text-sm">Deep dive into your business performance and trust metrics.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => addToast('Downloading report...', 'info')}>
            <Download size={16} className="mr-2" /> Export Data
          </Button>
          <div className="relative group">
            <Button variant="outline" size="sm" className="bg-card-bg border-border-main">
              {timeRange} <ChevronDown size={14} className="ml-2 opacity-50" />
            </Button>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-card-bg border border-border-main rounded-card p-5 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-trust-teal/10 text-trust-teal flex items-center justify-center">
                {m.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${m.isUp ? 'bg-trust-teal/10 text-trust-teal' : 'bg-trust-red/10 text-trust-red'}`}>
                {m.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {m.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-text-ghost font-bold uppercase tracking-widest">{m.label}</p>
              <h3 className="text-2xl font-display font-bold text-text-primary mt-1">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 bg-card-bg border border-border-main rounded-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary">Revenue Overview</h3>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold text-trust-teal uppercase tracking-widest bg-trust-teal/10 px-3 py-1 rounded">Volume</button>
              <button className="text-[10px] font-bold text-text-ghost uppercase tracking-widest px-3 py-1 rounded hover:bg-page-bg">Deals</button>
            </div>
          </div>
          
          <div className="h-64 md:h-80 w-full bg-page-bg/50 rounded-xl border border-dashed border-border-main flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
             {/* Chart Visual Mockup */}
             <div className="absolute inset-0 flex items-end justify-around px-8 pb-4">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="w-8 md:w-12 bg-gradient-to-t from-trust-teal/40 to-trust-teal/10 rounded-t-lg border-x border-t border-trust-teal/20"
                  />
                ))}
             </div>
             <div className="relative z-10 text-center">
                <BarChart3 size={40} className="text-text-ghost mx-auto mb-2 opacity-20" />
                <p className="text-sm text-text-muted font-medium">Interactive charts coming soon</p>
             </div>
          </div>
        </div>

        {/* Side Analytics */}
        <div className="space-y-8">
          <section className="bg-card-bg border border-border-main rounded-card p-6 space-y-6">
            <h3 className="text-lg font-bold text-text-primary">Trust Score Factor</h3>
            <div className="space-y-5">
               {[
                 { label: 'Payment Timeliness', value: 98, color: 'bg-trust-teal' },
                 { label: 'Dispute Resolution', value: 85, color: 'bg-trust-purple' },
                 { label: 'Profile Accuracy', value: 92, color: 'bg-trust-amber' }
               ].map((f, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-text-muted">{f.label}</span>
                      <span className="text-text-primary">{f.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-page-bg rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${f.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${f.color}`}
                      />
                    </div>
                 </div>
               ))}
            </div>
          </section>

          <section className="bg-trust-teal/5 border border-trust-teal/20 rounded-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-trust-teal/10 text-trust-teal flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Growth Insight</h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Your business volume has increased by <span className="text-trust-teal font-bold">24%</span> since implementing Escrow protection. Your trust rating is now in the top <span className="text-trust-teal font-bold">5%</span> of MSMEs in Surat.
            </p>
            <Button variant="ghost" fullWidth size="sm" className="text-trust-teal hover:bg-trust-teal/10" onClick={() => addToast('Opening growth strategy...', 'info')}>
              View Growth Strategy <ArrowUpRight size={14} className="ml-2" />
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
