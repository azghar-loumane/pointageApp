    import React, { useEffect, useState } from 'react';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    } from 'react-native';

    const ProfileScreen: React.FC = () => {
    const test_user ={
        userName : "lokman",
        email : "lok@exmple.com",
        pin : "089fds87fds8" ,
        service : "IT"
    }
    const [user, setUser] = useState<any>(test_user);
    const [loading, setLoading] = useState(false);



    // useEffect(() => {
    //     async function loadUser() {
    //     try {
    //         const storedUser = await AsyncStorage.getItem('userData');
    //         if (!storedUser) {
    //         Alert.alert('Error', 'User not found. Please log in again.');
    //         return;
    //         }
    //         setUser(JSON.parse(storedUser));
    //     } catch (error) {
    //         Alert.alert('Error', 'Failed to load user data.');
    //     } finally {
    //         setLoading(false);
    //     }
    //     }

    //     loadUser();
    // }, []);

    if (loading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#075eec" />
        </View>
        );
    }

    if (!user) {
        return (
        <View style={styles.center}>
            <Text style={styles.errorText}>User data could not be loaded.</Text>
        </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <View style={styles.profileContainer}>
            <Image
                source={require('@/assets/images/default-Photo.jpg')}
                style={styles.profileImage}
            />
            </View>

            <View style={styles.formContainer}>
            <Text style={styles.label}>User Name</Text>
            <TextInput style={styles.input} value={user.userName} editable={false} />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                value={user.email}
                editable={false}
            />

            <Text style={styles.label}>Code PIN</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={user.pin}
                editable={false}
            />

            <Text style={styles.label}>Service</Text>
            <TextInput style={styles.input} value={user.service} editable={false} />
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecfdf5',
    },
    keyboardAvoidingView: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    profileContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    formContainer: {
        width: '100%',
        marginTop: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#105844',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#105844',
        color: '#000000',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    });

    export default ProfileScreen;
