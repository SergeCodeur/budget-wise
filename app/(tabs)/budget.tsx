import categories from '@/constants/categories';
import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useExpenseStore from '@/stores/expense-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Edit2, Save } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Budget store
interface BudgetState {
  budgets: Record<string, number>;
  setBudget: (categoryId: string, amount: number) => void;
}

const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      budgets: {},
      setBudget: (categoryId, amount) => {
        set((state) => ({
          budgets: {
            ...state.budgets,
            [categoryId]: amount,
          },
        }));
      },
    }),
    {
      name: 'budget-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default function BudgetScreen() {
  const { getExpensesByCategory } = useExpenseStore();
  const { budgets, setBudget } = useBudgetStore();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const { formatCurrency, t } = useLocalization();
  const insets = useSafeAreaInsets();

  const expensesByCategory = getExpensesByCategory();

  const handleEditBudget = (categoryId: string) => {
    setEditingCategory(categoryId);
    setEditValue(budgets[categoryId]?.toString() || '');
  };

  const handleSaveBudget = (categoryId: string) => {
    const amount = parseFloat(editValue);
    if (!isNaN(amount) && amount >= 0) {
      setBudget(categoryId, amount);
    }
    setEditingCategory(null);
  };

  const getBudgetProgress = (categoryId: string): number => {
    const budget = budgets[categoryId] || 0;
    const spent = expensesByCategory[categoryId] || 0;
    
    if (budget === 0) return 0;
    return Math.min((spent / budget) * 100, 100);
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 100) return colors.error;
    if (progress >= 80) return colors.warning;
    return colors.success;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + insets.bottom }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t('monthlyBudget')}</Text>
          <Text style={styles.subtitle}>
            {t('setBudgetsDescription')}
          </Text>
        </View>

        <View style={styles.budgetContainer}>
          {categories.map((category) => {
            const budget = budgets[category.id] || 0;
            const spent = expensesByCategory[category.id] || 0;
            const progress = getBudgetProgress(category.id);
            const progressColor = getProgressColor(progress);
            
            return (
              <View key={category.id} style={styles.budgetItem}>
                <View style={styles.budgetHeader}>
                  <View style={styles.categoryInfo}>
                    <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  
                  {editingCategory === category.id ? (
                    <Pressable
                      onPress={() => handleSaveBudget(category.id)}
                      style={styles.editButton}
                    >
                      <Save size={16} color={colors.primary} />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => handleEditBudget(category.id)}
                      style={styles.editButton}
                    >
                      <Edit2 size={16} color={colors.textLight} />
                    </Pressable>
                  )}
                </View>
                
                {editingCategory === category.id ? (
                  <View style={styles.editContainer}>
                    <TextInput
                      style={styles.editInput}
                      value={editValue}
                      onChangeText={setEditValue}
                      keyboardType="numeric"
                      placeholder={t('enterBudgetAmount')}
                      autoFocus
                    />
                  </View>
                ) : (
                  <>
                    <View style={styles.budgetInfo}>
                      <Text style={styles.budgetText}>
                        {formatCurrency(spent)} of {formatCurrency(budget)}
                      </Text>
                      <Text style={[
                        styles.remainingText,
                        { color: progress >= 100 ? colors.error : colors.textLight }
                      ]}>
                        {progress >= 100 
                          ? `${formatCurrency(spent - budget)} ${t('overBudget')}` 
                          : `${formatCurrency(budget - spent)} ${t('remaining')}`}
                      </Text>
                    </View>
                    
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBackground}>
                        <View 
                          style={[
                            styles.progressFill,
                            { 
                              width: `${progress}%`,
                              backgroundColor: progressColor
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  </>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  budgetContainer: {
    padding: 16,
  },
  budgetItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  editButton: {
    padding: 4,
  },
  budgetInfo: {
    marginBottom: 8,
  },
  budgetText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  remainingText: {
    fontSize: 12,
    color: colors.textLight,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  editContainer: {
    marginVertical: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});