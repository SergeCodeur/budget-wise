import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import useCategoryStore, { Category } from '@/stores/category-store';
import { Edit2, Plus, Trash2 } from 'lucide-react-native';
import useLocalization from '@/hooks/useLocalization';
import useExpenseStore from '@/stores/expense-store';

export default function CategoriesScreen() {
  const router = useRouter();
  const { categories, deleteCategory, resetToDefaults } = useCategoryStore();
  const { updateExpense } = useExpenseStore();
  const { t } = useLocalization();
  const insets = useSafeAreaInsets();
  
  const defaultCategories = categories.filter(cat => cat.isDefault);
  const customCategories = categories.filter(cat => !cat.isDefault);
  
  const handleAddCategory = () => {
    router.push('/categories/new');
  };
  
  const handleEditCategory = (category: Category) => {
    router.push({
      pathname: '/categories/edit',
      params: { id: category.id }
    });
  };
  
  const handleDeleteCategory = (category: Category) => {
    if (category.isDefault) {
      Alert.alert(
        t('deleteCategory'),
        t('cannotDeleteDefault'),
        [{ text: "OK" }]
      );
      return;
    }
    
    Alert.alert(
      t('deleteCategory'),
      t('confirmDeleteCategory'),
      [
        { text: t('cancel'), style: "cancel" },
        { 
          text: t('delete'), 
          style: "destructive",
          onPress: () => {
            // Move expenses with this category to "other"
            useExpenseStore.getState().expenses.forEach(expense => {
              if (expense.category === category.id) {
                updateExpense(expense.id, { category: 'other' });
              }
            });
            
            // Delete the category
            deleteCategory(category.id);
          }
        }
      ]
    );
  };
  
  const handleResetToDefaults = () => {
    Alert.alert(
      t('resetToDefaults'),
      t('confirmResetCategories'),
      [
        { text: t('cancel'), style: "cancel" },
        { 
          text: t('reset'), 
          style: "destructive",
          onPress: () => {
            // Move expenses with custom categories to "other"
            useExpenseStore.getState().expenses.forEach(expense => {
              const category = categories.find(cat => cat.id === expense.category);
              if (category && !category.isDefault) {
                updateExpense(expense.id, { category: 'other' });
              }
            });
            
            // Reset categories to defaults
            resetToDefaults();
          }
        }
      ]
    );
  };
  
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryInfo}>
        <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
      
      <View style={styles.categoryActions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => handleEditCategory(item)}
        >
          <Edit2 size={18} color={colors.primary} />
        </Pressable>
        
        <Pressable
          style={styles.actionButton}
          onPress={() => handleDeleteCategory(item)}
        >
          <Trash2 size={18} color={item.isDefault ? colors.textLight : colors.error} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: t('manageCategories'),
          headerRight: () => (
            <Pressable
              style={styles.headerButton}
              onPress={handleAddCategory}
            >
              <Plus size={24} color={colors.primary} />
            </Pressable>
          ),
        }} 
      />
      
      <FlatList
        data={[...defaultCategories, ...customCategories]}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        ListHeaderComponent={() => (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('defaultCategories')}</Text>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <>
            {customCategories.length > 0 && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('customCategories')}</Text>
              </View>
            )}
            
            <Pressable
              style={[
                styles.resetButton,
                { marginBottom: 20 + insets.bottom }
              ]}
              onPress={handleResetToDefaults}
            >
              <Text style={styles.resetButtonText}>{t('resetToDefaults')}</Text>
            </Pressable>
          </>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerButton: {
    padding: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    color: colors.text,
  },
  categoryActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  resetButton: {
    marginTop: 24,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '500',
  },
});