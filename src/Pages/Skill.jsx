import React from "react";
import * as LucideIcons from "lucide-react";
import { skillsData, skillSection } from "../Data/Data.jsx";

// Helper component to render icon by string name
const DynamicIcon = ({ name, className }) => {
    const IconComponent = LucideIcons[name];
    if (!IconComponent) return <LucideIcons.Cpu className={className} />; // Fallback icon
    return <IconComponent className={className} />;
};

export default function SkillSection() {
    return (
        <section
            id="skill"
            className="relative py-24 px-6 sm:px-12 lg:px-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 md:w-12 h-0.5 bg-purple-600" />
                            <span className="text-xs md:text-sm font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] text-slate-400 uppercase">
                                 {skillSection.systemCall}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">Skills.</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {skillSection.para}
                    </p>
                </div>

                {/* --- SKILLS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skillsData.map((group, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-4xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(124,58,237,0.15)] hover:-translate-y-2"
                        >
                            <div className="flex items-center gap-5 mb-8">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                                    <DynamicIcon
                                        name={group.icon}
                                        className="w-6 h-6 transition-transform group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {group.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 text-sm font-semibold bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50 rounded-xl hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}