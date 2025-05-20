    import React, { useRef, useState } from 'react';
    import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
    import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
    import { useSafeAreaInsets } from 'react-native-safe-area-context';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export default function AddTrack() {
    const {top , bottom } = useSafeAreaInsets();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef(null);

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
        <View style={styles.center}>
            <Text style={styles.message}>Camera permission denied, please Give The App The Permission</Text>
            <Button title="Get Permission" onPress={requestPermission} />
        </View>
        );
    }

    const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
        // try{
        //     setScanned(true);
        //     const storedUser = await AsyncStorage.getItem('userData');
        //     if (!storedUser) {
        //         Alert.alert('Error', 'User not found. Please log in again.');
        //         return;
        //     }
        //     const user = JSON.parse(storedUser);
        //     const response = await fetch('https://your-api.com/api/track', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         userId: user.id,
        //         qrData: result.data,
        //         qrType: result.type,
        //     }),
        //     });

        //     const resJson = await response.json();

        //     if (response.ok) {
        //     Alert.alert('Success', 'QR code data sent successfully.');
        //     console.log('Backend response:', resJson);
        //     } else {
        //     Alert.alert('Failed', resJson.message || 'Something went wrong');
        //     }
        // } catch (error) {
        //     console.error(error);
        //     Alert.alert('Error',`${error} Could not process the QR code.`);
        // }
        Alert.alert(result.data);
    };

    return (
        <View style={styles.container}>
        <CameraView
            ref={cameraRef}
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
            barcodeTypes: ['qr', 'ean13', 'code128'],
            }}
        />

        {scanned && (
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setScanned(false)} >
                    <View
                        style={{
                            borderTopColor:'#dde3fe',
                            borderTopWidth:1,
                            padding:20,
                            paddingBottom:20 + bottom ,
                        }}>
                            <View style={styles.btn}>
                            <Text style={styles.btnText}>Scan Again</Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
        )}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    message: {
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
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
