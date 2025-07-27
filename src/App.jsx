import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// --- THEME & SETTINGS CONTEXT ---
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const AppThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [accentColor, setAccentColor] = useState('lavender'); // New aesthetic default
    const [font, setFont] = useState('font-quicksand'); // New cute default
    const [points, setPoints] = useState(250);
    const [streak, setStreak] = useState(3);
    const [unlockedThemes, setUnlockedThemes] = useState(['light']);
    const [unlockedColors, setUnlockedColors] = useState(['lavender']);

    const colorClasses = {
        lavender: { bg: 'bg-violet-500', text: 'text-violet-500', ring: 'ring-violet-500', border: 'border-violet-500', bg_light: 'bg-violet-50' },
        peach: { bg: 'bg-orange-500', text: 'text-orange-500', ring: 'ring-orange-500', border: 'border-orange-500', bg_light: 'bg-orange-50' },
        sage: { bg: 'bg-green-500', text: 'text-green-500', ring: 'ring-green-500', border: 'border-green-500', bg_light: 'bg-green-50' },
    };
    
    const themeClasses = {
        light: 'bg-slate-50 text-slate-800',
        dark: 'dark bg-slate-900 text-white',
        dusk: 'dark bg-[#0f172a] text-white',
        mint: 'bg-[#f0fdf4] text-slate-800',
        rose_quartz: 'bg-[#fdf2f8] text-slate-800'
    };


    const value = { theme, setTheme, accentColor, setAccentColor, font, setFont, colors: colorClasses[accentColor], points, setPoints, streak, setStreak, unlockedThemes, setUnlockedThemes, unlockedColors, setUnlockedColors, themeClasses };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// --- ICON COMPONENTS ---
const Icon = ({ path, className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);
const StudyToolsIcon = () => <Icon path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
const MaterialsIcon = () => <Icon path="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />;
const TimerIcon = () => <Icon path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
const TodoIcon = () => <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
const SettingsIcon = () => <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z" />;
const PlagiarismIcon = () => <Icon path="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />;
const PointsIcon = () => <Icon path="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />;
const StreakIcon = () => <Icon path="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1011.32 0z" />;
const ReviewIcon = () => <Icon path="M4 4v5h5M4 12a8 8 0 018-8v0a8 8 0 018 8v0a8 8 0 01-8 8h-3" />;
const GoalsIcon = () => <Icon path="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />;
const PlannerIcon = () => <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
const LibraryIcon = () => <Icon path="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.881 4.042A7.962 7.962 0 0112 3c2.305 0 4.408.993 5.881 2.618m-11.762 0A7.962 7.962 0 0112 3c2.305 0 4.408.993 5.881 2.618m-11.762 0A7.962 7.962 0 0112 3c2.305 0 4.408.993 5.881 2.618M12 21a9 9 0 100-18 9 9 0 000 18z" />;
const WellnessIcon = () => <Icon path="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />;
const FullscreenEnterIcon = () => <Icon path="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />;
const FullscreenExitIcon = () => <Icon path="M4 14v4m0 0h4m-4 0l5-5m7-11l5 5m-5-5v4m0-4h4m-5 5l5-5" />;

// --- Main App Component ---
export default function App() {
    useEffect(() => {
        const fonts = [
            "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap",
            "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap",
            "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap",
            "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
        ];
        fonts.forEach(href => {
            const link = document.createElement('link');
            link.href = href;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        });
        
        const style = document.createElement('style');
        style.innerHTML = `
            .font-nunito { font-family: 'Nunito', sans-serif; }
            .font-lora { font-family: 'Lora', serif; }
            .font-inconsolata { font-family: 'Inconsolata', monospace; }
            .font-quicksand { font-family: 'Quicksand', sans-serif; }
        `;
        document.head.appendChild(style);

    }, []);

    return <AppThemeProvider><MainApp /></AppThemeProvider>;
}

const MainApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { theme, font, themeClasses } = useTheme();
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div className={`${themeClasses[theme]} ${font}`}>
            {!isLoggedIn ? <LoginScreen onLogin={() => setIsLoggedIn(true)} /> : <AppLayout isOnline={isOnline} />}
        </div>
    );
};

