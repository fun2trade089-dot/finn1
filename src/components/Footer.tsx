import { Link } from 'react-router-dom';
import { Rocket, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary pt-20 pb-10 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-success p-1 rounded-lg">
              <Rocket className="text-primary" size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold font-heading">
              finn<span className="text-success">base</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering your financial journey with smart planning tools and real-time insights. 
            Invest smarter, grow faster.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 glass rounded-lg text-gray-400 hover:text-success hover:scale-110 transition-all"><Twitter size={18} /></a>
            <a href="#" className="p-2 glass rounded-lg text-gray-400 hover:text-success hover:scale-110 transition-all"><Linkedin size={18} /></a>
            <a href="#" className="p-2 glass rounded-lg text-gray-400 hover:text-success hover:scale-110 transition-all"><Github size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-6">Tools</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/calculators" className="hover:text-success transition-colors">SIP Calculator</Link></li>
            <li><Link to="/calculators" className="hover:text-success transition-colors">SWP Calculator</Link></li>
            <li><Link to="/top-sips" className="hover:text-success transition-colors">Mutual Fund Discovery</Link></li>
            <li><Link to="/predictor" className="hover:text-success transition-colors">AI Price Predictor</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-success transition-colors">Knowledge Center</a></li>
            <li><a href="#" className="hover:text-success transition-colors">Market Basics</a></li>
            <li><a href="#" className="hover:text-success transition-colors">Tax Planning</a></li>
            <li><a href="#" className="hover:text-success transition-colors">Blog</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 finnbase Technologies. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
