    import React from 'react';
    import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

    const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    const periods = [
    '08:00 - 12:00',
    '13:00 - 17:00'
    ];

    export default function PlanningScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            {days.map((day, index) => (
            <View key={index} style={styles.dayRow}>
                <Text style={styles.dayText}>{day}</Text>
                <View style={styles.timeColumn}>
                {periods.map((time, idx) => (
                    <Text key={idx} style={styles.timeText}>{time}</Text>
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
    },
    timeText: {
        fontSize: 22,
        color: '#000',
        marginBottom: 4,
    },
    });
