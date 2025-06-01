import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import { Calendar, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateRangeChange: (start: string, end: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateRangeChange,
}) => {
  const { t, getDateRangeLabel } = useLocalization();
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const dateRangeOptions = [
    {
      label: t('thisMonth'),
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
          start: start.toISOString(),
          end: end.toISOString(),
        };
      },
    },
    {
      label: t('lastMonth'),
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return {
          start: start.toISOString(),
          end: end.toISOString(),
        };
      },
    },
    {
      label: t('last3Months'),
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
          start: start.toISOString(),
          end: end.toISOString(),
        };
      },
    },
    {
      label: t('thisYear'),
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31);
        return {
          start: start.toISOString(),
          end: end.toISOString(),
        };
      },
    },
  ];

  const handleSelectRange = (getRange: () => { start: string; end: string }) => {
    const { start, end } = getRange();
    onDateRangeChange(start, end);
    setModalVisible(false);
  };

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.iconContainer}>
          <Calendar size={16} color={colors.primary} />
        </View>
        <Text style={styles.dateRangeText}>
          {getDateRangeLabel(startDate, endDate)}
        </Text>
        <ChevronDown size={16} color={colors.textLight} />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            { paddingBottom: Math.max(20, insets.bottom) }
          ]}>
            <Text style={styles.modalTitle}>{t('selectDateRange')}</Text>
            
            {dateRangeOptions.map((option, index) => (
              <Pressable
                key={index}
                style={styles.optionItem}
                onPress={() => handleSelectRange(option.getRange)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </Pressable>
            ))}
            
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  iconContainer: {
    marginRight: 8,
  },
  dateRangeText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginRight: 4,
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
});

export default DateRangePicker;