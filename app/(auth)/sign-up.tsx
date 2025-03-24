import { StyleSheet, useColorScheme, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Theme';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Theme.colors[colorScheme].background }]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={Theme.colors[colorScheme].text} 
        />
      </TouchableOpacity>

      <Text style={[styles.title, { color: Theme.colors[colorScheme].text }]}>
        Create Account
      </Text>

      <TextInput
        style={[styles.input, { 
          borderColor: Theme.colors[colorScheme].border,
          backgroundColor: Theme.colors[colorScheme].card,
          color: Theme.colors[colorScheme].text,
        }]}
        placeholder="Email"
        placeholderTextColor={Theme.colors[colorScheme].textSecondary}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, { 
          borderColor: Theme.colors[colorScheme].border,
          backgroundColor: Theme.colors[colorScheme].card,
          color: Theme.colors[colorScheme].text,
        }]}
        placeholder="Password"
        placeholderTextColor={Theme.colors[colorScheme].textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: Theme.colors[colorScheme].primary }]}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginLink}
        onPress={() => router.replace('/(auth)/sign-in')}
      >
        <Text style={[styles.loginText, { color: Theme.colors[colorScheme].textSecondary }]}>
          Already have an account? <Text style={{ color: Theme.colors[colorScheme].primary }}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.xl,
  },
  backButton: {
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.xl,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: Theme.spacing.xl,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
}); 