import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultCategories from '@/constants/categories';
import colors from '@/constants/colors';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isDefault?: boolean;
}

interface CategoryState {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'isDefault'>) => void;
  updateCategory: (id: string, updates: Partial<Omit<Category, 'id' | 'isDefault'>>) => void;
  deleteCategory: (id: string) => void;
  resetToDefaults: () => void;
}

// Add isDefault flag to default categories
const defaultCategoriesWithFlag = defaultCategories.map(category => ({
  ...category,
  isDefault: true
}));

const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: defaultCategoriesWithFlag,
      
      addCategory: (category) => {
        const newCategory: Category = {
          ...category,
          id: `custom_${Date.now()}`,
          isDefault: false,
        };
        
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },
      
      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id && !category.isDefault
              ? { ...category, ...updates }
              : category
          ),
        }));
      },
      
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter(
            (category) => category.id !== id || category.isDefault
          ),
        }));
      },
      
      resetToDefaults: () => {
        set({ categories: defaultCategoriesWithFlag });
      },
    }),
    {
      name: 'category-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCategoryStore;