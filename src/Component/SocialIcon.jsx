
function SocialIcon({ Icon, link }) {
    return (
        <a href={link} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1">
            <Icon size={22} />
        </a>
    );
}

export default SocialIcon;