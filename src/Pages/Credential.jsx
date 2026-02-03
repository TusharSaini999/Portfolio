import React, { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { credentialsData, credentialSection } from "../Data/Data.jsx";

const DynamicIcon = ({ name, className }) => {
    const IconComponent = LucideIcons[name];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Award className={className} />;
};

export default function SectionSpecificFilter() {
    const [activeHackathonFilter, setActiveHackathonFilter] = useState("All");

    const hackathonLabels = useMemo(() => {
        const hackathonSection = credentialsData.find(
            c => c.mainTitle === "Hackathons & Competitions"
        );
        return ["All", ...hackathonSection.subParts.map(sub => sub.label)];
    }, []);

    return (
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-20 xl:px-32 bg-slate-50 dark:bg-[#020617]">
            <div className="max-w-7xl mx-auto">

                {/* ---------- HEADER ---------- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <div className="w-8 sm:w-12 h-0.5 bg-purple-600 shrink-0"></div>

                            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] sm:tracking-[0.3em] 
                                                   text-slate-400 uppercase break-all">
                                {credentialSection.systemCall}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {credentialSection.title}{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">{credentialSection.subtitle}</span>
                        </h2>
                    </div>
                </div>

                {/* ---------- CONTENT ---------- */}
                <div className="space-y-24 sm:space-y-32">
                    {credentialsData.map(category => {
                        const isHackathon = category.mainTitle === "Hackathons & Competitions";

                        const filteredSubParts =
                            isHackathon && activeHackathonFilter !== "All"
                                ? category.subParts.filter(sub => sub.label === activeHackathonFilter)
                                : category.subParts;

                        return (
                            <div key={category.mainTitle}>

                                {/* ---------- GROUP HEADER ---------- */}
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl bg-linear-to-br ${category.themeColor} text-white`}>
                                            <DynamicIcon name={category.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-slate-900 dark:text-white">
                                            {category.mainTitle}
                                        </h3>
                                    </div>

                                    {/* ---------- FILTERS ---------- */}
                                    {isHackathon && (
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {hackathonLabels.map(label => (
                                                <button
                                                    key={label}
                                                    onClick={() => setActiveHackathonFilter(label)}
                                                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-[10px] sm:text-[11px]
                            font-black uppercase tracking-widest border transition-all
                            ${activeHackathonFilter === label
                                                            ? "bg-purple-600 border-purple-600 text-white"
                                                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                                                        }`}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* ---------- CARDS GRID ---------- */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {filteredSubParts.map(sub =>
                                        sub.items.map((item, i) => (
                                            <div
                                                key={`${sub.label}-${i}`}
                                                className="flex flex-col p-6 sm:p-7 rounded-4xl
                          bg-white dark:bg-slate-900/60
                          border border-slate-200 dark:border-slate-800
                          transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                            >
                                                {/* Meta */}
                                                <div className="flex items-center justify-between mb-5">
                                                    <div>
                                                        <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
                                                            {item.location}
                                                        </p>
                                                        <p className="text-xs font-mono text-purple-600">
                                                            {item.year}
                                                        </p>
                                                    </div>

                                                    <span className="inline-flex items-center px-2 py-1 h-fit rounded-md text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                        {sub.label}
                                                    </span>
                                                </div>


                                                {/* Title */}
                                                <h4 className="text-base sm:text-lg font-bold mb-2 text-slate-900 dark:text-white">
                                                    {item.title}
                                                </h4>

                                                {/* Description */}
                                                <p className="text-sm sm:text-[15px] text-slate-500 dark:text-slate-400
                          leading-relaxed line-clamp-3 grow">
                                                    {item.shortInfo}
                                                </p>

                                                {/* Badge */}
                                                <div className="mt-6">
                                                    <span className="inline-block px-3 py-1 rounded-lg text-[9px] sm:text-[10px]
                            font-black uppercase bg-purple-50 dark:bg-purple-900/20
                            text-purple-600 dark:text-purple-400">
                                                        {item.detail}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
