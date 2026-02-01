import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { Link, scroller } from "react-scroll";
import { navLinks } from "../Data/Data.jsx";


export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [activeSections, setActiveSections] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    /* Initial progressive highlight + restore last position */
    useEffect(() => {
        const saved = localStorage.getItem("activeSections");
        const targetSections = saved ? JSON.parse(saved) : ["home"];

        targetSections.forEach((section, index) => {
            setTimeout(() => {
                setActiveSections((prev) => [...prev, section]);

                if (index === targetSections.length - 1) {
                    scroller.scrollTo(section, {
                        duration: 800,
                        smooth: "easeInOutQuart",
                        offset: -65,
                    });
                    setTimeout(() => setIsInitialLoad(false), 800);
                }
            }, index * 150);
        });
    }, []);

    /* Close mobile menu on outside click */
    useEffect(() => {
        if (!mobileMenuOpen) return;

        const closeMenu = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setMobileMenuOpen(false);
            }
        };

        const closeOnScroll = () => {
            setMobileMenuOpen(false);
        };

        document.addEventListener("mousedown", closeMenu);
        document.addEventListener("touchstart", closeMenu);
        window.addEventListener("scroll", closeOnScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", closeMenu);
            document.removeEventListener("touchstart", closeMenu);
            window.removeEventListener("scroll", closeOnScroll);
        };
    }, [mobileMenuOpen]);


    /* Scroll progress bar */
    useEffect(() => {
        const handleScroll = () => {
            const total =
                document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress((window.scrollY / total) * 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSetActive = (currentHref) => {
        if (isInitialLoad) return;

        const index = navLinks.findIndex(
            (link) => link.href === currentHref
        );

        if (index !== -1) {
            const range = navLinks
                .slice(0, index + 1)
                .map((link) => link.href);

            setActiveSections(range);
            localStorage.setItem("activeSections", JSON.stringify(range));
        }
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-right from-purple-500 to-pink-500 transition-all duration-200"
                style={{ width: `${scrollProgress}%` }}
            />

            <div className="max-w-7xl mx-auto h-16 px-6 md:px-12 flex items-center justify-between">
                <Link
                    to="home"
                    smooth
                    spy
                    onSetActive={() => handleSetActive("home")}
                    className="cursor-pointer"
                >
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 rounded-lg bg-slate-900 dark:bg-purple-600 text-white group-hover:rotate-12 transition-transform">
                            <Terminal size={18} />
                        </div>
                        <span className="font-mono font-bold text-lg dark:text-white">
                            Tushar<span className="text-purple-600">_</span>Saini
                        </span>
                    </div>
                </Link>

                {/* Desktop */}
                <ul className="hidden md:flex items-center">
                    {navLinks.map((link, idx) => {
                        const isActive = activeSections.includes(link.href);

                        return (
                            <li key={link.name} className="flex items-center relative">
                                <Link
                                    to={link.href}
                                    smooth
                                    spy
                                    offset={-65}

                                    onSetActive={handleSetActive}
                                    className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-500 cursor-pointer
                    ${isActive
                                            ? "text-purple-600 dark:text-purple-400 font-bold -translate-y-0.5"
                                            : "text-slate-500 hover:text-purple-400"
                                        }`}
                                >
                                    <span
                                        className={`mr-1 transition-all duration-500 ${isActive
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-2"
                                            }`}
                                    >
                                        &gt;
                                    </span>
                                    {link.name}

                                    <span
                                        className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-700 ${isActive ? "w-full" : "w-0"
                                            }`}
                                    />
                                </Link>

                                {idx !== navLinks.length - 1 && (
                                    <span
                                        className={`h-px w-4 transition-colors duration-700 ${isActive
                                            ? "bg-purple-600/50"
                                            : "bg-slate-200 dark:bg-slate-800"
                                            }`}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile toggle */}
                <button
                    ref={buttonRef}
                    onClick={() => setMobileMenuOpen((v) => !v)}
                    className="md:hidden p-2 dark:text-white"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                ref={menuRef}
                className={`md:hidden absolute top-16 left-0 w-full origin-top transition-all duration-500 ${mobileMenuOpen
                    ? "scale-y-100 opacity-100"
                    : "scale-y-0 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-slate-800 shadow-xl">
                    <ul className="py-4">
                        {navLinks.map((link, idx) => {
                            const isActive = activeSections.includes(link.href);

                            return (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        smooth
                                        spy
                                        offset={-65}
                                        isDynamic={true}
                                        onSetActive={handleSetActive}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between px-6 py-4 font-mono text-xs uppercase tracking-widest transition-all
                      ${isActive
                                                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 font-bold"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span
                                                className={`transition-all ${isActive
                                                    ? "opacity-100 translate-x-0"
                                                    : "opacity-0 -translate-x-2"
                                                    }`}
                                            >
                                                &gt;
                                            </span>
                                            {link.name}
                                        </span>

                                        <span
                                            className={`h-0.5 w-6 ${isActive
                                                ? "bg-purple-600"
                                                : "bg-slate-200 dark:bg-slate-700"
                                                }`}
                                        />
                                    </Link>

                                    {idx !== navLinks.length - 1 && (
                                        <div
                                            className={`h-px mx-6 ${isActive
                                                ? "bg-purple-600/40"
                                                : "bg-slate-200 dark:bg-slate-800"
                                                }`}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
