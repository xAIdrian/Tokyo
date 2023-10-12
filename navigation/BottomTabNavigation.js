import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, FONTS } from '../constants'
import { Chats, Interviews, More, Home, WriterFinder } from '../screens'
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: COLORS.white,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 6,
                    height: 80,
                    paddingBottom: 10
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {focused ? (
                                    <>
                                        <Feather
                                            name="home"
                                            size={24}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.secondary,
                                            }}
                                        >
                                            Home
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Feather
                                            name="home"
                                            size={24}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.primary,
                                            }}
                                        >
                                            Home
                                        </Text>
                                    </>
                                )}
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Writers"
                component={WriterFinder}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {focused ? (
                                    <>
                                        <Feather
                                            name="pen-tool"
                                            size={24}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.secondary,
                                            }}
                                        >
                                            Writers
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Feather
                                            name="pen-tool"
                                            size={24}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.primary,
                                            }}
                                        >
                                            Writers
                                        </Text>
                                    </>
                                    // <Ionicons
                                    //     name="chatbubble-outline"
                                    //     size={24}
                                    //     color={COLORS.black}
                                    // />
                                )}
                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                name="History"
                component={Chats}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {focused ? (
                                    <>
                                        <Feather
                                            name="message-circle"
                                            size={24}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.secondary,
                                            }}
                                        >
                                            History
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Feather
                                            name="message-circle"
                                            size={24}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.primary,
                                            }}
                                        >
                                            History
                                        </Text>
                                    </>
                                )}
                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                name="More"
                component={More}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {focused ? (
                                    <>
                                        <Feather
                                            name="user"
                                            size={24}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.secondary,
                                            }}
                                        >
                                            You
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Feather
                                            name="user"
                                            size={24}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.primary,
                                            }}
                                        >
                                            You
                                        </Text>
                                    </>
                                )}
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
