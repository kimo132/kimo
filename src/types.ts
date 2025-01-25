export type Language = 'ar' | 'en' | 'ru';

export type ServerType = 'gaming' | 'shop' | 'scammers';

export interface ServerStats {
  members: number;
  channels: number;
  messages: number;
  roles: number;
  emojis: number;
  boosts: number;
  created: string;
}

export interface ServerInfo {
  title: string;
  description: string;
  joinButton: string;
  stats: {
    members: string;
    channels: string;
    messages: string;
    roles: string;
    emojis: string;
    boosts: string;
    created: string;
  };
}

export interface BotInfo {
  title: string;
  description: string;
  addButton: string;
  stats: {
    servers: string;
    users: string;
    commands: string;
  };
  commandCategories: {
    general: string;
    moderation: string;
    music: string;
    fun: string;
    leveling: string;
  };
}

export interface Content {
  name: string;
  role: string;
  bio: string;
  contact: string;
  languageSelector: string;
  projects: string;
  copyright: string;
  serverInfo: ServerInfo;
  botInfo: BotInfo;
  servers: {
    gaming: string;
    shop: string;
    scammers: string;
  };
}