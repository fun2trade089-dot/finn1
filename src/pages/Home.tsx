import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { name: 'NIFTY 50', value: '24,324.50', change: '+1.24%', up: true },
    { name: 'SENSEX', value: '80,120.35', change: '+0.95%', up: true },
    { name: 'NIFTY BANK', value: '52,145.20', change: '-0.15%', up: false },
    { name: 'USD/INR', value: '83.42', change: '+0.02%', up: true },
  ];

  const features = [
    {
      title: 'Smart SIP Calculator',
      desc: 'Calculate the potential growth of your monthly investments with real-time compounding.',
      icon: <TrendingUp className="text-success" size={24} />,
      link: '/calculators',
      color: 'from-emerald-500/20 to-success/5'
    },
    {
      title: 'SWP Strategy',
      desc: 'Plan your retirement withdrawals to ensure your corpus lasts as long as you need.',
      icon: <PieChart className="text-blue-400" size={24} />,
      link: '/calculators',
      color: 'from-blue-500/20 to-blue-400/5'
    },
    {
      title: 'Top Performing Funds',
      desc: 'Discover the best mutual funds curated by historical performance and risk metrics.',
      icon: <BarChart3 className="text-amber-400" size={24} />,
      link: '/top-sips',
      color: 'from-amber-500/20 to-amber-400/5'
    },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-success/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass border border-white/10 text-success text-xs font-bold tracking-widest uppercase mb-6">
              The Future of Wealth Management
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-[1.1]">
              Plan Smarter. <br />
              <span className="gradient-text">Invest Better.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Master your finances with institutional-grade planning tools. 
              Track, analyze, and optimize your portfolio like a pro.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link to="/predictor" className="glass hover:bg-white/10 font-bold px-10 py-4 rounded-2xl transition-all">
                AI Predictor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-wrap justify-center md:justify-between gap-8 border-white/5">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start min-w-[140px]">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-heading">{stat.value}</span>
                <span className={`text-xs font-bold flex items-center ${stat.up ? 'text-success' : 'text-danger'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Precision Planning Tools</h2>
          <p className="text-gray-400">Everything you need to visualize and grow your wealth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl glass relative overflow-hidden group border-white/5 bg-linear-to-br ${f.color}`}
            >
              <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/20 transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">{f.desc}</p>
              <Link to={f.link} className="flex items-center gap-2 text-sm font-bold text-success hover:gap-3 transition-all">
                Explore Tool <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto mb-20">
        <div className="glass rounded-[40px] p-12 md:p-20 relative overflow-hidden border-white/5">
          <div className="absolute top-0 right-0 bg-success/5 w-64 h-64 blur-[80px] rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Why Trust <br /> <span className="text-success">Finnbase?</span></h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                We combine advanced algorithms with intuitive design to give you the clearest picture of your financial future.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-success/20 p-1.5 rounded-lg text-success"><ShieldCheck size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">Bank-Grade Precision</h4>
                    <p className="text-sm text-gray-500">Calculations based on actual compounding models.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-500/20 p-1.5 rounded-lg text-blue-400"><Zap size={20} /></div>
                  <div>
                    <h4 className="font-bold mb-1">Instant Insights</h4>
                    <p className="text-sm text-gray-500">See the impact of your decisions in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square glass rounded-3xl flex flex-col items-center justify-center p-6 text-center border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-3xl font-bold font-heading text-success mb-2">10M+</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Calculations</span>
              </div>
              <div className="aspect-square glass rounded-3xl flex flex-col items-center justify-center p-6 text-center border-white/10 translate-y-8 hover:bg-white/10 transition-colors">
                <span className="text-3xl font-bold font-heading text-accent mb-2">4.9/5</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">User Rating</span>
              </div>
              <div className="aspect-square glass rounded-3xl flex flex-col items-center justify-center p-6 text-center border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-3xl font-bold font-heading text-blue-400 mb-2">100%</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Free Forever</span>
              </div>
              <div className="aspect-square glass rounded-3xl flex flex-col items-center justify-center p-6 text-center border-white/10 translate-y-8 hover:bg-white/10 transition-colors">
                <span className="text-3xl font-bold font-heading text-white mb-2">24/7</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">AI Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
