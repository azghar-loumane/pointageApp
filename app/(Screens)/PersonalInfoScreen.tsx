    import React, { useState } from 'react';
    import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    } from 'react-native';

    const ProfileScreen: React.FC = () => {
    const [userData, setUserData] = useState({
            profileImage: '@/assets/images/default-Photo.jpg',
            userName: 'loukmane',
            email: 'loukmane@gmail.com',
            pin: '00000',
            service: 'IT',
    });


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
                        <TextInput
                            style={styles.input}
                            value={userData.userName}
                            editable={false}
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            value={userData.email}
                            editable={false}
                        />

                        <Text style={styles.label}>Code PIN</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={userData.pin}
                            editable={false}
                        />

                        <Text style={styles.label}>Service</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.service}
                            editable={false}
                        />
                    </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FB',
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
        color: '#000000',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        color: '#000000',
    },
    });

    export default ProfileScreen;