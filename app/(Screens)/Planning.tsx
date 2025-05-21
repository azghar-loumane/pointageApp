    import React, { useState, useEffect } from 'react';
    import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    type WorkDay = {
    day: string;
    from: string | null;
    to: string | null;
    isWorkDay: boolean;
    };

    type Plan = {
    name: string;
    days: WorkDay[];
    };

    export default function PlanningScreen() {
//     const defaultPlan: Plan = {
//     name: 'Default Plan',
//     days: [
//         { day: 'Monday', from: '09:00', to: '17:00', isWorkDay: true },
//         { day: 'Tuesday', from: '09:00', to: '17:00', isWorkDay: true },
//         { day: 'Wednesday', from: '09:00', to: '17:00', isWorkDay: true },
//         { day: 'Thursday', from: '09:00', to: '17:00', isWorkDay: true },
//         { day: 'Friday', from: '09:00', to: '17:00', isWorkDay: true },
//         { day: 'Saturday', from: null, to: null, isWorkDay: false },
//         { day: 'Sunday', from: null, to: null, isWorkDay: false },
//     ],
// };
    const [plan, setPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlan = async () => {
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

            const response = await fetch(`https://your-api.com/api/planning/${userId}`);
            const json = await response.json();

            const parsedPlan = JSON.parse(json.planJson);
            setPlan(parsedPlan);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not load planning data');
        } finally {
            setLoading(false);
        }
        };

        fetchPlan();
    }, []);

    if (loading) {
        return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={{ textAlign: 'center', marginTop: 40 }}>Loading...</Text>
        </SafeAreaView>
        );
    }

    if (!plan) {
        return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={{ textAlign: 'center', marginTop: 40 }}>No plan found</Text>
        </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            {plan.days.map((day: WorkDay, index: number) => (
            <View
                key={index}
                style={[
                styles.dayRow,
                { borderLeftColor: day.isWorkDay ? 'green' : 'red', borderLeftWidth: 5 },
                ]}
            >
                <Text style={styles.dayText}>{day.day}</Text>
                {day.isWorkDay ? (
                <View style={styles.timeColumn}>
                    <Text style={styles.timeText}>{`${day.from} - ${day.to}`}</Text>
                </View>
                ) : (
                <Text style={styles.offText}>Not working</Text>
                )}
            </View>
            ))}
            <View style={{ height: 40 }} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ecfdf5',
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
    timeColumn: {
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: 'green',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#eaffea',
    },
    timeText: {
        fontSize: 18,
        color: 'green',
    },
    offText: {
        fontSize: 16,
        color: 'red',
        borderWidth: 1,
        borderColor: 'red',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#ffeaea',
    },
    });
