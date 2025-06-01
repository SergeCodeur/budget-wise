import CategoryPicker from '@/components/CategoryPicker';
import DatePicker from '@/components/DatePicker';
import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useCategoryStore from '@/stores/category-store';
import useExpenseStore from '@/stores/expense-store';
import { ExpenseFormData } from '@/types/expense';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { expenses, updateExpense, deleteExpense } = useExpenseStore();
  const { categories } = useCategoryStore();
  const { t, formatCurrency, formatDate } = useLocalization();
  const insets = useSafeAreaInsets();
  
  const expense = expenses.find((e) => e.id === id);
  
  if (!expense) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>{t('expenseNotFound')}</Text>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>{t('goBack')}</Text>
        </Pressable>
      </View>
    );
  }
  
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: expense.amount.toString(),
    description: expense.description,
    category: expense.category,
    date: expense.date,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setFormData((prev) => ({ ...prev, category: categoryId }));
  };
  
  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ExpenseFormData, string>> = {};
    
    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = t('enterValidAmount');
    }
    
    if (!formData.description.trim()) {
      newErrors.description = t('enterDescription');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }
    
    const amount = parseFloat(formData.amount);
    
    updateExpense(id, {
      amount,
      description: formData.description.trim(),
      category: formData.category,
      date: formData.date,
    });
    
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      t('deleteExpense'),
      t('confirmDelete'),
      [
        { text: t('cancel'), style: "cancel" },
        { 
          text: t('delete'), 
          style: "destructive",
          onPress: () => {
            deleteExpense(id);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 20 + insets.bottom }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.dateText}>{formatDate(expense.date)}</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('amount')}</Text>
            {isEditing ? (
              <>
                <TextInput
                  style={[styles.input, errors.amount && styles.inputError]}
                  value={formData.amount}
                  onChangeText={(value) => handleChange('amount', value)}
                  keyboardType="decimal-pad"
                  placeholderTextColor={colors.textLight}
                />
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount}</Text>
                )}
              </>
            ) : (
              <Text style={styles.valueText}>
                {formatCurrency(expense.amount)}
              </Text>
            )}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('description')}</Text>
            {isEditing ? (
              <>
                <TextInput
                  style={[styles.input, errors.description && styles.inputError]}
                  value={formData.description}
                  onChangeText={(value) => handleChange('description', value)}
                  placeholderTextColor={colors.textLight}
                />
                {errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
              </>
            ) : (
              <Text style={styles.valueText}>{expense.description}</Text>
            )}
          </View>
          
          {isEditing ? (
            <CategoryPicker
              selectedCategory={formData.category}
              onSelectCategory={handleSelectCategory}
            />
          ) : (
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('category')}</Text>
              <Text style={styles.valueText}>
                {categories.find(c => c.id === expense.category)?.name || 'Other'}
              </Text>
            </View>
          )}
          
          {isEditing && (
            <DatePicker
              date={formData.date}
              onDateChange={handleDateChange}
              label={t('date')}
            />
          )}
        </View>
      </ScrollView>
      
      <View style={[
        styles.footer,
        { paddingBottom: Math.max(16, insets.bottom) }
      ]}>
        {isEditing ? (
          <>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </Pressable>
            
            <Pressable
              style={styles.saveButton}
              onPress={handleUpdate}
            >
              <Text style={styles.saveButtonText}>{t('saveChanges')}</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Trash2 size={20} color={colors.error} />
            </Pressable>
            
            <Pressable
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>{t('editExpense')}</Text>
            </Pressable>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
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
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  dateText: {
    fontSize: 16,
    color: colors.textLight,
  },
  formContainer: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  valueText: {
    fontSize: 18,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  saveButton: {
    flex: 2,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.background,
  },
  deleteButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginRight: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.background,
  },
});