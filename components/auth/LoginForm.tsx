import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View as RNView, Dimensions } from 'react-native';
import { Text, View } from '../Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSubmit, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Theme.colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue</Text>
      
      <RNView style={styles.inputContainer}>
        <RNView style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </RNView>
        
        <RNView style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>
        </RNView>
      </RNView>
      
      <TouchableOpacity 
        style={[styles.forgotPassword]}
        onPress={onForgotPassword}
      >
        <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.loginButton, { backgroundColor: colors.primary }]}
        onPress={() => onSubmit(email, password)}
      >
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>
      
      <RNView style={styles.divider}>
        <RNView style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.textSecondary }]}>OR</Text>
        <RNView style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </RNView>
      
      <RNView style={styles.socialButtons}>
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Ionicons name="logo-google" size={20} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Ionicons name="logo-apple" size={20} color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Ionicons name="logo-facebook" size={20} color="#4267B2" />
        </TouchableOpacity>
      </RNView>
      
      <RNView style={styles.signupContainer}>
        <Text style={[styles.signupText, { color: colors.textSecondary }]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
          <Text style={[styles.signupLink, { color: colors.primary }]}> Sign Up</Text>
        </TouchableOpacity>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  title: {
    ...Theme.typography.h1,
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    ...Theme.typography.body,
    marginBottom: Theme.spacing.xl,
  },
  inputContainer: {
    width: '100%',
    marginBottom: Theme.spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    height: 56,
  },
  input: {
    flex: 1,
    height: 56,
    marginLeft: Theme.spacing.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Theme.spacing.xl,
  },
  forgotPasswordText: {
    ...Theme.typography.caption,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.medium,
  },
  loginButtonText: {
    color: '#FFFFFF',
    ...Theme.typography.button,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: Theme.spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Theme.spacing.md,
    ...Theme.typography.caption,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Theme.spacing.xl,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.sm,
    borderWidth: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    ...Theme.typography.body,
  },
  signupLink: {
    ...Theme.typography.body,
    fontWeight: '600',
  },
}); 