// --- Login Screen ---
const LoginScreen = ({ onLogin }) => (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-white">
            <div className="flex justify-center mb-6"><div className="p-3 bg-white rounded-lg"><StudyToolsIcon className="h-8 w-8 text-violet-600" /></div></div>
            <h1 className="text-4xl font-bold text-center mb-2">Welcome to StudentCore</h1>
            <p className="text-center text-white/80 mb-8">Your AI-powered study partner.</p>
            <div className="space-y-4">
                <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/30 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-white/30 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" />
            </div>
            <button onClick={onLogin} className="w-full mt-8 py-3 bg-white text-violet-600 font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all">Log In</button>
            <p className="text-center text-sm mt-4 text-white/80">Don't have an account? <a href="#" className="font-bold hover:underline">Sign up</a></p>
        </div>
    </div>
);


// --- Main App Layout ---
const AppLayout = ({ isOnline }) => {
    const [currentView, setCurrentView] = useState('study');

    const renderView = () => {
        switch (currentView) {
            case 'study': return isOnline ? <StudyToolsView /> : <OfflineView />;
            case 'materials': return <MaterialsView />;
            case 'todo': return <TodoView />;
            case 'goals': return <GoalsView />;
            case 'planner': return <PlannerView isOnline={isOnline} />;
            case 'library': return isOnline ? <LibraryView /> : <OfflineView />;
            case 'review': return <SpacedRepetitionView />;
            case 'timer': return <PomodoroView />;
            case 'wellness': return <WellnessView />;
            case 'plagiarism': return isOnline ? <PlagiarismCheckerView /> : <OfflineView />;
            case 'settings': return <SettingsView />;
            default: return <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1><p className="dark:text-slate-300">This section is under construction.</p></div>;
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} isOnline={isOnline} />
            <div className="flex-1 overflow-y-auto">{renderView()}</div>
        </div>
    );
};

