import { Command } from '../types';

export const botCommands: Command[] = [
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