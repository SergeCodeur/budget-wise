import colors from '@/constants/colors';
import { Expense } from '@/types/expense';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  emptyMessage?: string;
  isNested?: boolean; // Add this prop to determine if the list is nested in a ScrollView
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  emptyMessage = "No expenses found",
  isNested = false
}) => {
  const router = useRouter();

  const handleExpensePress = (expense: Expense) => {
    router.push({
      pathname: '/expense/[id]',
      params: { id: expense.id }
    });
  };

  if (expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  // If the list is nested in a ScrollView, render items directly
  if (isNested) {
    return (
      <View style={styles.list}>
        {expenses.map(item => (
          <ExpenseItem 
            key={item.id} 
            expense={item} 
            onPress={handleExpensePress} 
          />
        ))}
      </View>
    );
  }

  // Otherwise, use FlatList for standalone usage
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExpenseItem expense={item} onPress={handleExpensePress} />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default ExpenseList;