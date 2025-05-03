import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-4 border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
        
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">GlobalSnapshot</h3>
            <p className="text-gray-400">
              Access detailed profiles for all 250+ sovereign nations and territories worldwide.
            </p>
            <p className="text-sm text-gray-500">
              Data sourced from REST Countries API v3.1
            </p>
          </div>

          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Key Metrics</h3>
            <p className="text-gray-400">
              Compare populations, areas, and regional groupings across continents.
            </p>
            <p className="text-sm text-gray-500">
              All measurements in metric units
            </p>
          </div>

        
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">API Features</h3>
            <p className="text-gray-400">
              Real-time data on currencies, languages, borders, and timezones.
            </p>
            <p className="text-sm text-gray-500">
              Updated with geopolitical changes
            </p>
          </div>

       
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Credits</h3>
            <p className="text-gray-400">
              Powered by REST Countries API
            </p>
            <p className="text-sm text-gray-500">
              Developed for educational purposes
            </p>
          </div>
        </div>

       
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} World Countries Explorer. Not affiliated with any government.
          </p>
          <p className="text-center text-gray-600 text-xs mt-1">
            Data accuracy not guaranteed - For reference only
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
