import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
    Walkthrough,
    Verification,
    ProfileAccount,
    Login,
    PersonalChat,
    Output,
    WriterDetails
} from './screens'
import { useCallback } from 'react'
import BottomTabNavigation from './navigation/BottomTabNavigation'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
    // load fonts
    const [fontsLoaded] = useFonts({
        black: require('./assets/fonts/Mulish-Black.ttf'),
        regular: require('./assets/fonts/Mulish-Regular.ttf'),
        bold: require('./assets/fonts/Mulish-Bold.ttf'),
        medium: require('./assets/fonts/Mulish-Medium.ttf'),
        mediumItalic: require('./assets/fonts/Mulish-MediumItalic.ttf'),
        semiBold: require('./assets/fonts/Mulish-SemiBold.ttf'),
        semiBoldItalic: require('./assets/fonts/Mulish-SemiBoldItalic.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <SafeAreaProvider onLayout={onLayoutRootView}>
            <ActionSheetProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName="BottomTabNavigation"
                    >
                        <Stack.Screen
                            name="Walkthrough"
                            component={Walkthrough}
                        />
                        <Stack.Screen
                            name="Verification"
                            component={Verification}
                        />
                        <Stack.Screen
                            name="ProfileAccount"
                            component={ProfileAccount}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            name="BottomTabNavigation"
                            component={BottomTabNavigation}
                        />
                        <Stack.Screen
                            name="PersonalChat"
                            component={PersonalChat}
                        />
                        <Stack.Screen
                            name="Output"
                            component={Output}
                        />
                        <Stack.Screen
                            name="WriterDetails"
                            component={WriterDetails}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ActionSheetProvider>
        </SafeAreaProvider>
    )
}
