import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '@/types/expense';
import { getMonthStartEnd } from '@/utils/date-utils';

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  dateRange: {
    start: string;
    end: string;
  };
  selectedCategory: string | null;
  
  // Actions
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  setDateRange: (start: string, end: string) => void;
  setSelectedCategory: (category: string | null) => void;
  
  // Computed
  getFilteredExpenses: () => Expense[];
  getTotalAmount: () => number;
  getExpensesByCategory: () => Record<string, number>;
}

const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => {
      const initialDateRange = getMonthStartEnd();
      
      return {
        expenses: [],
        isLoading: false,
        dateRange: initialDateRange,
        selectedCategory: null,
        
        addExpense: (expense) => {
          set((state) => ({
            expenses: [expense, ...state.expenses],
          }));
        },
        
        updateExpense: (id, updatedExpense) => {
          set((state) => ({
            expenses: state.expenses.map((expense) =>
              expense.id === id
                ? { ...expense, ...updatedExpense, updatedAt: new Date().toISOString() }
                : expense
            ),
          }));
        },
        
        deleteExpense: (id) => {
          set((state) => ({
            expenses: state.expenses.filter((expense) => expense.id !== id),
          }));
        },
        
        setDateRange: (start, end) => {
          set({ dateRange: { start, end } });
        },
        
        setSelectedCategory: (category) => {
          set({ selectedCategory: category });
        },
        
        getFilteredExpenses: () => {
          const { expenses, dateRange, selectedCategory } = get();
          
          return expenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            
            const isInDateRange =
              expenseDate >= startDate && expenseDate <= endDate;
            
            const isInCategory =
              selectedCategory === null || expense.category === selectedCategory;
            
            return isInDateRange && isInCategory;
          }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        },
        
        getTotalAmount: () => {
          const filteredExpenses = get().getFilteredExpenses();
          return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        },
        
        getExpensesByCategory: () => {
          const filteredExpenses = get().getFilteredExpenses();
          return filteredExpenses.reduce((acc, expense) => {
            const { category, amount } = expense;
            acc[category] = (acc[category] || 0) + amount;
            return acc;
          }, {} as Record<string, number>);
        },
      };
    },
    {
      name: 'expense-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useExpenseStore;