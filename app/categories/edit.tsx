import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import useCategoryStore from '@/stores/category-store';
import useLocalization from '@/hooks/useLocalization';

// Predefined colors for category selection
const colorOptions = [
  '#10b981', // Green
  '#3b82f6', // Blue
  '#f97316', // Orange
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#64748b', // Slate
  '#ef4444', // Red
  '#f59e0b', // Amber
];

// Predefined icons for category selection
const iconOptions = [
  'shopping-bag',
  'car',
  'home',
  'heart',
  'film',
  'utensils',
  'zap',
  'dollar-sign',
  'briefcase',
  'gift',
  'book',
  'coffee',
  'phone',
  'music',
  'globe',
];

export default function EditCategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { categories, updateCategory } = useCategoryStore();
  const { t } = useLocalization();
  const insets = useSafeAreaInsets();
  
  const category = categories.find(cat => cat.id === id);
  
  if (!category) {
    router.back();
    return null;
  }
  
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const [icon, setIcon] = useState(category.icon);
  const [nameError, setNameError] = useState('');
  
  const handleSave = () => {
    if (!name.trim()) {
      setNameError(t('enterCategoryName'));
      return;
    }
    
    updateCategory(id, {
      name: name.trim(),
      color,
      icon,
    });
    
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: t('editCategory'),
        headerTintColor: category.isDefault ? colors.textLight : colors.primary,
      }} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 20 + insets.bottom }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('categoryName')}</Text>
          <TextInput
            style={[
              styles.input, 
              nameError ? styles.inputError : null,
              category.isDefault && styles.disabledInput
            ]}
            value={name}
            onChangeText={(text) => {
              if (!category.isDefault) {
                setName(text);
                if (text.trim()) setNameError('');
              }
            }}
            placeholder={t('categoryName')}
            placeholderTextColor={colors.textLight}
            editable={!category.isDefault}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          {category.isDefault && (
            <Text style={styles.helperText}>{t('cannotDeleteDefault')}</Text>
          )}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('categoryColor')}</Text>
          <View style={styles.colorOptions}>
            {colorOptions.map((colorOption) => (
              <Pressable
                key={colorOption}
                style={[
                  styles.colorOption,
                  { backgroundColor: colorOption },
                  color === colorOption && styles.selectedColorOption,
                  category.isDefault && styles.disabledColorOption,
                ]}
                onPress={() => {
                  if (!category.isDefault) {
                    setColor(colorOption);
                  }
                }}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('categoryIcon')}</Text>
          <View style={styles.iconOptions}>
            {iconOptions.map((iconOption) => (
              <Pressable
                key={iconOption}
                style={[
                  styles.iconOption,
                  icon === iconOption && styles.selectedIconOption,
                  category.isDefault && styles.disabledIconOption,
                ]}
                onPress={() => {
                  if (!category.isDefault) {
                    setIcon(iconOption);
                  }
                }}
              >
                <Text style={[
                  styles.iconText,
                  icon === iconOption && styles.selectedIconText,
                  category.isDefault && styles.disabledIconText,
                ]}>
                  {iconOption}
                </Text>
              </Pressable>
            ))}
          </View>
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
          style={[
            styles.saveButton,
            category.isDefault && styles.disabledSaveButton,
          ]}
          onPress={handleSave}
          disabled={category.isDefault}
        >
          <Text style={styles.saveButtonText}>{t('save')}</Text>
        </Pressable>
      </View>
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
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 12,
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
  disabledInput: {
    backgroundColor: colors.card,
    color: colors.textLight,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: colors.textLight,
    fontSize: 14,
    marginTop: 4,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: colors.text,
  },
  disabledColorOption: {
    opacity: 0.5,
  },
  iconOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  iconOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
    backgroundColor: colors.card,
  },
  selectedIconOption: {
    backgroundColor: colors.primary,
  },
  disabledIconOption: {
    opacity: 0.5,
  },
  iconText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedIconText: {
    color: colors.background,
  },
  disabledIconText: {
    color: colors.textLight,
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
  disabledSaveButton: {
    backgroundColor: colors.textLight,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.background,
  },
});