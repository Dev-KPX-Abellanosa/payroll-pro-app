import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency } from '@payroll-pro/utils';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface PayslipSummary {
  period: string;
  grossPay: number;
  netPay: number;
  status: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [latestPayslip, setLatestPayslip] = useState<PayslipSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    loadLatestPayslip();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const loadLatestPayslip = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/mobile/payslips/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLatestPayslip(data);
      }
    } catch (error) {
      console.error('Error loading payslip:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>{user?.name || 'Employee'}</Text>
      </View>

      {latestPayslip && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Payslip</Text>
          <Text style={styles.period}>{latestPayslip.period}</Text>
          <View style={styles.amountRow}>
            <View>
              <Text style={styles.amountLabel}>Gross Pay</Text>
              <Text style={styles.amount}>{formatCurrency(latestPayslip.grossPay)}</Text>
            </View>
            <View>
              <Text style={styles.amountLabel}>Net Pay</Text>
              <Text style={[styles.amount, styles.netPay]}>
                {formatCurrency(latestPayslip.netPay)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => router.push('/(tabs)/payslip')}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/attendance')}
        >
          <Text style={styles.actionButtonText}>View Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/profile')}>
          <Text style={styles.actionButtonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.actionButtonText, styles.logoutButtonText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  period: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  netPay: {
    color: '#3b82f6',
  },
  viewButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    borderColor: '#ef4444',
  },
  logoutButtonText: {
    color: '#ef4444',
  },
});

