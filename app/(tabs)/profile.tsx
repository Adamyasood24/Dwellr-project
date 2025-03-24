import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Theme.colors[colorScheme];
  const { signOut } = useAuth();

  const menuItems = [
    { icon: 'heart-outline', label: 'Favorites', badge: '5' },
    { icon: 'notifications-outline', label: 'Notifications', badge: '3' },
    { icon: 'time-outline', label: 'History' },
    { icon: 'settings-outline', label: 'Settings' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
    { icon: 'information-circle-outline', label: 'About' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={[styles.settingsButton, { backgroundColor: colors.card }]}>
            <Ionicons name="settings-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
              john.doe@example.com
            </Text>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.highlight }]}>
              <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Saved</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reviews</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Bookings</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Account</Text>
          <View style={[styles.menuCard, { backgroundColor: colors.card }]}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.menuItem, 
                  index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
                ]}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon} size={24} color={colors.primary} />
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                <View style={styles.menuItemRight}>
                  {item.badge && (
                    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={() => signOut()}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  title: {
    ...Theme.typography.h2,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  profileCard: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.medium,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: Theme.spacing.lg,
    justifyContent: 'center',
  },
  profileName: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  profileEmail: {
    ...Theme.typography.body,
    marginBottom: Theme.spacing.md,
  },
  editButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    ...Theme.typography.caption,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.medium,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  statValue: {
    ...Theme.typography.h2,
    marginBottom: Theme.spacing.xs,
  },
  statLabel: {
    ...Theme.typography.caption,
  },
  statDivider: {
    width: 1,
    marginVertical: Theme.spacing.md,
  },
  menuSection: {
    marginBottom: Theme.spacing.xl,
  },
  menuTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.md,
  },
  menuCard: {
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.medium,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    ...Theme.typography.body,
    marginLeft: Theme.spacing.md,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs / 2,
    borderRadius: Theme.borderRadius.full,
    marginRight: Theme.spacing.sm,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.medium,
  },
  logoutButtonText: {
    color: '#fff',
    ...Theme.typography.button,
    marginLeft: Theme.spacing.sm,
  },
}); 