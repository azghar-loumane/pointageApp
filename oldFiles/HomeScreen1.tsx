import { getToken } from '@/utils/token';
import { useEffect } from 'react';
import { View , Text , TouchableOpacity , Image , StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';

    export default function HomeScreen() {

        const router = useRouter();

        useEffect(() => {
            const fetchToken = async () => {
                const token = await getToken();
                console.log(token);
            };
            fetchToken();
            }, []);
        

        return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.title}>Home</Text>
                <TouchableOpacity onPress={() => router.navigate('/PersonalInfoScreen')}>
                    <Image
                        source={require('@/assets/images/default-Photo.jpg')}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
                <Text>you are in HomeScreen</Text> 
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        navbar: {
            height: 90,
            backgroundColor: '#0066cc',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingTop: 10,
        },
        title: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
        },
        profileImage: {
            width: 40,
            height: 40,
            borderRadius: 20, 
            borderWidth: 1,
            borderColor: '#fff',
    },
    });