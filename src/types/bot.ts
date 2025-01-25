export interface Command {
  name: string;
  description: string;
  usage: string;
  category: string;
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