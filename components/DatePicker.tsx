import colors from '@/constants/colors';
import useLocalization from '@/hooks/useLocalization';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DatePickerProps {
  date: string;
  onDateChange: (date: string) => void;
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  date, 
  onDateChange,
  label
}) => {
  const { t, formatDate } = useLocalization();
  const [showPicker, setShowPicker] = useState(false);
  const selectedDate = new Date(date);
  const insets = useSafeAreaInsets();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (selectedDate) {
      onDateChange(selectedDate.toISOString());
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <Pressable 
        style={styles.datePickerButton}
        onPress={showDatepicker}
      >
        <Calendar size={20} color={colors.textLight} />
        <Text style={styles.dateText}>
          {formatDate(date)}
        </Text>
      </Pressable>

      {/* Date Picker for iOS */}
      {Platform.OS === 'ios' && showPicker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPicker}
        >
          <View style={styles.modalContainer}>
            <View style={[
              styles.modalContent,
              { paddingBottom: Math.max(20, insets.bottom) }
            ]}>
              <View style={styles.pickerHeader}>
                <Pressable onPress={() => setShowPicker(false)}>
                  <Text style={styles.cancelText}>{t('cancel')}</Text>
                </Pressable>
                <Pressable 
                  onPress={() => {
                    setShowPicker(false);
                  }}
                >
                  <Text style={styles.doneText}>{t('save')}</Text>
                </Pressable>
              </View>
              
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.datePicker}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Date Picker for Android */}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textLight,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  datePicker: {
    height: 200,
  },
});

export default DatePicker;