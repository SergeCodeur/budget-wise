import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useCategoryStore from '@/stores/category-store';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

export default function NewCategoryScreen() {
  const router = useRouter();
  const { addCategory } = useCategoryStore();
  const { t } = useLocalization();
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [color, setColor] = useState(colorOptions[0]);
  const [icon, setIcon] = useState(iconOptions[0]);
  const [nameError, setNameError] = useState('');
  
  const handleSave = () => {
    if (!name.trim()) {
      setNameError(t('enterCategoryName'));
      return;
    }
    
    addCategory({
      name: name.trim(),
      color,
      icon,
    });
    
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: t('addCategory') }} />
      
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
            style={[styles.input, nameError ? styles.inputError : null]}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (text.trim()) setNameError('');
            }}
            placeholder={t('categoryName')}
            placeholderTextColor={colors.textLight}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
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
                ]}
                onPress={() => setColor(colorOption)}
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
                ]}
                onPress={() => setIcon(iconOption)}
              >
                <Text style={[
                  styles.iconText,
                  icon === iconOption && styles.selectedIconText
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
          style={styles.saveButton}
          onPress={handleSave}
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
  errorText: {
    color: colors.error,
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
  iconText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedIconText: {
    color: colors.background,
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