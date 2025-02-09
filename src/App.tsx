import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, Linkedin, Mail, MessageCircle, Globe, Moon, Sun, Bot, Users, Hash, MessageSquare, Info, Command, ChevronDown, ChevronUp, Gamepad } from 'lucide-react';
import { Language } from './types';
import { translations } from './translations';

const profileImages = [
  "https://cdn.discordapp.com/avatars/333945284692279297/31732a171ed05c9538be893302b63951.webp?size=4096",
  "https://cdn.discordapp.com/avatars/333945284692279297/31732a171ed05c9538be893302b63951.webp?size=4096",
  "https://cdn.discordapp.com/avatars/333945284692279297/31732a171ed05c9538be893302b63951.webp?size=4096"
];

const languageFlags = {
  en: "https://flagcdn.com/w40/gb.png",
  ar: "https://flagcdn.com/w40/eg.png",
  ru: "https://flagcdn.com/w40/ru.png"
};

const serverInvites: Record<ServerType, string> = {
  gaming: "gaming-invite",
  shop: "shop-invite",
  scammers: "scammers-invite"
};

type ServerType = 'gaming' | 'shop' | 'scammers';

interface ServerStats {
  members: number;
  channels: number;
  messages: number;
  roles: number;
  emojis: number;
  boosts: number;
  created: string;
}

function StarField({ isDark }: { isDark: boolean }) {
  useEffect(() => {
    const container = document.querySelector('.star-field');
    if (!container) return;

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      container.appendChild(star);

      star.addEventListener('animationend', () => {
        star.remove();
      });
    };

    const interval = setInterval(createStar, 100);
    return () => clearInterval(interval);
  }, []);

  return <div className={`star-field fixed inset-0 pointer-events-none ${isDark ? 'text-purple-900/30' : 'text-black/20'}`} />;
}

function DiscordIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor"/>
    </svg>
  );
}

interface Command {
  name: string;
  description: string;
  usage: string;
  category: string;
}

const botCommands: Command[] = [
  {
    name: "!help",
    description: "Shows all available commands and their descriptions",
    usage: "!help [command]",
    category: "General"
  },
  {
    name: "!play",
    description: "Play music from YouTube or Spotify",
    usage: "!play <song name/URL>",
    category: "Music"
  },
  {
    name: "!skip",
    description: "Skip the current song",
    usage: "!skip",
    category: "Music"
  },
  {
    name: "!queue",
    description: "Show the current music queue",
    usage: "!queue",
    category: "Music"
  },
  {
    name: "!ban",
    description: "Ban a user from the server",
    usage: "!ban <@user> [reason]",
    category: "Moderation"
  },
  {
    name: "!kick",
    description: "Kick a user from the server",
    usage: "!kick <@user> [reason]",
    category: "Moderation"
  },
  {
    name: "!mute",
    description: "Mute a user in the server",
    usage: "!mute <@user> [duration] [reason]",
    category: "Moderation"
  },
  {
    name: "!warn",
    description: "Warn a user",
    usage: "!warn <@user> [reason]",
    category: "Moderation"
  },
  {
    name: "!rank",
    description: "Show your current level and XP",
    usage: "!rank [@user]",
    category: "Leveling"
  },
  {
    name: "!leaderboard",
    description: "Show server XP leaderboard",
    usage: "!leaderboard",
    category: "Leveling"
  },
  {
    name: "!daily",
    description: "Claim daily XP bonus",
    usage: "!daily",
    category: "Leveling"
  },
  {
    name: "!joke",
    description: "Get a random joke",
    usage: "!joke",
    category: "Fun"
  },
  {
    name: "!meme",
    description: "Get a random meme",
    usage: "!meme",
    category: "Fun"
  }
];

const serverData: Record<ServerType, ServerStats> = {
  gaming: {
    members: 15783,
    channels: 42,
    messages: 1547832,
    roles: 15,
    emojis: 89,
    boosts: 12,
    created: "2021-03-15"
  },
  shop: {
    members: 8942,
    channels: 28,
    messages: 892451,
    roles: 10,
    emojis: 45,
    boosts: 8,
    created: "2022-01-10"
  },
  scammers: {
    members: 12456,
    channels: 35,
    messages: 1234567,
    roles: 12,
    emojis: 67,
    boosts: 15,
    created: "2021-08-20"
  }
};

