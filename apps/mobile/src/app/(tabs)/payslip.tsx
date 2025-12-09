import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency, formatDate } from '@payroll-pro/utils';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface Payslip {
  id: string;
  periodStart: string;
  periodEnd: string;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
  totalDeductions: number;
  totalContributions: number;
  taxWithheld: number;
  netPay: number;
  status: string;
}

export default function PayslipScreen() {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayslips();
  }, []);

  const loadPayslips = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/mobile/payslips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPayslips(data);
      }
    } catch (error) {
      console.error('Error loading payslips:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payslips</Text>
      </View>

      {payslips.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No payslips found</Text>
        </View>
      ) : (
        payslips.map((payslip) => (
          <View key={payslip.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.period}>
                {formatDate(payslip.periodStart)} - {formatDate(payslip.periodEnd)}
              </Text>
              <Text style={styles.status}>{payslip.status}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Earnings</Text>
              <View style={styles.row}>
                <Text>Regular Pay</Text>
                <Text>{formatCurrency(payslip.regularPay)}</Text>
              </View>
              <View style={styles.row}>
                <Text>Overtime Pay</Text>
                <Text>{formatCurrency(payslip.overtimePay)}</Text>
              </View>
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Gross Pay</Text>
                <Text style={styles.totalAmount}>{formatCurrency(payslip.grossPay)}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Deductions</Text>
              <View style={styles.row}>
                <Text>Contributions</Text>
                <Text>{formatCurrency(payslip.totalContributions)}</Text>
              </View>
              <View style={styles.row}>
                <Text>Other Deductions</Text>
                <Text>{formatCurrency(payslip.totalDeductions)}</Text>
              </View>
              <View style={styles.row}>
                <Text>Tax</Text>
                <Text>{formatCurrency(payslip.taxWithheld)}</Text>
              </View>
            </View>

            <View style={[styles.section, styles.netSection]}>
              <View style={styles.row}>
                <Text style={styles.netLabel}>Net Pay</Text>
                <Text style={styles.netAmount}>{formatCurrency(payslip.netPay)}</Text>
              </View>
            </View>
          </View>
        ))
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  period: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  totalLabel: {
    fontWeight: '600',
  },
  totalAmount: {
    fontWeight: '600',
  },
  netSection: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  netLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  netAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
});

