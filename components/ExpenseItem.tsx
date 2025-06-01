import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useCategoryStore from '@/stores/category-store';
import { Expense } from '@/types/expense';
import { Car, Film, Heart, Home, MoreHorizontal, ShoppingBag, Utensils, Zap } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ExpenseItemProps {
  expense: Expense;
  onPress: (expense: Expense) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onPress }) => {
  const { formatCurrency, formatDate } = useLocalization();
  const { categories } = useCategoryStore();

  const getCategoryIcon = (categoryId: string) => {
    // Find the category
    const category = categories.find(cat => cat.id === categoryId);
    const categoryColor = category ? category.color : colors.other;
    
    // Return icon based on category id or icon name
    switch (categoryId) {
      case 'food':
        return <Utensils size={20} color={categoryColor} />;
      case 'transport':
        return <Car size={20} color={categoryColor} />;
      case 'shopping':
        return <ShoppingBag size={20} color={categoryColor} />;
      case 'entertainment':
        return <Film size={20} color={categoryColor} />;
      case 'health':
        return <Heart size={20} color={categoryColor} />;
      case 'housing':
        return <Home size={20} color={categoryColor} />;
      case 'utilities':
        return <Zap size={20} color={categoryColor} />;
      case 'other':
      default:
        return <MoreHorizontal size={20} color={categoryColor} />;
    }
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Other';
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(expense)}
    >
      <View style={styles.iconContainer}>
        {getCategoryIcon(expense.category)}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.description} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={styles.categoryAndDate}>
          {getCategoryName(expense.category)} • {formatDate(expense.date)}
        </Text>
      </View>
      <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: colors.card,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  categoryAndDate: {
    fontSize: 14,
    color: colors.textLight,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});

export default ExpenseItem;