import CategoryPicker from '@/components/CategoryPicker';
import DatePicker from '@/components/DatePicker';
import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useExpenseStore from '@/stores/expense-store';
import { ExpenseFormData } from '@/types/expense';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewExpenseScreen() {
  const router = useRouter();
  const { addExpense } = useExpenseStore();
  const { t } = useLocalization();
  const insets = useSafeAreaInsets();
  
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: '',
    description: '',
    category: 'food', // Default category
    date: new Date().toISOString(),
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});

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

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    const amount = parseFloat(formData.amount);
    
    const newExpense = {
      id: Date.now().toString(),
      amount,
      description: formData.description.trim(),
      category: formData.category,
      date: formData.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    addExpense(newExpense);
    router.back();
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
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('amount')}</Text>
            <TextInput
              style={[styles.input, errors.amount && styles.inputError]}
              value={formData.amount}
              onChangeText={(value) => handleChange('amount', value)}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor={colors.textLight}
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount}</Text>
            )}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('description')}</Text>
            <TextInput
              style={[styles.input, errors.description && styles.inputError]}
              value={formData.description}
              onChangeText={(value) => handleChange('description', value)}
              placeholder={t('whatDidYouSpendOn')}
              placeholderTextColor={colors.textLight}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
          </View>
          
          <CategoryPicker
            selectedCategory={formData.category}
            onSelectCategory={handleSelectCategory}
          />
          
          <DatePicker
            date={formData.date}
            onDateChange={handleDateChange}
            label={t('date')}
          />
        </View>
      </ScrollView>
      
      <View style={[
        styles.footer,
        { paddingBottom: Math.max(16, insets.bottom) }
      ]}>
        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
        </Pressable>
        
        <Pressable
          style={styles.saveButton}
          onPress={handleSubmit}
        >
          <Text style={styles.saveButtonText}>{t('saveExpense')}</Text>
        </Pressable>
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
  formContainer: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
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
});