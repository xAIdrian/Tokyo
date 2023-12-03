import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, FONTS } from '../constants'
import { More, Home, WriterFinder } from '../screens'
import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
const ICON_SIZE = 16

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: COLORS.tertiaryWhite,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    padding: 0,
                    margin: 0,
                    elevation: 6,
                },
            }}
        >
            <Tab.Screen
                name="WriterFinder"
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
                                            size={ICON_SIZE}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
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
                                            size={ICON_SIZE}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                            }}
                                        >
                                            Writers
                                        </Text>
                                    </>
                                )}
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Home"
                component={ Home }
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
                                            size={ICON_SIZE}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
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
                                            size={ICON_SIZE}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
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
                name="Zoom"
                component={ Home }
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
                                            size={ICON_SIZE}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
                                                color: COLORS.secondary,
                                            }}
                                        >
                                            Zoom
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Feather
                                            name="message-circle"
                                            size={ICON_SIZE}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                            }}
                                        >
                                            Zoom
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
                                            size={ICON_SIZE}
                                            color={COLORS.secondary}
                                        />
                                        <Text
                                            style={{
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
                                            size={ICON_SIZE}
                                            color={COLORS.primary}
                                        />
                                        <Text
                                            style={{
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
