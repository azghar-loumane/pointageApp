    import React from 'react';
    import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    const periods = ['08:00 - 12:00', '13:00 - 17:00'];

    //this is a static i will change it when i connect to back end:
    const attendance = {
    Monday: [true, false],
    Tuesday: [true, true],
    Wednesday: [false, false],
    Thursday: [true, false],
    Friday: [false, true],
    Saturday: [true, true],
    Sunday: [false, false]
    };

    export default function TrackingScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            {days.map((day, index) => (
            <View key={index} style={styles.dayRow}>
                <Text style={styles.dayText}>{day}</Text>
                <View style={styles.timeColumn}>
                {periods.map((time, idx) => (
                    <View key={idx} style={styles.periodRow}>
                    <Text style={styles.timeText}>{time}</Text>
                    <Ionicons
                        name={attendance[day]?.[idx] ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={attendance[day]?.[idx] ? 'green' : 'red'}
                        style={{ marginLeft: 8 }}
                    />
                    </View>
                ))}
                </View>
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
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 16,
        paddingBottom: 40,
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
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
    },
    periodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    timeText: {
        fontSize: 22,
        color: '#000',
    },
    });
