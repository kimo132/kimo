import { ServerStats, ServerType } from '../types';

export const serverData: Record<ServerType, ServerStats> = {
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