import { useState, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area 
} from 'recharts';
import { ArrowUpCircle, Info } from 'lucide-react';
import RangeInput from '../components/calculator/RangeInput';
import { calculateSIP, formatCurrency } from '../utils/financeUtils';

const Calculators = () => {
  // SIP States
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  const sipResult = useMemo(() => calculateSIP(sipAmount, sipRate, sipYears), [sipAmount, sipRate, sipYears]);

  const sipPieData = [
    { name: 'Invested', value: sipResult.totalInvested },
    { name: 'Returns', value: sipResult.estimatedReturns },
  ];

  const COLORS = ['#1e293b', '#00C896'];

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-black mb-4">Financial <span className="text-success">Calculators</span></h1>
        <p className="text-gray-400">Plan your investments with mathematical precision.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs Column */}
        <div className="glass rounded-[32px] p-8 md:p-10 border-white/5 space-y-10">
          <RangeInput 
            label="Monthly Investment" 
            value={sipAmount} 
            min={500} 
            max={500000} 
            step={500} 
            prefix="₹" 
            onChange={setSipAmount} 
          />
          <RangeInput 
            label="Expected Return Rate (p.a)" 
            value={sipRate} 
            min={1} 
            max={30} 
            step={0.1} 
            unit="%" 
            onChange={setSipRate} 
          />
          <RangeInput 
            label="Time Period" 
            value={sipYears} 
            min={1} 
            max={40} 
            unit="Years" 
            onChange={setSipYears} 
          />

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-gray-500 text-xs italic">
              <Info size={14} />
              <p>Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</p>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="space-y-8">
          {/* Results Summary Card */}
          <div className="bg-linear-to-br from-success/20 to-success/5 rounded-[32px] p-8 border border-success/20 shadow-[0_0_40px_-10px_rgba(0,200,150,0.2)]">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <ArrowUpCircle className="text-success" />
              Estimation Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Invested</p>
                  <p className="text-2xl font-black">{formatCurrency(sipResult.totalInvested)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Estimated Returns</p>
                  <p className="text-2xl font-black text-success">{formatCurrency(sipResult.estimatedReturns)}</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">Total Value</p>
                  <p className="text-4xl font-black gradient-text">
                    {formatCurrency(sipResult.totalCorpus)}
                  </p>
                </div>
              </div>

              {/* Pie Chart for SIP */}
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sipPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {sipPieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase font-bold">
                    <div className="w-2 h-2 rounded-full bg-[#1e293b]" /> Invested
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase font-bold">
                    <div className="w-2 h-2 rounded-full bg-success" /> Returns
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Chart Card */}
          <div className="glass rounded-[32px] p-8 border-white/5 h-[340px]">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-500">
              Wealth Projection
            </h4>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={sipResult.growthData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C896" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00C896" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="total" stroke="#00C896" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="invested" stroke="#1e293b" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-bold text-gray-600 uppercase">Year 1</span>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Year {sipYears}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
