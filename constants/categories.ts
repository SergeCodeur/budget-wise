import colors from './colors';

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

const categories: Category[] = [
  {
    id: 'food',
    name: 'Food & Drinks',
    icon: 'utensils',
    color: colors.food,
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'car',
    color: colors.transport,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'shopping-bag',
    color: colors.shopping,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'film',
    color: colors.entertainment,
  },
  {
    id: 'health',
    name: 'Health',
    icon: 'heart',
    color: colors.health,
  },
  {
    id: 'housing',
    name: 'Housing',
    icon: 'home',
    color: colors.housing,
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'plug',
    color: colors.utilities,
  },
  {
    id: 'other',
    name: 'Other',
    icon: 'ellipsis-h',
    color: colors.other,
  },
];

export default categories;