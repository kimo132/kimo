import { Facebook, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { DiscordIcon } from '../components/icons';

export const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/1234567890", label: "WhatsApp", className: "social-whatsapp" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook", className: "social-facebook" },
  { icon: Github, href: "https://github.com", label: "GitHub", className: "social-github" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", className: "social-linkedin" },
  { icon: DiscordIcon, href: "https://discord.gg/873058874796671037", label: "Discord", className: "social-discord" },
  { icon: Mail, href: "mailto:contact@example.com", label: "Email", className: "social-email" },
];