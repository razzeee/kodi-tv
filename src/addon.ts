export interface IAddon {
  id: string;
  addonid: string;
  downloads: number;
  slug: string;
  authors: { name: string; slug: string }[];
  categories: { name: string; slug: string }[];
  screenshots: { localpath: string }[];
  icon: string;
  name: string;
  lastupdate: string;
  summary?: string;
  version: string;
  forum: string;
  website: string;
  source: string;
  size: string;
  license: string;
  description?: string;
  platforms: { platform: string; path: string; statspath: string }[];
  news?: string;
  snippet?: string;
}
