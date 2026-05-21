import type { AvatarConfig } from "@/lib/avatar";

export type FamilyMember = {
  id: string;
  name: string;
  role: string;
  emoji: string;
  avatar_config: AvatarConfig;
};

export type ShoppingItem = {
  id: string;
  text: string;
  done: boolean;
};

export type PointsEntry = {
  id: string;
  memberId: string;
  points: number;
  reason: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  note?: string;
};

export type FamilyNote = {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type PhotoItem = {
  id: string;
  caption: string;
  emoji: string;
  createdAt: string;
};
