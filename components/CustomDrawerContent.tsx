import { deleteToken } from "@/utils/token";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image , View ,Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';


    export default function CustomDrawerContent(props: any){
        const router = useRouter();
        const { bottom } = useSafeAreaInsets();


        const hundelLogout = async() => {
            await deleteToken();
            router.replace('/LoginScreen')
        }


    return(
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} 
        scrollEnabled={false}
        contentContainerStyle={{backgroundColor: '#dde3fe',  paddingEnd: 0 , paddingStart:0 , paddingBottom: 0}}
        >
            <View style={{padding: 20,}}>
                <Image
                        source={require('@/assets/images/default-Photo.jpg')}
                        style={{width: 100 , height: 100 , alignSelf: 'center' , borderRadius: 100,}}
                    />
                <Text style={{
                    alignSelf:'center',
                    fontWeight:'500',
                    fontSize: 18,
                    paddingTop:10,
                    color: '#5363df'
                }}>Azghar loukmane</Text>
            </View>
            <View style={{backgroundColor: '#fff', padding:10}}>
                <DrawerItemList {...props} />
                <DrawerItem 
                label={'logout'} 
                onPress={hundelLogout} 
                labelStyle={{ color: '#e91e63' }}
                icon={({ color , size }) => (
                <Ionicons name="log-out-outline" color={color} size={size} style={{color: '#e91e63'}}/>
                )}/>
            </View>
        </DrawerContentScrollView>

        <View
        style={{
            borderTopColor:'#dde3fe',
            borderTopWidth:1,
            padding:20,
            paddingBottom:20 + bottom ,
        }}>
            <Text>Footer</Text>
        </View>
    </View>
    )
}