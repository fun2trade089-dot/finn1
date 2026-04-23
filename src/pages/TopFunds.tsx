import { useState, useMemo } from 'react';
import { 
  Star, 
  Search, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { mockFunds, type Fund } from '../data/mockFunds';
import { formatCurrency } from '../utils/financeUtils';

const TopFunds = () => {
  const [filter, setFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<keyof Fund>('return1Y');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFunds = useMemo(() => {
    return mockFunds
      .filter(fund => filter === 'All' || fund.category === filter)
      .filter(fund => fund.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));
  }, [filter, sortBy, searchTerm]);

  const top5Data = useMemo(() => {
    return [...mockFunds]
      .sort((a, b) => b.return1Y - a.return1Y)
      .slice(0, 5)
      .map(f => ({ name: f.name.split(' ')[0], value: f.return1Y, fullName: f.name }));
  }, []);

  const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'ELSS'];

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-black mb-4">Top Performing <span className="text-success">Mutual Funds</span></h1>
        <p className="text-gray-400">Discover the highest-rated SIPs based on historical returns and risk analysis.</p>
      </div>

      {/* Analytics Chart */}
      <div className="glass rounded-[32px] p-8 mb-12 border-white/5 h-[300px]">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Top 5 Funds by 1Y Return (%)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={top5Data}>
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
              itemStyle={{ color: '#00C896' }}
              formatter={(value: number) => [`${value}%`, '1Y Return']}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {top5Data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#00C896' : '#1e293b'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-success text-primary' : 'glass text-gray-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search funds..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-success/50 transition-colors"
            />
          </div>
          <select 
            className="bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm focus:outline-none"
            onChange={(e) => setSortBy(e.target.value as keyof Fund)}
          >
            <option value="return1Y" className="bg-primary">Sort: 1Y Return</option>
            <option value="return3Y" className="bg-primary">Sort: 3Y Return</option>
            <option value="return5Y" className="bg-primary">Sort: 5Y Return</option>
            <option value="aum" className="bg-primary">Sort: AUM</option>
          </select>
        </div>
      </div>

      {/* Fund Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunds.map((fund) => (
          <div 
            key={fund.id}
            className="glass rounded-3xl p-6 border-white/5 hover:border-success/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={16} className="text-gray-500 hover:text-success cursor-pointer" />
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-success border border-white/10">
                {fund.house.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg leading-tight group-hover:text-success transition-colors">{fund.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{fund.house} • {fund.category}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-2 rounded-xl bg-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">1Y Ret</p>
                <p className="text-sm font-black text-success">{fund.return1Y}%</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">3Y Ret</p>
                <p className="text-sm font-black">{fund.return3Y}%</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Risk</p>
                <p className={`text-[10px] font-black uppercase ${fund.risk === 'Very High' ? 'text-danger' : 'text-amber-400'}`}>
                  {fund.risk}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Min SIP</p>
                <p className="font-bold text-sm">{formatCurrency(fund.minSIP)}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < fund.rating ? '#FFD700' : 'none'} stroke={i < fund.rating ? '#FFD700' : '#475569'} />
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredFunds.length === 0 && (
        <div className="text-center py-20 glass rounded-[32px] border-dashed border-white/10">
          <p className="text-gray-500">No funds found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default TopFunds;
