import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { saveToken } from '../utils/token';

    export default function LoginScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
    try {
        const response = await fetch('https://backend-url.com/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password }),
        });

        const data = await response.json();
        
        
        if (response.ok) {
            saveToken(data.token);
            await AsyncStorage.setItem('userData', JSON.stringify(data.userData));
            router.replace('/(Screens)/Planning')
        } else {
            Alert.alert('Login Failed', data.message || 'Invalid credentials');
        }
        } catch (error) {
            Alert.alert('Error!:' , `${error} , Something went wrong. Please try again.`);
        }
    };

    return (
        <SafeAreaView style={{flex:1 , backgroundColor: '#ecfdf5'}}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image 
                            source={require('@/assets/images/logo.png')}
                            style={styles.headerImg}
                            alt="logo"/>
        
                            <Text style={styles.title}>sign in</Text>
        
                            <Text style={styles.subtitle}>
                                Get access to your portfolio and more
                            </Text>
                        </View>
        
                        <View style={styles.form}>
                            <View style={styles.input}>
        
                                <TextInput
                                style={styles.inputControl}
                                placeholder="Enter Your userName Address"
                                placeholderTextColor='#6b7280'
                                value={userName}
                                onChangeText={userName => setUserName(userName)}
                                />
                            </View>
        
                            <View style={styles.input}>
        
                                <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                style={styles.inputControl}
                                placeholder="Password"
                                placeholderTextColor='#6b7280'
                                value={password}
                                
                                onChangeText={password => setPassword(password)}
                                />
                            </View>
        
                            <View style={styles.formAction}>
                                <TouchableOpacity onPress={handleLogin}>
                                    <View style={styles.btn}>
                                        <Text style={styles.btnText}>Sign in</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
        
                            <View style={{marginTop: 'auto'}}>
                                <Text style={styles.formFooter}>You Should Have An Account In Web Side So Sign In</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
    );
    }


    const styles = StyleSheet.create({
    container:{
        padding:24,
        flex:1,
    },
    header:{
        marginVertical:36,
    },
    headerImg:{
        width:200,
        height:200,
        alignSelf: 'center',
    },
    title:{
        fontSize:27,
        fontWeight: '700',
        color:'#1e1e1e',
        marginBottom:6,
        textAlign:'center',
    },
    subtitle:{
        fontSize:15,
        fontWeight:'500',
        color:'black',
        textAlign:'center',
    },
    input:{
        marginBottom:15,
    },
    inputLabel:{
        fontSize:15,
        fontWeight:'600',
        color:'#222',
        marginBottom:8,
    },
    inputControl:{
        height:44,
        backgroundColor:'#fff',
        paddingHorizontal:16,
        borderRadius:12,
        fontSize:15,
        fontWeight:'500',
        color:'#222'
    },
    form:{
        marginBottom:24,
        flex:1,
    },
    formAction: {
        marginVertical:24,
    },
    formFooter:{
        fontSize:17,
        fontWeight:'600',
        color:'#222',
        textAlign:'center',
        letterSpacing:0.15,
    },
    btn: {
        backgroundColor:'#105844',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#105844',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        paddingVertical:10,
        paddingHorizontal:20,
    },
    btnText:{
        fontSize:18,
        fontWeight:'600',
        color:'#fff'
    },
});