import { motion } from 'framer-motion';
import { Lock, Cpu, BarChart3, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

const StockPredictor = () => {
  const previewCards = [
    { title: 'Price Prediction', icon: <TrendingUp size={20} />, desc: 'Next 7/30/90 days forecast' },
    { title: 'AI Recommendation', icon: <Cpu size={20} />, desc: 'Buy / Hold / Sell signals' },
    { title: 'Sentiment Analysis', icon: <BarChart3 size={20} />, desc: 'Real-time news sentiment' },
    { title: 'Technical Indicators', icon: <AlertCircle size={20} />, desc: 'RSI, MACD, Bollinger Bands' },
  ];

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-success/5 blur-[120px] rounded-full -z-10 animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-accent text-xs font-bold uppercase tracking-widest mb-8">
          <Sparkles size={14} /> Coming Soon
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">
          AI Stock Price <br /> <span className="gradient-text">Predictor</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We're training our neural networks to analyze millions of data points, 
          news sentiments, and technical patterns to give you the ultimate trading edge.
        </p>
      </motion.div>

      {/* Feature Grid (Blurred/Locked) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-20">
        {previewCards.map((card, i) => (
          <div key={i} className="glass rounded-[32px] p-8 border-white/5 relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center opacity-100 group-hover:backdrop-blur-none group-hover:bg-transparent transition-all duration-500">
              <Lock size={24} className="text-white/20 group-hover:scale-110 transition-transform" />
            </div>
            
            <div className="text-success mb-4">{card.icon}</div>
            <h3 className="font-bold mb-2">{card.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-xl">
        <div className="mb-10">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
            <span className="text-gray-500">Development Progress</span>
            <span className="text-success">72%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-success to-emerald-400 rounded-full" 
            />
          </div>
        </div>
        
        <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          Full launch expected Q3 2026
        </p>
      </div>
    </div>
  );
};

export default StockPredictor;
