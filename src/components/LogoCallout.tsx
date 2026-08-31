import { useState } from 'react';
import styles from './LogoCallout.module.css';

interface Company {
  name: string;
  logo: string;
  title?: string;
  description?: string;
}

interface LogoCalloutProps {
  companies: Company[];
}

export default function LogoCallout({ companies }: LogoCalloutProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleLogoClick = (company: Company) => {
    setSelectedCompany(company);
    setIsPaused(true);
  };

  const handleClose = () => {
    setSelectedCompany(null);
    setIsPaused(false);
  };

  return (
    <>
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary/10 dark:from-primary/20 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary/10 dark:from-primary/20 to-transparent z-10" />

        {/* Marquee content */}
        <div 
          className={styles['logo-scroll-container']}
        >
          <div 
            className={`${styles['logo-scroll']} ${isPaused ? styles.paused : ''}`}
            style={{ width: 'fit-content' }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="inline-flex flex-shrink-0 w-32 h-16 items-center justify-center"
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className={`w-auto opacity-75 hover:opacity-100 transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer ${
                    company.logo.includes('figtree-logo') || company.logo.includes('harris-paints-logo') || company.logo.includes('Anthropic_Symbol') || company.logo.includes('BlueHat_logo') || company.logo.includes('verihome')
                      ? 'h-10'
                      : 'h-8'
                  }`}
                  onClick={() => handleLogoClick(company)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Callout Box */}
        {selectedCompany && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
            <div 
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl mx-4 transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedCompany.logo} 
                    alt={selectedCompany.name} 
                    className="h-12 w-auto"
                  />
                  <h4 className="font-heading text-lg mb-0 text-primary">
                    {selectedCompany.title || `Working with ${selectedCompany.name}`}
                  </h4>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedCompany.description || "Description coming soon..."}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
