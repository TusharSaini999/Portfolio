function TechNode({ icon, label, pos, delay }) {
    return (
        <div
            className={`absolute z-20 hidden sm:flex items-center gap-2 px-3 py-2
            bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800
            rounded-lg shadow-xl ${pos} animate-bounce`}
            style={{ animationDuration: '4s', animationDelay: delay }}
        >
            <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                {label}
            </span>
        </div>
    );
}

export default TechNode;