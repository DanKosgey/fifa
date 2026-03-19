import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#00143F] text-white pt-16 pb-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Sponsors Section */}
        <div className="mb-12 border-b border-gray-700 pb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-400">FIFA Partners</h3>
          <div className="flex flex-wrap gap-8 items-center justify-start opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Placeholder for logos */}
            <span className="text-xl font-bold">adidas</span>
            <span className="text-xl font-bold">aramco</span>
            <span className="text-xl font-bold">Coca-Cola</span>
            <span className="text-xl font-bold">Hyundai</span>
            <span className="text-xl font-bold">QATAR AIRWAYS</span>
            <span className="text-xl font-bold italic">VISA</span>
          </div>
        </div>

        <div className="mb-12 border-b border-gray-700 pb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-400">FIFA World Cup 2026™ Sponsors</h3>
          <div className="flex flex-wrap gap-8 items-center justify-start opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-xl font-bold">Anheuser-Busch</span>
            <span className="text-xl font-bold">Bank of America</span>
            <span className="text-xl font-bold">Frito Lay</span>
            <span className="text-xl font-bold">McDonald's</span>
            <span className="text-xl font-bold">verizon</span>
          </div>
        </div>

        <div className="mb-12 border-b border-gray-700 pb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-400">FIFA Women's Football Partners</h3>
          <div className="flex flex-wrap gap-8 items-center justify-start opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-xl font-bold">Xero</span>
          </div>
        </div>

        {/* Links and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Manage Cookie Preferences</a>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>

        {/* App Download and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div className="flex space-x-4">
            <button className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-900 transition-colors">
              <span className="text-xs">Download on the<br/><strong className="text-sm text-white">App Store</strong></span>
            </button>
            <button className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-900 transition-colors">
              <span className="text-xs">GET IT ON<br/><strong className="text-sm text-white">Google Play</strong></span>
            </button>
          </div>
          <p>Copyright © 1994 - 2024 FIFA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
