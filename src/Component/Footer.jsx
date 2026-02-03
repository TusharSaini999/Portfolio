import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    // Automatically updates to the current year
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-6 px-6 border-t transition-colors duration-300
                       bg-slate-50 border-slate-200 text-slate-600 
                       dark:bg-[#020617] dark:border-slate-800 dark:text-slate-400">

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

                    {/* Left: Crafted By Section */}
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm sm:text-base">
                        <span>Crafted with</span>
                        <Heart
                            size={16}
                            className="text-purple-600 dark:text-purple-400 fill-current animate-pulse"
                        />
                        <span>
                            by <span className="font-semibold text-slate-700 dark:text-slate-300">Tushar Saini</span>
                        </span>
                    </div>

                    {/* Middle: Dynamic Copyright */}
                    <div className="text-xs sm:text-sm order-3 sm:order-0 opacity-80">
                        © {currentYear} All rights reserved
                    </div>

                    {/* Right: Tech Stack Section */}
                    <div className="flex items-center justify-center sm:justify-end gap-1.5 text-sm sm:text-base">
                        <span className="opacity-80">Powered by</span>
                        <span className="font-bold tracking-tight text-purple-600 dark:text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                            React
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;