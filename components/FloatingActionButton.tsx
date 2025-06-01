import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FloatingActionButton: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    router.push('/expense/new');
  };

  return (
    <View style={[
      styles.container,
      { bottom: 24 + insets.bottom }
    ]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handlePress}
      >
        <Plus size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    zIndex: 10,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: colors.primaryLight,
  },
});

export default FloatingActionButton;