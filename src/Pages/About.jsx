import React from "react";
import { GraduationCap, Laptop, Terminal, Sparkles, Box, Cpu } from "lucide-react";
import { aboutData } from "../Data/Data.jsx";

export default function AboutSection() {
    const { bio, stats, education, intershipStatus, currentLearning, interests, techStack } = aboutData;

    return (
        <section id="about" className="relative py-24 px-6 sm:px-12 lg:px-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* --- LEFT SIDE: THE TEXT ENGINE --- */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-0.5 bg-purple-600"></div>
                            <span className="text-sm font-mono font-bold tracking-[0.3em] text-slate-400 uppercase">
                                system.init(profile)
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1]">
                            Converting Logic <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-indigo-500 to-blue-500">
                                into meaningful digital experiences.
                            </span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                            {bio}
                        </p>

                        {/* Education & Role Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-sm">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                    <GraduationCap size={24} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1">Education</p>
                                    <p className="text-sm font-bold dark:text-slate-200 leading-tight">{education.degree}</p>
                                    <p className="text-[10px] text-slate-500">{education.school}</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-sm">
                                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                    <Laptop size={24} className="text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1">Status</p>
                                    <p className="text-sm font-bold dark:text-slate-200 leading-tight">{intershipStatus.status}</p>
                                    <p className="text-[10px] text-slate-500 italic">{intershipStatus.details}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Horizontal List */}
                        <div className="pt-4">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4 flex items-center gap-2">
                                <Box size={14} /> Core_Architecture
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 text-xs font-semibold bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: SYSTEM DASHBOARD --- */}
                    <div className="relative group">
                        {/* Decorative background glow */}
                        <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />

                        <div className="relative grid grid-cols-2 gap-4">
                            {/* Card 1: Stats Dashboard */}
                            <div className="col-span-2 p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-2">
                                        <Terminal size={18} className="text-purple-600" />
                                        <h3 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">Growth_Metrics</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-mono text-emerald-500">Live_Status</span>
                                    </div>
                                </div>
                                <div className="space-y-7">
                                    {stats.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs mb-2 font-bold dark:text-slate-300">
                                                <span>{item.label}</span>
                                                <span className="font-mono text-indigo-500">{item.percentage}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 2: Learning Focus */}
                            <div className="col-span-1 p-6 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-lg hover:-translate-y-1 transition-transform duration-300">
                                <Sparkles size={20} className="mb-4 text-purple-400" />
                                <p className="text-[10px] font-mono opacity-50 uppercase mb-1">Focusing_On</p>
                                <p className="font-bold text-sm tracking-tight leading-snug">{currentLearning}</p>
                            </div>

                            {/* Card 3: Interests */}
                            <div className="col-span-1 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex gap-1 mb-4">
                                    <Cpu size={20} className="text-indigo-600" />
                                </div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {interests.slice(0, 3).map((tag, idx) => (
                                        <span key={idx} className="text-[8px] px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="font-bold text-sm dark:text-slate-200">Creative Technologist</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}