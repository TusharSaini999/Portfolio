import React, { useState, useEffect } from "react";
import { Github, Code2, X, Globe, Rocket, ArrowUpRight } from "lucide-react";
import { projectData, projectSection } from "../Data/Data.jsx";

export default function ProjectSection() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset';

        // Cleanup function to ensure overflow is reset if component unmounts
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProject]);

    return (
        <section
            id="projects"
            className="relative py-24 px-6 sm:px-12 lg:px-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <div className="w-8 sm:w-12 h-0.5 bg-purple-600 shrink-0"></div>

                            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] sm:tracking-[0.3em] 
                   text-slate-400 uppercase break-all">
                                {projectSection.systemCall}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {projectSection.title}{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">{projectSection.subtitle}</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {projectSection.para}
                    </p>
                </div>

                {/* --- PROJECT GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projectData.map((project, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedProject(project)}
                            className="group relative flex flex-col bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(124,58,237,0.25)] hover:-translate-y-3 cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-16/10 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                                        <ArrowUpRight className="text-white w-8 h-8" />
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white rounded-xl shadow-lg">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Footer Links */}
                                <div className="flex items-center gap-6 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 group/link"
                                    >
                                        <Globe size={18} className="group-hover/link:scale-110 transition-transform" />
                                        <span>Live</span>
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white group/link"
                                    >
                                        <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                                        <span>Source</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- FOOTER CTA --- */}
                <div className="mt-16 sm:mt-20 text-center px-4">
                    <a
                        href={projectSection.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
            group relative
            inline-flex sm:inline-flex
            w-full sm:w-auto
            items-center justify-center
            gap-2 sm:gap-3
            px-6 py-4
            sm:px-10 sm:py-5
            text-sm sm:text-base
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            font-black
            rounded-2xl
            transition-all duration-300
            hover:scale-105 active:scale-95
            shadow-xl shadow-purple-500/10
            focus:outline-none focus:ring-2 focus:ring-purple-500
        "
                    >
                        <Code2 size={20} className="sm:w-5.5 sm:h-5.5" />
                        <span className="whitespace-normal sm:whitespace-nowrap text-center">
                            {projectSection.linkText}
                        </span>

                        <span className="
            pointer-events-none absolute inset-0 rounded-2xl
            bg-linear-to-r from-purple-600 to-blue-600
            opacity-0 group-hover:opacity-10
            transition-opacity duration-300
        " />
                    </a>
                </div>

            </div>

            {/* --- MODAL --- */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-6 right-6 z-50 p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-purple-600 transition-all hover:rotate-90"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal Image Area */}
                        <div className="md:w-3/5 relative bg-slate-100 dark:bg-slate-950">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-transparent to-white dark:to-slate-900 hidden md:block" />
                        </div>

                        {/* Modal Content */}
                        <div className="md:w-2/5 p-10 md:p-14 overflow-y-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
                                <Rocket size={12} /> {selectedProject.category}
                            </div>

                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                                {selectedProject.title}
                            </h2>

                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                                {selectedProject.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {selectedProject.tech.map((tag, i) => (
                                    <span key={i} className="px-4 py-2 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={selectedProject.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all"
                                >
                                    <Globe size={20} /> Live
                                </a>

                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                >
                                    <Github size={20} /> GitHub
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}