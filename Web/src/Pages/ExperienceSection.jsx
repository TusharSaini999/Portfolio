import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experienceData, experienceSection } from "../Data/Data.jsx";

export default function ExperienceSection() {
    return (
        <section
            id="experience"
            className="relative py-16 md:py-24 px-4 sm:px-8 lg:px-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <div className="w-8 sm:w-12 h-0.5 bg-purple-600 shrink-0"></div>

                            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] sm:tracking-[0.3em] 
                                   text-slate-400 uppercase break-all">
                                {experienceSection.systemCall}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {experienceSection.title}{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">{experienceSection.subtitle}</span>
                        </h2>
                    </div>
                </div>

                {/* --- EXPERIENCE LIST --- */}
                <div className="flex flex-col gap-6 md:gap-10">
                    {experienceData.map((exp, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-3xl md:rounded-4xl p-6 md:p-10 lg:p-12 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(124,58,237,0.15)] hover:-translate-y-1 md:hover:-translate-y-2"
                        >
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                                {/* Left Side: Company & Role Metadata */}
                                <div className="w-full lg:w-1/3 space-y-6">
                                    <div className="flex flex-row lg:flex-col items-center lg:items-start gap-5 lg:gap-6">
                                        {/* LOGO CONTAINER */}
                                        <div className="relative shrink-0">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:border-purple-500/50">
                                                {exp.logo ? (
                                                    <img
                                                        src={exp.logo}
                                                        alt={exp.company}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Briefcase className="text-purple-600 dark:text-purple-400" size={28} />
                                                )}
                                            </div>
                                            <div className="absolute -inset-2 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                                                {exp.role}
                                            </h3>
                                            <p className="text-lg md:text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                                                {exp.company}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mobile/Tablet Meta Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
                                            <Calendar size={18} className="text-purple-500 shrink-0" />
                                            <span>{exp.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
                                            <MapPin size={18} className="text-purple-500 shrink-0" />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Work Details */}
                                <div className="w-full lg:w-2/3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-8 lg:pt-0 lg:pl-12">
                                    <ul className="space-y-4 md:space-y-5 mb-8">
                                        {exp.description.map((point, i) => (
                                            <li key={i} className="flex items-start gap-3 md:gap-4 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                                                <div className="mt-2 shrink-0">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                                </div>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                                        {exp.techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded-lg md:rounded-xl border border-slate-200 dark:border-slate-700 transition-all hover:border-purple-500/50 hover:text-purple-600 hover:-translate-y-1"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}