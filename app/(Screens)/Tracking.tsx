    import React, { useEffect, useState } from 'react';
    import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import AsyncStorage from '@react-native-async-storage/async-storage';


    type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    type WorkDayStatus = 'PRESENT' | 'ABSENT' | 'OFF';

    type AttendanceEntry = {
    id: number;
    employeeId: number;
    employeeName: string;
    timestamp: string;
    status: WorkDayStatus;
    notifiedManager: boolean;
    reportedChef: boolean;
    };

    type DailyAttendance = {
    [day in DayOfWeek]: WorkDayStatus;
    };

    const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    export default function TrackingScreen() {
    const [attendance, setAttendance] = useState<DailyAttendance>({
        Monday: 'OFF',
        Tuesday: 'OFF',
        Wednesday: 'OFF',
        Thursday: 'OFF',
        Friday: 'OFF',
        Saturday: 'OFF',
        Sunday: 'OFF',
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
        try {

            const storedUser = await AsyncStorage.getItem('userData');
            if (!storedUser) {
                Alert.alert('Error', 'User not found. Please log in again.');
                return(
                    <View>
                        <Text>
                            Error....User not found. Please log in again.
                        </Text>
                    </View>
                );
            }
            const user = JSON.parse(storedUser);
            const userId = user.id;


            const response = await fetch(`https://your-api.com/api/attendance/${userId}`);
            const data: AttendanceEntry[] = await response.json();

            // Start with default OFF/ABSENT values
            const parsed: DailyAttendance = {
            Monday: 'OFF',
            Tuesday: 'OFF',
            Wednesday: 'OFF',
            Thursday: 'OFF',
            Friday:  'OFF',
            Saturday: 'OFF',
            Sunday: 'OFF',
            };

            // Fill in actual PRESENT statuses
            data.forEach((entry) => {
            const date = new Date(entry.timestamp);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
            parsed[dayName] = entry.status;
            });

            setAttendance(parsed);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            Alert.alert('Error', 'Could not load attendance data');
        } finally {
            setLoading(false);
        }
        };

        fetchAttendance();
    }, []);

    if (loading) {
        return (
        <SafeAreaView style={styles.safeArea}>
            <ActivityIndicator size="large" color="#075eec" style={{ marginTop: 40 }} />
        </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            {days.map((day, index) => {
            const status = attendance[day];

            const icon =
                status === 'PRESENT'
                ? 'checkmark-circle'
                : status === 'ABSENT'
                ? 'close-circle'
                : 'remove-circle-outline';

            const color =
                status === 'PRESENT' ? 'green' : status === 'ABSENT' ? 'red' : 'gray';

            const label =
                status === 'PRESENT' ? 'Present' : status === 'ABSENT' ? 'Absent' : 'Off';

            return (
                <View key={index} style={styles.dayRow}>
                <Text style={styles.dayText}>{day}</Text>
                <View style={styles.statusContainer}>
                    <Ionicons name={icon} size={24} color={color} />
                    <Text style={[styles.statusText, { color }]}>{label}</Text>
                </View>
                </View>
            );
            })}
            <View style={{ height: 40 }} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 16,
        paddingBottom: 40,
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    });
