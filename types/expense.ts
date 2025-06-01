export interface Expense {
    id: string;
    amount: number;
    description: string;
    category: string;
    date: string; // ISO string
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
  }
  
  export interface ExpenseFormData {
    amount: string;
    description: string;
    category: string;
    date: string;
  }