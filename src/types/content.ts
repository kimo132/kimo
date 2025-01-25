import { ServerInfo } from './server';
import { BotInfo } from './bot';

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
  tooltips: {
    profile: string;
    tryCommand: string;
  };
  buttons: {
    addBot: string;
    joinServer: string;
  };
  sections: {
    commands: string;
    servers: string;
  };
}