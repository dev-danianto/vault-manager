export interface VaultItem {
  id: string;
  title: string;
  content: string;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface VaultState {
  items: VaultItem[];
  profile: {
    name: string;
    avatar: string;
  };
}

export interface Profile {
  name: string;
  avatar: string;
}