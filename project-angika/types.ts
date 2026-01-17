/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any; 
  image?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  MISSION = 'mission',
  PILLARS = 'pillars',
  IMPACT = 'impact',
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  day: string;
  genre: string;
}
