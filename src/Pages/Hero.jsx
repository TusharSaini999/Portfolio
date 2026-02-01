import React, { useState, useEffect } from "react";
import { Download, Github, Linkedin, Mail, Terminal, Code2, Database, Binary } from "lucide-react";
import SocialIcon from "../Component/SocialIcon.jsx";
import TechNode from "../Component/TechNode.jsx";
import {heroData} from "../Data/Data.jsx";

export default function HeroSection() {
    const { name, title, description, heroImage, socialLinks, ctaText, resumeLink, status } = heroData;
    const [firstName, lastName] = name.split(" ");
    const [displayedText, setDisplayedText] = useState("");
    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentTitle = title[titleIndex];
        if (charIndex < currentTitle.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + currentTitle[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 100); // typing speed in ms
            return () => clearTimeout(timeout);
        } else {
            // pause before next title
            const timeout = setTimeout(() => {
                setCharIndex(0);
                setDisplayedText("");
                setTitleIndex((prev) => (prev + 1) % title.length);
            }, 1500); // pause after full title
            return () => clearTimeout(timeout);
        }
    }, [charIndex, title, titleIndex]);

    return (
        <section className="relative min-h-dvh w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-12 lg:px-32 overflow-hidden bg-slate-50 dark:bg-[#020617] dark:text-slate-100 transition-colors duration-500 py-20 lg:py-0">

            {/* --- ENGINEER'S GRID BACKGROUND --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[1rem_1rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
            </div>

            {/* --- LEFT CONTENT: DEV PROFILE --- */}
            <div className="relative max-w-2xl z-10 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-1 mt-12 lg:mt-0">
                {/* Terminal Badge */}
                <div className="inline-flex items-center gap-3 px-3 py-1 mb-6 rounded-md border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                    <Terminal size={14} className="text-purple-600 dark:text-purple-400" />
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        system_status: <span className="text-emerald-500 font-bold">{status}</span>
                    </span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 leading-[0.9]">
                    <span className="text-slate-300 dark:text-slate-700">01.</span> {firstName}
                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-blue-400">
                        {lastName}
                    </span>
                </h1>

                <h2 className="text-lg md:text-xl font-mono text-slate-700 dark:text-slate-300 mb-6">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">&gt; </span>
                    {displayedText}
                    <span className="animate-blink">|</span>
                </h2>

                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed lg:border-l-2 border-slate-200 dark:border-slate-800 lg:pl-6">
                    {description}
                </p>

                {/* Action Group */}
                <div className="flex flex-col sm:flex-row items-center gap-8">
                    <a
                        href={resumeLink}
                        download
                        className="group relative px-8 py-4 bg-slate-900 dark:bg-purple-600 text-white font-bold rounded-lg flex items-center gap-3 transition-all hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
                    >
                        <span>{ctaText}</span>
                        <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    </a>


                    <div className="flex gap-6 items-center">
                        <SocialIcon Icon={Github} link={socialLinks.github} />
                        <SocialIcon Icon={Linkedin} link={socialLinks.linkedin} />
                        <SocialIcon Icon={Mail} link={socialLinks.mail} />
                    </div>
                </div>
            </div>

            {/* --- RIGHT CONTENT: THE STACK --- */}
            <div className="relative z-10 order-2 lg:order-2 mt-16 lg:mt-0.5">
                <div className="relative group">
                    {/* Image Container */}
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-112.5 lg:h-112.5 relative z-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                        <img
                            src={heroImage}
                            alt="Engineer Profile"
                            className="w-full h-full object-cover saturate-[0.6] hover:saturate-100 transition-all duration-700"
                        />
                        {/* Matrix-style overlay */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none font-mono text-[8px] break-all p-4">
                            01010111 01100101 01100010 00100000 01000100 01100101 01110110
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-slate-50 dark:from-[#020617] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Floating Nodes - Responsive positioning */}
                    <TechNode icon={<Code2 size={16} />} label={heroData.imageTag[0]} pos="-top-4 -right-4 lg:-right-8" delay="0s" />
                    <TechNode icon={<Database size={16} />} label={heroData.imageTag[1]} pos="top-1/2 -right-8 lg:-right-12" delay="1.5s" />
                    <TechNode icon={<Binary size={16} />} label={heroData.imageTag[2]} pos="-bottom-4 -left-4 lg:-left-8" delay="3s" />
                </div>
            </div>
        </section>
    );
}