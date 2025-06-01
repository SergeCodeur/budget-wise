import { Language } from '@/stores/settings-store';

type TranslationKey = 
  // Dashboard
  | 'dashboard'
  | 'totalExpenses'
  | 'topCategories'
  | 'noExpenses'
  | 'addFirstExpense'
  // Reports
  | 'reports'
  | 'spendingByCategory'
  | 'noData'
  // Budget
  | 'budget'
  | 'monthlyBudget'
  | 'setBudgetsDescription'
  | 'enterBudgetAmount'
  | 'remaining'
  | 'overBudget'
  // Settings
  | 'settings'
  | 'dataManagement'
  | 'exportData'
  | 'exportDescription'
  | 'importData'
  | 'importDescription'
  | 'clearAllData'
  | 'clearDataDescription'
  | 'about'
  | 'aboutApp'
  | 'aboutDescription'
  | 'helpSupport'
  | 'helpDescription'
  | 'appStatistics'
  | 'totalExpensesCount'
  | 'firstExpense'
  | 'latestExpense'
  | 'none'
  | 'appLanguage'
  | 'selectLanguage'
  | 'english'
  | 'french'
  | 'currency'
  | 'selectCurrency'
  | 'categories'
  | 'manageCategories'
  | 'categoriesDescription'
  // Expense Form
  | 'addExpense'
  | 'editExpense'
  | 'amount'
  | 'description'
  | 'category'
  | 'date'
  | 'cancel'
  | 'save'
  | 'saveExpense'
  | 'saveChanges'
  | 'delete'
  | 'deleteExpense'
  | 'confirmDelete'
  | 'expenseNotFound'
  | 'goBack'
  | 'whatDidYouSpendOn'
  | 'enterValidAmount'
  | 'enterDescription'
  // Date Range
  | 'selectDateRange'
  | 'thisMonth'
  | 'lastMonth'
  | 'last3Months'
  | 'thisYear'
  // Categories
  | 'addCategory'
  | 'editCategory'
  | 'categoryName'
  | 'categoryColor'
  | 'categoryIcon'
  | 'defaultCategories'
  | 'customCategories'
  | 'deleteCategory'
  | 'confirmDeleteCategory'
  | 'cannotDeleteDefault'
  | 'selectIcon'
  | 'selectColor'
  | 'enterCategoryName'
  | 'resetToDefaults'
  | 'confirmResetCategories'
  | 'reset';

type Translations = {
  [key in TranslationKey]: {
    en: string;
    fr: string;
  };
};

const translations: Translations = {
  // Dashboard
  dashboard: {
    en: 'Dashboard',
    fr: 'Tableau de bord',
  },
  totalExpenses: {
    en: 'Total Expenses',
    fr: 'Dépenses totales',
  },
  topCategories: {
    en: 'Top Categories',
    fr: 'Catégories principales',
  },
  noExpenses: {
    en: 'No expenses found',
    fr: 'Aucune dépense trouvée',
  },
  addFirstExpense: {
    en: 'No expenses yet. Tap the + button to add your first expense.',
    fr: "Pas encore de dépenses. Appuyez sur le bouton + pour ajouter votre première dépense.",
  },
  
  // Reports
  reports: {
    en: 'Reports',
    fr: 'Rapports',
  },
  spendingByCategory: {
    en: 'Spending by Category',
    fr: 'Dépenses par catégorie',
  },
  noData: {
    en: 'No data for the selected period',
    fr: 'Aucune donnée pour la période sélectionnée',
  },
  
  // Budget
  budget: {
    en: 'Budget',
    fr: 'Budget',
  },
  monthlyBudget: {
    en: 'Monthly Budget',
    fr: 'Budget mensuel',
  },
  setBudgetsDescription: {
    en: 'Set budgets for each category to track your spending',
    fr: 'Définissez des budgets pour chaque catégorie pour suivre vos dépenses',
  },
  enterBudgetAmount: {
    en: 'Enter budget amount',
    fr: 'Entrez le montant du budget',
  },
  remaining: {
    en: 'remaining',
    fr: 'restant',
  },
  overBudget: {
    en: 'over budget',
    fr: 'dépassement',
  },
  
  // Settings
  settings: {
    en: 'Settings',
    fr: 'Paramètres',
  },
  dataManagement: {
    en: 'Data Management',
    fr: 'Gestion des données',
  },
  exportData: {
    en: 'Export Data',
    fr: 'Exporter les données',
  },
  exportDescription: {
    en: 'Export your expense data as CSV or JSON',
    fr: 'Exportez vos données de dépenses au format CSV ou JSON',
  },
  importData: {
    en: 'Import Data',
    fr: 'Importer des données',
  },
  importDescription: {
    en: 'Import expense data from CSV or JSON',
    fr: 'Importez des données de dépenses à partir de CSV ou JSON',
  },
  clearAllData: {
    en: 'Clear All Data',
    fr: 'Effacer toutes les données',
  },
  clearDataDescription: {
    en: 'Delete all your expense data',
    fr: 'Supprimez toutes vos données de dépenses',
  },
  about: {
    en: 'About',
    fr: 'À propos',
  },
  aboutApp: {
    en: 'About Expense Tracker',
    fr: 'À propos du Suivi des dépenses',
  },
  aboutDescription: {
    en: 'App version, credits, and information',
    fr: "Version de l'application, crédits et informations",
  },
  helpSupport: {
    en: 'Help & Support',
    fr: 'Aide et support',
  },
  helpDescription: {
    en: 'Get help with using the app',
    fr: "Obtenez de l'aide pour utiliser l'application",
  },
  appStatistics: {
    en: 'App Statistics',
    fr: "Statistiques de l'application",
  },
  totalExpensesCount: {
    en: 'Total Expenses',
    fr: 'Nombre total de dépenses',
  },
  firstExpense: {
    en: 'First Expense',
    fr: 'Première dépense',
  },
  latestExpense: {
    en: 'Latest Expense',
    fr: 'Dernière dépense',
  },
  none: {
    en: 'None',
    fr: 'Aucune',
  },
  appLanguage: {
    en: 'App Language',
    fr: "Langue de l'application",
  },
  selectLanguage: {
    en: 'Select Language',
    fr: 'Sélectionner la langue',
  },
  english: {
    en: 'English',
    fr: 'Anglais',
  },
  french: {
    en: 'French',
    fr: 'Français',
  },
  currency: {
    en: 'Currency',
    fr: 'Devise',
  },
  selectCurrency: {
    en: 'Select Currency',
    fr: 'Sélectionner la devise',
  },
  categories: {
    en: 'Categories',
    fr: 'Catégories',
  },
  manageCategories: {
    en: 'Manage Categories',
    fr: 'Gérer les catégories',
  },
  categoriesDescription: {
    en: 'Add, edit, or delete expense categories',
    fr: 'Ajouter, modifier ou supprimer des catégories de dépenses',
  },
  
  // Expense Form
  addExpense: {
    en: 'Add Expense',
    fr: 'Ajouter une dépense',
  },
  editExpense: {
    en: 'Edit Expense',
    fr: 'Modifier la dépense',
  },
  amount: {
    en: 'Amount',
    fr: 'Montant',
  },
  description: {
    en: 'Description',
    fr: 'Description',
  },
  category: {
    en: 'Category',
    fr: 'Catégorie',
  },
  date: {
    en: 'Date',
    fr: 'Date',
  },
  cancel: {
    en: 'Cancel',
    fr: 'Annuler',
  },
  save: {
    en: 'Save',
    fr: 'Enregistrer',
  },
  saveExpense: {
    en: 'Save Expense',
    fr: 'Enregistrer la dépense',
  },
  saveChanges: {
    en: 'Save Changes',
    fr: 'Enregistrer les modifications',
  },
  delete: {
    en: 'Delete',
    fr: 'Supprimer',
  },
  deleteExpense: {
    en: 'Delete Expense',
    fr: 'Supprimer la dépense',
  },
  confirmDelete: {
    en: 'Are you sure you want to delete this expense?',
    fr: 'Êtes-vous sûr de vouloir supprimer cette dépense ?',
  },
  expenseNotFound: {
    en: 'Expense not found',
    fr: 'Dépense non trouvée',
  },
  goBack: {
    en: 'Go Back',
    fr: 'Retour',
  },
  whatDidYouSpendOn: {
    en: 'What did you spend on?',
    fr: 'Sur quoi avez-vous dépensé ?',
  },
  enterValidAmount: {
    en: 'Please enter a valid amount',
    fr: 'Veuillez entrer un montant valide',
  },
  enterDescription: {
    en: 'Please enter a description',
    fr: 'Veuillez entrer une description',
  },
  
  // Date Range
  selectDateRange: {
    en: 'Select Date Range',
    fr: 'Sélectionner la période',
  },
  thisMonth: {
    en: 'This Month',
    fr: 'Ce mois-ci',
  },
  lastMonth: {
    en: 'Last Month',
    fr: 'Le mois dernier',
  },
  last3Months: {
    en: 'Last 3 Months',
    fr: 'Les 3 derniers mois',
  },
  thisYear: {
    en: 'This Year',
    fr: 'Cette année',
  },
  
  // Categories
  addCategory: {
    en: 'Add Category',
    fr: 'Ajouter une catégorie',
  },
  editCategory: {
    en: 'Edit Category',
    fr: 'Modifier la catégorie',
  },
  categoryName: {
    en: 'Category Name',
    fr: 'Nom de la catégorie',
  },
  categoryColor: {
    en: 'Color',
    fr: 'Couleur',
  },
  categoryIcon: {
    en: 'Icon',
    fr: 'Icône',
  },
  defaultCategories: {
    en: 'Default Categories',
    fr: 'Catégories par défaut',
  },
  customCategories: {
    en: 'Custom Categories',
    fr: 'Catégories personnalisées',
  },
  deleteCategory: {
    en: 'Delete Category',
    fr: 'Supprimer la catégorie',
  },
  confirmDeleteCategory: {
    en: 'Are you sure you want to delete this category? Expenses with this category will be moved to "Other".',
    fr: 'Êtes-vous sûr de vouloir supprimer cette catégorie ? Les dépenses de cette catégorie seront déplacées vers "Autre".',
  },
  cannotDeleteDefault: {
    en: 'Default categories cannot be deleted',
    fr: 'Les catégories par défaut ne peuvent pas être supprimées',
  },
  selectIcon: {
    en: 'Select Icon',
    fr: 'Sélectionner une icône',
  },
  selectColor: {
    en: 'Select Color',
    fr: 'Sélectionner une couleur',
  },
  enterCategoryName: {
    en: 'Please enter a category name',
    fr: 'Veuillez entrer un nom de catégorie',
  },
  resetToDefaults: {
    en: 'Reset to Defaults',
    fr: 'Réinitialiser aux valeurs par défaut',
  },
  confirmResetCategories: {
    en: 'Are you sure you want to reset all categories to defaults? This will delete all custom categories.',
    fr: 'Êtes-vous sûr de vouloir réinitialiser toutes les catégories ? Cela supprimera toutes les catégories personnalisées.',
  },
  reset: {
    en: 'Reset',
    fr: 'Réinitialiser',
  },
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: TranslationKey): string => {
      return translations[key][language];
    }
  };
};

export default translations;