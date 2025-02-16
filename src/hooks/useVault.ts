import { useState, useEffect } from 'react';
import { VaultItem, VaultState, Profile } from '../types';

const STORAGE_KEY = 'vault_items';

const defaultState: VaultState = {
  items: [],
  profile: {
    name: '',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=80',
  }
};

export const useVault = () => {
  const [state, setState] = useState<VaultState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultState;
      
      const parsedState = JSON.parse(stored);
      return {
        items: Array.isArray(parsedState.items) ? parsedState.items : [],
        profile: {
          name: parsedState.profile?.name || '',
          avatar: parsedState.profile?.avatar || defaultState.profile.avatar,
        }
      };
    } catch (error) {
      console.error('Error loading vault state:', error);
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving vault state:', error);
    }
  }, [state]);

  const addItem = (title: string, content: string, image?: string) => {
    const newItem: VaultItem = {
      id: Math.random().toString(36).substring(2),
      title,
      content,
      image,
      isLocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      items: [newItem, ...prev.items],
    }));
  };

  const toggleLock = (id: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, isLocked: !item.isLocked } : item
      ),
    }));
  };

  const deleteItem = (id: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const updateItem = (id: string, updates: Partial<VaultItem>) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      ),
    }));
  };

  const updateProfile = (profile: Profile) => {
    setState(prev => ({
      ...prev,
      profile,
    }));
  };

  return {
    items: state.items,
    profile: state.profile,
    addItem,
    toggleLock,
    deleteItem,
    updateItem,
    updateProfile,
  };
};