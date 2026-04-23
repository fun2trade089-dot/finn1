import { useState, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from 'recharts';
import { ArrowUpCircle, Info } from 'lucide-react';
import RangeInput from '../components/calculator/RangeInput';
import { calculateSIP, calculateSWP, formatCurrency } from '../utils/financeUtils';

const Calculators = () => {
  const [activeTab, setActiveTab] = useState<'SIP' | 'SWP'>('SIP');

  // SIP States
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // SWP States
  const [swpInvestment, setSwpInvestment] = useState(1000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState(10000);
  const [swpRate, setSwpRate] = useState(10);
  const [swpYears, setSwpYears] = useState(10);

  const sipResult = useMemo(() => calculateSIP(sipAmount, sipRate, sipYears), [sipAmount, sipRate, sipYears]);
  const swpResult = useMemo(() => calculateSWP(swpInvestment, swpWithdrawal, swpRate, swpYears), [swpInvestment, swpWithdrawal, swpRate, swpYears]);

  const sipPieData = [
    { name: 'Invested', value: sipResult.totalInvested },
    { name: 'Returns', value: sipResult.estimatedReturns },
  ];

  const COLORS = ['#1e293b', '#00C896'];

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-black mb-4">Financial <span className="text-success">Calculators</span></h1>
        <p className="text-gray-400">Plan your investments and withdrawals with mathematical precision.</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/5 p-1 rounded-2xl flex border border-white/5">
          <button 
            onClick={() => setActiveTab('SIP')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'SIP' ? 'bg-success text-primary' : 'text-gray-400 hover:text-white'}`}
          >
            SIP Calculator
          </button>
          <button 
            onClick={() => setActiveTab('SWP')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'SWP' ? 'bg-success text-primary' : 'text-gray-400 hover:text-white'}`}
          >
            SWP Calculator
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs Column */}
        <div className="glass rounded-[32px] p-8 md:p-10 border-white/5 space-y-10">
          {activeTab === 'SIP' ? (
            <>
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
            </>
          ) : (
            <>
              <RangeInput 
                label="Total Investment" 
                value={swpInvestment} 
                min={100000} 
                max={50000000} 
                step={50000} 
                prefix="₹" 
                onChange={setSwpInvestment} 
              />
              <RangeInput 
                label="Monthly Withdrawal" 
                value={swpWithdrawal} 
                min={1000} 
                max={500000} 
                step={500} 
                prefix="₹" 
                onChange={setSwpWithdrawal} 
              />
              <RangeInput 
                label="Expected Return Rate (p.a)" 
                value={swpRate} 
                min={1} 
                max={30} 
                step={0.1} 
                unit="%" 
                onChange={setSwpRate} 
              />
              <RangeInput 
                label="Time Period" 
                value={swpYears} 
                min={1} 
                max={40} 
                unit="Years" 
                onChange={setSwpYears} 
              />
            </>
          )}

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
                  <p className="text-gray-400 text-sm mb-1">{activeTab === 'SIP' ? 'Total Invested' : 'Total Withdrawn'}</p>
                  <p className="text-2xl font-black">{formatCurrency(activeTab === 'SIP' ? sipResult.totalInvested : swpResult.totalWithdrawn)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">{activeTab === 'SIP' ? 'Estimated Returns' : 'Remaining Corpus'}</p>
                  <p className="text-2xl font-black text-success">{formatCurrency(activeTab === 'SIP' ? sipResult.estimatedReturns : swpResult.remainingCorpus)}</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">{activeTab === 'SIP' ? 'Total Value' : 'Final Balance'}</p>
                  <p className="text-4xl font-black gradient-text">
                    {formatCurrency(activeTab === 'SIP' ? sipResult.totalCorpus : swpResult.remainingCorpus)}
                  </p>
                </div>
              </div>

              {/* Pie Chart for SIP */}
              {activeTab === 'SIP' && (
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
              )}
            </div>
          </div>

          {/* Growth Chart Card */}
          <div className="glass rounded-[32px] p-8 border-white/5 h-[340px]">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-500">
              {activeTab === 'SIP' ? 'Wealth Projection' : 'Corpus Depletion'}
            </h4>
            <ResponsiveContainer width="100%" height="80%">
              {activeTab === 'SIP' ? (
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
              ) : (
                <LineChart data={swpResult.withdrawalData}>
                  <XAxis dataKey="year" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Line type="monotone" dataKey="balance" stroke="#00C896" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="withdrawn" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </LineChart>
              )}
            </ResponsiveContainer>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-bold text-gray-600 uppercase">Year 1</span>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Year {activeTab === 'SIP' ? sipYears : swpYears}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
