import DateRangePicker from '@/components/DateRangePicker';
import categories from '@/constants/categories';
import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useExpenseStore from '@/stores/expense-store';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ReportsScreen() {
  const { 
    dateRange, 
    setDateRange, 
    getExpensesByCategory, 
    getTotalAmount 
  } = useExpenseStore();
  const { formatCurrency, t } = useLocalization();
  const insets = useSafeAreaInsets();

  const totalAmount = getTotalAmount();
  const expensesByCategory = getExpensesByCategory();
  
  // Convert to array and sort by amount
  const categoriesData = Object.entries(expensesByCategory)
    .map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        id: categoryId,
        name: category ? category.name : 'Other',
        color: category ? category.color : colors.other,
        amount,
        percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0
      };
    })
    .sort((a, b) => b.amount - a.amount);

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
          <DateRangePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onDateRangeChange={setDateRange}
          />
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{t('totalExpenses')}</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>{t('spendingByCategory')}</Text>
          
          {categoriesData.length === 0 ? (
            <Text style={styles.emptyText}>{t('noData')}</Text>
          ) : (
            <>
              <View style={styles.barChartContainer}>
                {categoriesData.map(category => (
                  <View key={category.id} style={styles.barContainer}>
                    <View style={styles.barLabelContainer}>
                      <View style={[styles.colorDot, { backgroundColor: category.color }]} />
                      <Text style={styles.barLabel} numberOfLines={1}>
                        {category.name}
                      </Text>
                    </View>
                    <View style={styles.barWrapper}>
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            width: `${Math.max(category.percentage, 5)}%`,
                            backgroundColor: category.color 
                          }
                        ]} 
                      />
                      <Text style={styles.barPercentage}>
                        {category.percentage.toFixed(1)}%
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.detailsContainer}>
                {categoriesData.map(category => (
                  <View key={category.id} style={styles.detailRow}>
                    <View style={styles.detailLabelContainer}>
                      <View style={[styles.colorDot, { backgroundColor: category.color }]} />
                      <Text style={styles.detailLabel}>{category.name}</Text>
                    </View>
                    <Text style={styles.detailAmount}>{formatCurrency(category.amount)}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  totalContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.background,
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
  chartContainer: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginVertical: 20,
  },
  barChartContainer: {
    marginBottom: 24,
  },
  barContainer: {
    marginBottom: 12,
  },
  barLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  barLabel: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
    minWidth: 20,
  },
  barPercentage: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textLight,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text,
  },
  detailAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
});