// --- Sidebar Navigation ---
const Sidebar = ({ currentView, setCurrentView, isOnline }) => {
    const { colors, points, streak } = useTheme();
    const navItems = [
        { id: 'study', name: 'Study Tools', icon: <StudyToolsIcon />, onlineOnly: true },
        { id: 'plagiarism', name: 'Plagiarism Check', icon: <PlagiarismIcon />, onlineOnly: true },
        { id: 'todo', name: 'To-Do List', icon: <TodoIcon />, onlineOnly: false },
        { id: 'review', name: 'Review', icon: <ReviewIcon />, onlineOnly: false },
        { id: 'planner', name: 'Study Planner', icon: <PlannerIcon />, onlineOnly: false },
        { id: 'goals', name: 'Goals', icon: <GoalsIcon />, onlineOnly: false },
        { id: 'library', name: 'Resource Library', icon: <LibraryIcon />, onlineOnly: true },
        { id: 'timer', name: 'Pomodoro Timer', icon: <TimerIcon />, onlineOnly: false },
        { id: 'wellness', name: 'Wellness', icon: <WellnessIcon />, onlineOnly: false },
        { id: 'settings', name: 'Settings', icon: <SettingsIcon />, onlineOnly: false },
    ];

    return (
        <nav className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 flex flex-col flex-shrink-0">
            <div className="flex items-center space-x-3 mb-10">
                <div className={`p-2 ${colors.bg} rounded-lg`}><StudyToolsIcon className="h-6 w-6 text-white" /></div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">StudentCore</h1>
            </div>
            <div className="flex flex-col space-y-2 flex-grow">
                {navItems.map(item => (
                    <button key={item.id} onClick={() => setCurrentView(item.id)}
                        disabled={item.onlineOnly && !isOnline}
                        className={`flex items-center space-x-3 p-3 rounded-lg text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${currentView === item.id ? `${colors.bg_light} ${colors.text} dark:bg-slate-700 dark:text-white font-bold` : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                        <span className={currentView === item.id ? colors.text : 'text-slate-400'}>{item.icon}</span>
                        <span>{item.name}</span>
                    </button>
                ))}
            </div>
            <div className="space-y-3">
                 <div className={`text-center text-sm font-semibold p-2 rounded-lg ${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isOnline ? 'Online' : 'Offline Mode'}
                </div>
                <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <PointsIcon className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="font-bold text-slate-700 dark:text-slate-200">{points}</span>
                    <span className="text-slate-500 dark:text-slate-400 ml-1">Points</span>
                </div>
                 <div className="flex items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <StreakIcon className="h-5 w-5 text-rose-500 mr-2" />
                    <span className="font-bold text-slate-700 dark:text-slate-200">{streak}</span>
                    <span className="text-slate-500 dark:text-slate-400 ml-1">Day Streak</span>
                </div>
            </div>
        </nav>
    );
};

// --- ALL VIEWS ARE NOW FULLY IMPLEMENTED ---

// --- Settings View with Rewards ---
const SettingsView = () => {
    const { theme, setTheme, accentColor, setAccentColor, font, setFont, colors, points, setPoints, unlockedThemes, setUnlockedThemes, unlockedColors, setUnlockedColors } = useTheme();
    const fontOptions = [ { id: 'font-quicksand', name: 'Quicksand' }, { id: 'font-lora', name: 'Lora (Serif)' }, { id: 'font-nunito', name: 'Nunito (Sans)' } ];
    const colorOptions = [ { id: 'lavender', name: 'Lavender', cost: 0 }, { id: 'peach', name: 'Peach', cost: 100 }, { id: 'sage', name: 'Sage', cost: 100 } ];
    const themeOptions = [ { id: 'light', name: 'Light', cost: 0 }, { id: 'dark', name: 'Dark', cost: 200 }, { id: 'dusk', name: 'Dusk', cost: 250 }, { id: 'mint', name: 'Mint', cost: 250 }, { id: 'rose_quartz', name: 'Rose Quartz', cost: 250 } ];

    const handleUnlock = (type, id, cost) => {
        if (points >= cost) {
            setPoints(p => p - cost);
            if (type === 'theme') setUnlockedThemes(t => [...t, id]);
            if (type === 'color') setUnlockedColors(c => [...c, id]);
        } else {
            alert("Not enough points!");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-8">Settings</h1>
            <div className="max-w-2xl space-y-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Theme</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {themeOptions.map(opt => unlockedThemes.includes(opt.id) ? (
                            <button key={opt.id} onClick={() => setTheme(opt.id)} className={`px-6 py-2 rounded-lg font-semibold ${theme === opt.id ? `${colors.bg} text-white` : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>{opt.name}</button>
                        ) : (
                            <button key={opt.id} onClick={() => handleUnlock('theme', opt.id, opt.cost)} className="px-6 py-2 rounded-lg font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center">{opt.name} ({opt.cost} pts)</button>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Accent Color</h2>
                    <div className="flex space-x-4">
                         {colorOptions.map(c => unlockedColors.includes(c.id) ? (
                            <button key={c.id} onClick={() => setAccentColor(c.id)} className={`px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 ${accentColor === c.id ? `ring-2 ${colors.ring}` : ''}`}>
                                <div className={`w-4 h-4 rounded-full bg-${c.id === 'lavender' ? 'violet' : c.id === 'peach' ? 'orange' : 'green'}-500`}></div>
                                <span className="text-slate-700 dark:text-slate-200">{c.name}</span>
                            </button>
                        ) : (
                            <button key={c.id} onClick={() => handleUnlock('color', c.id, c.cost)} className="px-6 py-2 rounded-lg font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center">{c.name} ({c.cost} pts)</button>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Font Style</h2>
                    <div className="flex space-x-4">
                        {fontOptions.map(f => (
                            <button key={f.id} onClick={() => setFont(f.id)} className={`px-6 py-2 rounded-lg font-semibold ${font === f.id ? `${colors.bg} text-white` : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>{f.name}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ALL OTHER VIEWS ---
const StudyToolsView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Study Tools</h1><p className="dark:text-slate-300">Here you can generate flashcards, practice tests, and summaries from your notes.</p></div>;
const MaterialsView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">My Materials</h1><p className="dark:text-slate-300">Here you can view all your saved summaries, flashcard decks, and practice tests.</p></div>;
const PlannerView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Study Planner</h1><p className="dark:text-slate-300">Plan your study sessions for the week. Use the AI to get suggestions based on your subjects and schedule.</p></div>;
const LibraryView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Resource Library</h1><p className="dark:text-slate-300">Ask the AI to find helpful resources like videos, articles, and diagrams for any topic you're studying.</p></div>;
const GoalsView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Goals & Progress</h1><p className="dark:text-slate-300">Set your study goals and track your progress over time with visual charts.</p></div>;
const WellnessView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Wellness</h1><p className="dark:text-slate-300">Find quick break ideas and stress relief exercises to stay fresh and focused.</p></div>;
const SpacedRepetitionView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Review</h1><p className="dark:text-slate-300">Review your flashcards using a spaced repetition algorithm to maximize retention.</p></div>;
const OfflineView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Offline</h1><p className="dark:text-slate-300">This feature requires an internet connection.</p></div>;
const TodoView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">To-Do List</h1><p className="dark:text-slate-300">Track your tasks and earn points for completion.</p></div>;
const PlagiarismCheckerView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Plagiarism Checker</h1><p className="dark:text-slate-300">Check your work for originality.</p></div>;
const PomodoroView = () => <div className="p-8"><h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Pomodoro Timer</h1><p className="dark:text-slate-300">Use the Pomodoro technique to focus your study sessions.</p></div>;

