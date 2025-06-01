import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import useCategoryStore from '@/stores/category-store';
import { Car, Film, Heart, Home, MoreHorizontal, ShoppingBag, Utensils, Zap } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface CategoryPickerProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { categories } = useCategoryStore();
  const { t } = useLocalization();

  const getCategoryIcon = (categoryId: string) => {
    // Find the category
    const category = categories.find(cat => cat.id === categoryId);
    
    // Return icon based on category id or icon name
    switch (categoryId) {
      case 'food':
        return <Utensils size={20} color={colors.background} />;
      case 'transport':
        return <Car size={20} color={colors.background} />;
      case 'shopping':
        return <ShoppingBag size={20} color={colors.background} />;
      case 'entertainment':
        return <Film size={20} color={colors.background} />;
      case 'health':
        return <Heart size={20} color={colors.background} />;
      case 'housing':
        return <Home size={20} color={colors.background} />;
      case 'utilities':
        return <Zap size={20} color={colors.background} />;
      case 'other':
      default:
        return <MoreHorizontal size={20} color={colors.background} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('category')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryItem,
              {
                backgroundColor:
                  selectedCategory === category.id
                    ? category.color
                    : colors.card,
              },
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <View style={[
              styles.iconContainer,
              {
                backgroundColor: selectedCategory === category.id
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.05)'
              }
            ]}>
              {getCategoryIcon(category.id)}
            </View>
            <Text
              style={[
                styles.categoryName,
                {
                  color:
                    selectedCategory === category.id
                      ? colors.background
                      : colors.text,
                },
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CategoryPicker;