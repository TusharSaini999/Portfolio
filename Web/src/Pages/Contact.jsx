import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { contactData, contactSection, socialLinks, formLabels } from "../Data/Data.jsx";
import { DatabaseService } from "../Appwrite/Databases.Appwrite.js";

const databaseService = new DatabaseService();

const DynamicIcon = ({ name, className }) => {
    const IconComponent = LucideIcons[name];
    if (!IconComponent) return <LucideIcons.Mail className={className} />;
    return <IconComponent className={className} />;
};

export default function ContactSection() {
    // Status States
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    // Form and Validation States
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            const response = await databaseService.connect({
                fullName: formData.name,
                email: formData.email,
                message: formData.message,
            });

            if (response.status) {
                setIsSuccess(true);
                setFormData({ name: "", email: "", message: "" });
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsSubmitted(true);
            // Auto-hide the popup after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }
    };

    return (
        <section id="contact" className="relative py-16 sm:py-24 px-4 sm:px-12 lg:px-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <div className="w-8 sm:w-12 h-0.5 bg-purple-600 shrink-0"></div>
                            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 uppercase">
                                {contactSection.systemCall}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {contactSection.title}{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">
                                {contactSection.subtitle}
                            </span>
                        </h2>
                    </div>
                    <p className="max-w-md text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {contactSection.para}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* --- INFO CARDS --- */}
                    <div className="lg:col-span-5 space-y-8 order-1 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            {contactData.map((item, index) => (
                                <div key={index} className="p-5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4 hover:border-purple-500/50 transition-all group">
                                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
                                        <DynamicIcon name={item.icon} className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1 truncate">{item.label}</p>
                                        <p className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 text-center lg:text-left">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest">{formLabels.socialHeading}</p>
                            <div className="flex justify-center lg:justify-start gap-4">
                                {socialLinks.map((social, i) => (
                                    <a key={i} href={social.url} target="_blank" rel="noreferrer" className="p-3 bg-slate-900 dark:bg-purple-600 text-white rounded-xl hover:scale-110 transition-all">
                                        <DynamicIcon name={social.icon} className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- FORM --- */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-12 rounded-4xl shadow-2xl order-2 lg:order-2">
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">{formLabels.nameLabel}</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder={formLabels.namePlaceholder}
                                        className={`w-full px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none transition-all dark:text-white text-sm ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-purple-600 focus:ring-2'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs ml-2 font-medium">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">{formLabels.emailLabel}</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder={formLabels.emailPlaceholder}
                                        className={`w-full px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none transition-all dark:text-white text-sm ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-purple-600 focus:ring-2'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs ml-2 font-medium">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">{formLabels.messageLabel}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder={formLabels.messagePlaceholder}
                                    className={`w-full px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none transition-all dark:text-white resize-none text-sm ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-purple-600 focus:ring-2'}`}
                                />
                                {errors.message && <p className="text-red-500 text-xs ml-2 font-medium">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-slate-900 dark:bg-purple-600 text-white font-black text-base rounded-xl hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                {isLoading ? <LucideIcons.Loader2 className="w-5 h-5 animate-spin" /> : <LucideIcons.Send className="w-5 h-5" />}
                                {isLoading ? "Sending..." : formLabels.buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* --- STATUS POPUP: MOBILE BOTTOM-TO-UP TRANSITION --- */}
            <div
                className={`fixed z-50 transform transition-all duration-700 ease-out
        /* Position: Centered bottom on mobile, Bottom-right on desktop */
        bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-10 sm:w-auto
        
        ${isSubmitted
                        ? 'translate-y-0 translate-x-0 opacity-100'
                        : 'opacity-0 pointer-events-none translate-y-20 sm:translate-y-0 sm:translate-x-[120%]'
                    }`}
            >
                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 sm:px-8 sm:py-6 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex items-center gap-4 sm:gap-5 border border-purple-500">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${isError ? 'bg-red-500' : 'bg-purple-600'} animate-bounce`}>
                        {isError && (
                            <LucideIcons.AlertCircle className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                        {isSuccess && (
                            <LucideIcons.Check className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </div>
                    <div className="min-w-0">
                        {isError && (
                            <>
                                <p className="font-black text-base sm:text-lg text-red-500 leading-tight">{formLabels.errorTitle || "Request Failed"}</p>
                                <p className="text-xs sm:text-sm opacity-80 truncate">{formLabels.errorSubtitle || "Technical issue. Try again later."}</p>
                            </>
                        )}
                        {isSuccess && (
                            <>
                                <p className="font-black text-base sm:text-lg leading-tight">{formLabels.successTitle}</p>
                                <p className="text-xs sm:text-sm opacity-80 truncate">{formLabels.successSubtitle}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
    // return (
    //     <section id="contact" className="relative py-24 px-6 sm:px-12 lg:px-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
    //         <div className="max-w-7xl mx-auto relative z-10">
    //             {/* --- HEADER --- */}
    //             <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
    //                 <div className="space-y-8">
    //                     <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
    //                         <div className="w-8 sm:w-12 h-0.5 bg-purple-600 shrink-0"></div>
    //                         <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 uppercase">
    //                             {contactSection.systemCall}
    //                         </span>
    //                     </div>
    //                     <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
    //                         {contactSection.title}{" "}
    //                         <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">
    //                             {contactSection.subtitle}
    //                         </span>
    //                     </h2>
    //                 </div>
    //                 <p className="max-w-md text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
    //                     {contactSection.para}
    //                 </p>
    //             </div>

    //             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
    //                 {/* --- LEFT: INFO CARDS --- */}
    //                 <div className="lg:col-span-5 space-y-8">
    //                     <div className="grid grid-cols-1 gap-4">
    //                         {contactData.map((item, index) => (
    //                             <div key={index} className="p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center gap-5 hover:border-purple-500/50 transition-all group">
    //                                 <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
    //                                     <DynamicIcon name={item.icon} className="w-6 h-6" />
    //                                 </div>
    //                                 <div>
    //                                     <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
    //                                     <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>

    //                     {/* Social Links */}
    //                     <div className="pt-4">
    //                         <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 ml-2 uppercase tracking-widest">{formLabels.socialHeading}</p>
    //                         <div className="flex gap-4">
    //                             {socialLinks.map((social, i) => (
    //                                 <a key={i} href={social.url} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 dark:bg-purple-600 text-white rounded-2xl hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
    //                                     <DynamicIcon name={social.icon} className="w-6 h-6" />
    //                                 </a>
    //                             ))}
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/* --- RIGHT: FORM --- */}
    //                 <div className="lg:col-span-7 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl">
    //                     <form onSubmit={handleSubmit} noValidate className="space-y-6">
    //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                             {/* NAME FIELD */}
    //                             <div className="space-y-2">
    //                                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{formLabels.nameLabel}</label>
    //                                 <input
    //                                     name="name"
    //                                     value={formData.name}
    //                                     onChange={handleChange}
    //                                     type="text"
    //                                     placeholder={formLabels.namePlaceholder}
    //                                     className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all dark:text-white 
    //                                     ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-purple-600 focus:ring-2'}`}
    //                                 />
    //                                 {errors.name && <p className="text-red-500 text-xs ml-2 font-medium">{errors.name}</p>}
    //                             </div>

    //                             {/* EMAIL FIELD */}
    //                             <div className="space-y-2">
    //                                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{formLabels.emailLabel}</label>
    //                                 <input
    //                                     name="email"
    //                                     value={formData.email}
    //                                     onChange={handleChange}
    //                                     type="email"
    //                                     placeholder={formLabels.emailPlaceholder}
    //                                     className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all dark:text-white 
    //                                     ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-purple-600 focus:ring-2'}`}
    //                                 />
    //                                 {errors.email && <p className="text-red-500 text-xs ml-2 font-medium">{errors.email}</p>}
    //                             </div>
    //                         </div>

    //                         {/* MESSAGE FIELD */}
    //                         <div className="space-y-2">
    //                             <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{formLabels.messageLabel}</label>
    //                             <textarea
    //                                 name="message"
    //                                 value={formData.message}
    //                                 onChange={handleChange}
    //                                 rows="4"
    //                                 placeholder={formLabels.messagePlaceholder}
    //                                 className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all dark:text-white resize-none
    //                                 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-purple-600 focus:ring-2'}`}
    //                             />
    //                             {errors.message && <p className="text-red-500 text-xs ml-2 font-medium">{errors.message}</p>}
    //                         </div>

    //                         <button
    //                             type="submit"
    //                             disabled={isLoading}
    //                             className="w-full py-5 bg-slate-900 dark:bg-purple-600 text-white font-black text-lg rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.4)] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
    //                         >
    //                             {isLoading ? (
    //                                 <LucideIcons.Loader2 className="w-6 h-6 animate-spin" />
    //                             ) : (
    //                                 <LucideIcons.Send className="w-5 h-5" />
    //                             )}
    //                             {isLoading ? "Sending..." : formLabels.buttonText}
    //                         </button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>

    //         {/* --- STATUS POPUP --- */}
    //         <div className={`fixed bottom-10 right-6 z-50 transform transition-all duration-700 ${isSubmitted ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
    //             <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-6 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex items-center gap-5 border border-purple-500">
    //                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isError ? 'bg-red-500' : 'bg-purple-600'} animate-bounce`}>
    //                     {isError ? (
    //                         <LucideIcons.AlertCircle className="text-white w-6 h-6" />
    //                     ) : (
    //                         <LucideIcons.Check className="text-white w-6 h-6" />
    //                     )}
    //                 </div>
    //                 <div>
    //                     {isError ? (
    //                         <>
    //                             <p className="font-black text-lg text-red-500">{formLabels.errorTitle || "Error"}</p>
    //                             <p className="text-sm opacity-80">{formLabels.errorSubtitle || "Something went wrong."}</p>
    //                         </>
    //                     ) : (
    //                         <>
    //                             <p className="font-black text-lg">{formLabels.successTitle}</p>
    //                             <p className="text-sm opacity-80">{formLabels.successSubtitle}</p>
    //                         </>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // );
}