const serverDescriptions: Record<ServerType, Record<Language, { title: string; description: string }>> = {
  gaming: {
    en: {
      title: "Gaming Community",
      description: "A vibrant community for gamers to connect, compete, and have fun together."
    },
    ar: {
      title: "مجتمع الألعاب",
      description: "مجتمع نابض بالحياة للاعبين للتواصل والمنافسة والاستمتاع معًا."
    },
    ru: {
      title: "Игровое Сообщество",
      description: "Живое сообщество для геймеров, где можно общаться, соревноваться и веселиться вместе."
    }
  },
  shop: {
    en: {
      title: "Trading Hub",
      description: "Your trusted marketplace for secure trading and item exchange."
    },
    ar: {
      title: "منصة التداول",
      description: "سوقك الموثوق للتداول الآمن وتبادل العناصر."
    },
    ru: {
      title: "Торговый центр",
      description: "Ваша надежная площадка для безопасной торговли и обмена предметами."
    }
  },
  scammers: {
    en: {
      title: "Scammer Reports",
      description: "Protecting our community by tracking and reporting scammers."
    },
    ar: {
      title: "تقارير النصابين",
      description: "حماية مجتمعنا من خلال تتبع والإبلاغ عن المحتالين."
    },
    ru: {
      title: "Отчеты о мошенниках",
      description: "Защита нашего сообщества путем отслеживания и сообщения о мошенниках."
    }
  }
};

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState(true);
  const [displayedBio, setDisplayedBio] = useState('');
  const [activeServer, setActiveServer] = useState<ServerType>('shop');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('General');
  const [isServerInfoVisible, setIsServerInfoVisible] = useState(false);
  const [botStats] = useState({
    servers: 127,
    users: 54892,
    commands: botCommands.length,
    uptime: "99.9%",
    commandsUsed: 892451
  });
  const content = translations[language];
  const isRTL = language === 'ar';

  useEffect(() => {
    setActiveServer('shop');
    setIsServerInfoVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const bioText = content.bio;
    setDisplayedBio('');
    
    const interval = setInterval(() => {
      if (index < bioText.length) {
        setDisplayedBio(prev => prev + bioText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [content.bio]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const effect = document.createElement('div');
      effect.className = 'click-effect';
      effect.style.left = `${e.clientX - 250}px`;
      effect.style.top = `${e.clientY - 250}px`;
      document.body.appendChild(effect);

      effect.addEventListener('animationend', () => {
        effect.remove();
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const tooltipText = {
    en: "Peace be upon Prophet Muhammad ﷺ",
    ar: "اللهم صلِ على سيدنا محمد ﷺ",
    ru: "Мир и благословение Пророку Мухаммаду ﷺ"
  };

  const socialLinks = [
    { icon: <MessageCircle />, href: "https://wa.me/1234567890", label: "WhatsApp", className: "social-whatsapp" },
    { icon: <Facebook />, href: "https://facebook.com", label: "Facebook", className: "social-facebook" },
    { icon: <Github />, href: "https://github.com", label: "GitHub", className: "social-github" },
    { icon: <Linkedin />, href: "https://linkedin.com", label: "LinkedIn", className: "social-linkedin" },
    { icon: <DiscordIcon />, href: "https://discord.gg/873058874796671037", label: "Discord", className: "social-discord" },
    { icon: <Mail />, href: "mailto:contact@example.com", label: "Email", className: "social-email" },
  ];

  const handleServerClick = (server: ServerType) => {
    setActiveServer(server);
    setIsServerInfoVisible(true);
  };

  const commandsTitle = {
    en: "Bot Commands",
    ar: "أوامر البوت",
    ru: "Команды бота"
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'light-theme text-gray-900'
    } ${isRTL ? 'rtl' : 'ltr'}`}>
      <StarField isDark={isDark} />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''} fade-in-up`}>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
            }`}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          
          <div className="flex gap-2">
            {Object.entries(languageFlags).map(([lang, flag]) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as Language)}
                className={`language-button ${language === lang ? 'active' : ''}`}
              >
                <img src={flag} alt={lang} />
                <span>{lang.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-12 fade-in-up delay-100">
          <div className="profile-container">
            <div className="profile-tooltip">
              {tooltipText[language]}
            </div>
            <img
              src={profileImages[currentImageIndex]}
              alt="Profile"
              className={`profile-image image-transition ${currentImageIndex === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % profileImages.length)}
            />
          </div>
          <h1 className="name-animation text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text font-ruqaa">
            {content.name}
          </h1>
          <h2 className="text-xl mb-6 font-medium opacity-90">
            {content.role}
          </h2>
          <div className="solo-leveling-text max-w-2xl mx-auto p-6 rounded-lg backdrop-blur-md bg-black/80">
            <span className="typing-text">{displayedBio}</span>
            <span className="typing-cursor">|</span>
          </div>
        </div>

        <h3 className="section-title fade-in-up">
          {content.projects}
        </h3>
        <div className="flex justify-center gap-4 mb-8">
          {(['gaming', 'shop', 'scammers'] as ServerType[]).map((server) => (
            <button
              key={server}
              onClick={() => handleServerClick(server)}
              className={`server-button ${activeServer === server ? 'active' : ''}`}
            >
              {content.servers[server]}
            </button>
          ))}
        </div>

        <div className={`server-info ${isServerInfoVisible ? 'visible' : ''}`}>
          <div className={`mb-8 p-6 rounded-lg backdrop-blur-md transition-all duration-300 ${
            isDark ? 'bg-white/5' : 'bg-white/20'
          }`}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-1/3 text-center md:text-left">
                <DiscordIcon className="w-24 h-24 mx-auto md:mx-0 mb-4 text-[#5865F2]" />
                <h4 className="text-2xl font-bold mb-2">{serverDescriptions[activeServer][language].title}</h4>
                <p className="mb-4 opacity-80">{serverDescriptions[activeServer][language].description}</p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="stat-card">
                    <Users className="w-8 h-8 mb-2 text-purple-400" />
                    <div className="text-2xl font-bold mb-1">{serverData[activeServer].members.toLocaleString()}</div>
                    <div className="text-sm opacity-70">{content.serverInfo.stats.members}</div>
                  </div>
                  <div className="stat-card">
                    <Hash className="w-8 h-8 mb-2 text-blue-400" />
                    <div className="text-2xl font-bold mb-1">{serverData[activeServer].channels}</div>
                    <div className="text-sm opacity-70">{content.serverInfo.stats.channels}</div>
                  </div>
                  <div className="stat-card">
                    <MessageSquare className="w-8 h-8 mb-2 text-green-400" />
                    <div className="text-2xl font-bold mb-1">{serverData[activeServer].messages.toLocaleString()}</div>
                    <div className="text-sm opacity-70">{content.serverInfo.stats.messages}</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-sm font-semibold mb-1">{content.serverInfo.stats.roles}</div>
                    <div className="text-2xl">{serverData[activeServer].roles}</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-sm font-semibold mb-1">{content.serverInfo.stats.emojis}</div>
                    <div className="text-2xl">{serverData[activeServer].emojis}</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-sm font-semibold mb-1">{content.serverInfo.stats.created}</div>
                    <div className="text-lg">{new Date(serverData[activeServer].created).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
<a
  href={`https://discord.gg/${serverInvites[activeServer]}`}
  target="_blank"
  rel="noopener noreferrer"
  className="join-server-button"
>
  {content.serverInfo.joinButton}
  <DiscordIcon className="w-5 h-5" />
</a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/sudoku"
            className="play-game-button inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {content.playGame}
            <Gamepad className="w-5 h-5" />
          </Link>
        </div>

        <h3 className="section-title fade-in-up mt-12">
          {content.botInfo.title}
        </h3>
        <div className={`p-6 rounded-lg backdrop-blur-md transition-all duration-300 ${
          isDark ? 'bg-white/5' : 'bg-white/20'
        }`}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <Bot className="w-16 h-16 mx-auto md:mx-0 mb-4 text-indigo-400" />
              <h4 className="text-xl font-bold mb-2">{content.botInfo.title}</h4>
              <p className="mb-4 opacity-80">{content.botInfo.description}</p>
              <a
                href="https://discord.com/api/oauth2/authorize?client_id=1258585006868004886&permissions=8&scope=bot"
                target="_blank"
                rel="noopener noreferrer"
                className="add-bot-button"
              >
                {content.botInfo.addButton}
                <Bot className="w-5 h-5" />
              </a>
            </div>
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="stat-card">
                  <Users className="w-6 h-6 mb-2 text-indigo-400" />
                  <div className="text-xl font-bold mb-1">{botStats.servers.toLocaleString()}</div>
                  <div className="text-sm opacity-70">{content.botInfo.stats.servers}</div>
                </div>
                <div className="stat-card">
                  <Users className="w-6 h-6 mb-2 text-pink-400" />
                  <div className="text-xl font-bold mb-1">{botStats.users.toLocaleString()}</div>
                  <div className="text-sm opacity-70">{content.botInfo.stats.users}</div>
                </div>
                <div className="stat-card">
                  <Command className="w-6 h-6 mb-2 text-blue-400" />
                  <div className="text-xl font-bold mb-1">{botStats.commands}</div>
                  <div className="text-sm opacity-70">{content.botInfo.stats.commands}</div>
                </div>
              </div>

              <h3 className="commands-title">
                {commandsTitle[language]}
              </h3>

              <div className="flex flex-wrap gap-4 mb-6">
                {Object.keys(content.botInfo.commandCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`bot-category-button ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {content.botInfo.commandCategories[category as keyof typeof content.botInfo.commandCategories]}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {botCommands
                  .filter(cmd => cmd.category.toLowerCase() === selectedCategory.toLowerCase())
                  .map((cmd) => (
                    <div key={cmd.name} className="p-3 rounded-lg bg-black/20">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h6 className="font-mono text-lg font-bold text-indigo-400">{cmd.name}</h6>
                          <p className="text-sm opacity-80">{cmd.description}</p>
                        </div>
                        <a
                          href="https://discord.com/api/oauth2/authorize?client_id=1258585006868004886&permissions=8&scope=bot"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="try-command-button"
                        >
                          {language === 'en' ? 'Try Command' : language === 'ar' ? 'جرب الأمر' : 'Попробовать команду'}
                        </a>
                      </div>
                      <div className="font-mono text-sm opacity-70">
                        Usage: {cmd.usage}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-16 fade-in-up delay-300">
          <h3 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            {content.contact}
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-4 rounded-lg backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 ${link.className} ${
                  isDark 
                    ? 'bg-white/10' 
                    : 'bg-black/10'
                }`}
              >
                <div className="transition-transform duration-300">
                  {link.icon}
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm whitespace-nowrap">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <footer className="text-center py-4 border-t border-gray-800/20 fade-in-up delay-400">
          <p className="text-sm opacity-60">{content.copyright}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
