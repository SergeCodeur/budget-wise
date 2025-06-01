import { Currency } from '@/stores/settings-store';

// List of currencies with special emphasis on CFA and French-speaking African countries
const currencies: Currency[] = [
  // CFA Franc (West African)
  {
    code: 'XOF',
    symbol: 'CFA',
    name: 'CFA Franc BCEAO',
    region: 'West Africa',
  },
  // CFA Franc (Central African)
  {
    code: 'XAF',
    symbol: 'FCFA',
    name: 'CFA Franc BEAC',
    region: 'Central Africa',
  },
  // Other African currencies from French-speaking countries
  {
    code: 'MGA',
    symbol: 'Ar',
    name: 'Malagasy Ariary',
    region: 'Madagascar',
  },
  {
    code: 'DZD',
    symbol: 'د.ج',
    name: 'Algerian Dinar',
    region: 'Algeria',
  },
  {
    code: 'MAD',
    symbol: 'د.م.',
    name: 'Moroccan Dirham',
    region: 'Morocco',
  },
  {
    code: 'TND',
    symbol: 'د.ت',
    name: 'Tunisian Dinar',
    region: 'Tunisia',
  },
  // Common global currencies
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
  },
  {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
  },
  {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
  },
  {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
  },
  {
    code: 'BRL',
    symbol: 'R$',
    name: 'Brazilian Real',
  },
];

// Group currencies by region for better organization in UI
export const currencyGroups = [
  {
    title: 'African Currencies (French-speaking)',
    data: currencies.filter(c => c.region && (
      c.region.includes('Africa') || 
      ['Madagascar', 'Algeria', 'Morocco', 'Tunisia'].includes(c.region)
    )),
  },
  {
    title: 'Global Currencies',
    data: currencies.filter(c => !c.region),
  },
];

export default currencies;