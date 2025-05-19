    // import { Stack } from 'expo-router';
    import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
    
    import CustomDrawerContent from '@/components/CustomDrawerContent';

    export default function Layout() {
        return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer 
            drawerContent={CustomDrawerContent}
            screenOptions={{
                drawerHideStatusBarOnOpen: true,
                drawerActiveBackgroundColor: '#5363df',
                drawerActiveTintColor: '#fff',
            }}>
                <Drawer.Screen
                name='PersonalInfoScreen'
                options={{
                    drawerLabel:'my account',
                    headerTitle: 'my account',
                    drawerIcon: ({size , color }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
                />

                <Drawer.Screen
                name='Planning'
                options={{
                    drawerLabel:'Planning',
                    headerTitle: 'Planning',
                    drawerIcon: ({size , color }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
                />

                <Drawer.Screen
                name='Tracking'
                options={{
                    drawerLabel:'Tracking',
                    headerTitle: 'Tracking',
                    drawerIcon: ({size , color }) => (
                        <Ionicons name="checkmark-done-outline" size={size} color={color} />
                    ),
                }}
                />

                <Drawer.Screen
                name='AddTrack'
                options={{
                    drawerLabel:'Scan QR Code',
                    headerTitle: 'Scan QR Code',
                    drawerIcon: ({size , color }) => (
                        <Ionicons name="camera-outline" size={size} color={color} />
                    ),
                }}
                />
            </Drawer>
                {/* <DrawerItem label='logout' onPress={handleLogout} /> */}
        </GestureHandlerRootView>)
    }
