import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExpenseSummary from '@/components/ExpenseSummary';
import ExpenseList from '@/components/ExpenseList';
import DateRangePicker from '@/components/DateRangePicker';
import FloatingActionButton from '@/components/FloatingActionButton';
import useExpenseStore from '@/stores/expense-store';
import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';

export default function DashboardScreen() {
  const { 
    expenses, 
    dateRange, 
    setDateRange, 
    getFilteredExpenses, 
    getTotalAmount, 
    getExpensesByCategory 
  } = useExpenseStore();
  
  const { t } = useLocalization();
  const insets = useSafeAreaInsets();

  const filteredExpenses = getFilteredExpenses();
  const totalAmount = getTotalAmount();
  const expensesByCategory = getExpensesByCategory();

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 + insets.bottom }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <DateRangePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onDateRangeChange={setDateRange}
          />
        </View>

        <ExpenseSummary
          totalAmount={totalAmount}
          expensesByCategory={expensesByCategory}
        />

        {/* Pass isNested={true} to indicate this list is inside a ScrollView */}
        <ExpenseList
          expenses={filteredExpenses}
          emptyMessage={t('addFirstExpense')}
          isNested={true}
        />
      </ScrollView>
      
      <FloatingActionButton />
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
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});