import { StyleSheet, useColorScheme, Dimensions, KeyboardAvoidingView, Platform, ScrollView, View as RNView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Theme';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Theme.colors[colorScheme];
  const { signIn } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      // Navigation is handled in AuthContext
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic
    console.log('Forgot password');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <RNView style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
              <Ionicons name="home" size={64} color="#fff" />
            </RNView>
            <Text style={[styles.appName, { color: colors.primary }]}>Dwellr</Text>
          </View>
          
          <LoginForm 
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Theme.spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    marginTop: height * 0.05,
  },
  logoCircle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.medium,
  },
  appName: {
    ...Theme.typography.h1,
    fontWeight: '700',
  }
}); 