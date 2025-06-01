import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  region?: string;
};

export type Language = 'en' | 'fr';

interface SettingsState {
  currency: Currency;
  language: Language;
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
}

// Default currency is USD
const defaultCurrency: Currency = {
  code: 'USD',
  symbol: '$',
  name: 'US Dollar',
};

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: defaultCurrency,
      language: 'en',
      
      setCurrency: (currency) => {
        set({ currency });
      },
      
      setLanguage: (language) => {
        set({ language });
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore;