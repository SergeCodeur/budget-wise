import colors from '@/constants/colors';
import { currencyGroups } from '@/constants/currencies';
import useLocalization from '@/hooks/useLocalization';
import useExpenseStore from '@/stores/expense-store';
import useSettingsStore, { Currency, Language } from '@/stores/settings-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowDownToLine, ArrowUpFromLine, DollarSign, Globe, HelpCircle, Info, Tag, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { expenses } = useExpenseStore();
  const { currency, language, setCurrency, setLanguage } = useSettingsStore();
  const { t, formatDate } = useLocalization();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const handleExportData = () => {
    Alert.alert(
      t('exportData'),
      t('exportDescription'),
      [{ text: "OK" }]
    );
  };

  const handleImportData = () => {
    Alert.alert(
      t('importData'),
      t('importDescription'),
      [{ text: "OK" }]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      t('clearAllData'),
      t('clearDataDescription'),
      [
        { text: t('cancel'), style: "cancel" },
        { 
          text: t('delete'), 
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert(
                "Data Cleared",
                "All data has been deleted. Please restart the app.",
                [{ text: "OK" }]
              );
            } catch (error) {
              Alert.alert("Error", "Failed to clear data");
            }
          }
        }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      t('aboutApp'),
      t('aboutDescription'),
      [{ text: "OK" }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      t('helpSupport'),
      t('helpDescription'),
      [{ text: "OK" }]
    );
  };
  
  const handleManageCategories = () => {
    router.push('/categories');
  };
  
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setLanguageModalVisible(false);
  };
  
  const handleSelectCurrency = (curr: Currency) => {
    setCurrency(curr);
    setCurrencyModalVisible(false);
  };

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
          <Text style={styles.title}>{t('settings')}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('appLanguage')}</Text>
          
          <Pressable 
            style={styles.settingItem}
            onPress={() => setLanguageModalVisible(true)}
          >
            <View style={styles.settingIcon}>
              <Globe size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('selectLanguage')}</Text>
              <Text style={styles.settingDescription}>
                {language === 'en' ? t('english') : t('french')}
              </Text>
            </View>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('currency')}</Text>
          
          <Pressable 
            style={styles.settingItem}
            onPress={() => setCurrencyModalVisible(true)}
          >
            <View style={styles.settingIcon}>
              <DollarSign size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('selectCurrency')}</Text>
              <Text style={styles.settingDescription}>
                {currency.symbol} - {currency.name}
              </Text>
            </View>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('categories')}</Text>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleManageCategories}
          >
            <View style={styles.settingIcon}>
              <Tag size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('manageCategories')}</Text>
              <Text style={styles.settingDescription}>
                {t('categoriesDescription')}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dataManagement')}</Text>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleExportData}
          >
            <View style={styles.settingIcon}>
              <ArrowDownToLine size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('exportData')}</Text>
              <Text style={styles.settingDescription}>
                {t('exportDescription')}
              </Text>
            </View>
          </Pressable>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleImportData}
          >
            <View style={styles.settingIcon}>
              <ArrowUpFromLine size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('importData')}</Text>
              <Text style={styles.settingDescription}>
                {t('importDescription')}
              </Text>
            </View>
          </Pressable>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleClearData}
          >
            <View style={styles.settingIcon}>
              <Trash2 size={20} color={colors.error} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('clearAllData')}</Text>
              <Text style={styles.settingDescription}>
                {t('clearDataDescription')}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('about')}</Text>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleAbout}
          >
            <View style={styles.settingIcon}>
              <Info size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('aboutApp')}</Text>
              <Text style={styles.settingDescription}>
                {t('aboutDescription')}
              </Text>
            </View>
          </Pressable>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleHelp}
          >
            <View style={styles.settingIcon}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('helpSupport')}</Text>
              <Text style={styles.settingDescription}>
                {t('helpDescription')}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>{t('appStatistics')}</Text>
          <Text style={styles.statsItem}>
            {t('totalExpensesCount')}: {expenses.length}
          </Text>
          <Text style={styles.statsItem}>
            {t('firstExpense')}: {expenses.length > 0 ? formatDate(expenses[expenses.length - 1].date) : t('none')}
          </Text>
          <Text style={styles.statsItem}>
            {t('latestExpense')}: {expenses.length > 0 ? formatDate(expenses[0].date) : t('none')}
          </Text>
        </View>
      </ScrollView>
      
      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            { paddingBottom: Math.max(20, insets.bottom) }
          ]}>
            <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
            
            <Pressable
              style={styles.optionItem}
              onPress={() => handleSelectLanguage('en')}
            >
              <Text style={[
                styles.optionText,
                language === 'en' && styles.selectedOption
              ]}>
                {t('english')}
              </Text>
            </Pressable>
            
            <Pressable
              style={styles.optionItem}
              onPress={() => handleSelectLanguage('fr')}
            >
              <Text style={[
                styles.optionText,
                language === 'fr' && styles.selectedOption
              ]}>
                {t('french')}
              </Text>
            </Pressable>
            
            <Pressable
              style={styles.cancelButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      {/* Currency Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={currencyModalVisible}
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            { paddingBottom: Math.max(20, insets.bottom) }
          ]}>
            <Text style={styles.modalTitle}>{t('selectCurrency')}</Text>
            
            <ScrollView style={styles.currencyScrollView}>
              {currencyGroups.map((group, groupIndex) => (
                <View key={groupIndex}>
                  <Text style={styles.currencyGroupTitle}>{group.title}</Text>
                  
                  {group.data.map((curr, index) => (
                    <Pressable
                      key={curr.code}
                      style={styles.optionItem}
                      onPress={() => handleSelectCurrency(curr)}
                    >
                      <Text style={[
                        styles.optionText,
                        currency.code === curr.code && styles.selectedOption
                      ]}>
                        {curr.symbol} - {curr.name} {curr.region ? `(${curr.region})` : ''}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </ScrollView>
            
            <Pressable
              style={styles.cancelButton}
              onPress={() => setCurrencyModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  statsContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  statsItem: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  optionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  selectedOption: {
    color: colors.primary,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    textAlign: 'center',
  },
  currencyScrollView: {
    maxHeight: 400,
  },
  currencyGroupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});