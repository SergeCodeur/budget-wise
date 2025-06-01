import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useCategoryStore from '@/stores/category-store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ExpenseSummaryProps {
  totalAmount: number;
  expensesByCategory: Record<string, number>;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  totalAmount,
  expensesByCategory,
}) => {
  const { categories } = useCategoryStore();
  const { t, formatCurrency } = useLocalization();
  
  // Sort categories by amount (descending)
  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, amountA], [, amountB]) => amountB - amountA)
    .slice(0, 3); // Top 3 categories

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Other';
  };

  const getCategoryColor = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.color : colors.other;
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>{t('totalExpenses')}</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
      </View>

      {sortedCategories.length > 0 && (
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>{t('topCategories')}</Text>
          {sortedCategories.map(([categoryId, amount]) => (
            <View key={categoryId} style={styles.categoryRow}>
              <View style={styles.categoryNameContainer}>
                <View
                  style={[
                    styles.categoryDot,
                    { backgroundColor: getCategoryColor(categoryId) },
                  ]}
                />
                <Text style={styles.categoryName}>
                  {getCategoryName(categoryId)}
                </Text>
              </View>
              <Text style={styles.categoryAmount}>
                {formatCurrency(amount)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  categoriesContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryNameContainer: {
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
    fontSize: 14,
    color: colors.text,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
});

export default ExpenseSummary;