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