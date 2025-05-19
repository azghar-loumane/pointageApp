    import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View ,SafeAreaView , Image } from 'react-native';
import {  saveToken } from '../utils/token';

    export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //will updated after connect to the back end  : !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const handleLogin = async () => {
        if (email && password) {
        await saveToken('demo-token');
        router.replace('/Planning');
        } else {
        alert('Enter email and password');
        }
    };

    return (
        <SafeAreaView style={{flex:1 , backgroundColor: '#5363df'}}>
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
                                placeholder="Enter Your Email Address"
                                placeholderTextColor='#6b7280'
                                value={email}
                                onChangeText={email => setEmail(email)}
                                />
                            </View>
        
                            <View style={styles.input}>
        
                                <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
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
        backgroundColor:'#075eec',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#075eec',
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