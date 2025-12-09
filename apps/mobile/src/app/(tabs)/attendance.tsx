import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate, formatTime } from '@payroll-pro/utils';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface AttendanceRecord {
  id: string;
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  totalHours: number | null;
  status: string;
}

export default function AttendanceScreen() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/mobile/attendance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAttendance(data);
      }
    } catch (error) {
      console.error('Error loading attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
      </View>

      {attendance.map((record) => (
        <View key={record.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.date}>{formatDate(record.date)}</Text>
            <Text style={styles.status}>{record.status}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Time In:</Text>
            <Text>{record.timeIn ? formatTime(record.timeIn) : '-'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Time Out:</Text>
            <Text>{record.timeOut ? formatTime(record.timeOut) : '-'}</Text>
          </View>

          {record.totalHours && (
            <View style={styles.row}>
              <Text style={styles.label}>Total Hours:</Text>
              <Text style={styles.hours}>{record.totalHours.toFixed(2)} hrs</Text>
            </View>
          )}
        </View>
      ))}
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
  card: {
    margin: 20,
    padding: 16,
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
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
  },
  hours: {
    fontWeight: '600',
    color: '#3b82f6',
  },
});

