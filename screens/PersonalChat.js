import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import useFetch from '../hooks/useFetch'
import axios from 'axios'

const PersonalChat = ({ navigation }) => {
    const [messages, setMessages] = useState([])

    const { data, isLoading, error, refetch } = useCallback(() => {
        useFetch(
            'writer',
            {
                messages: messages?.map((message) => {
                    return {
                        role: message.user._id === 1 ? 'user' : 'assistant',
                        content: message.text,
                    }
                }),
                framework: 'The Myth Buster'
            }
        )
    });

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hey there, it\'s great to see you. Are you ready to create some awesome content?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback(async (messages = []) => {
        setMessages(async (previousMessages) => {
            const history = [
                ...previousMessages,
                ...messages,
            ]
            // console.log("🚀 ~ file: PersonalChat.js:47 ~ onSend ~ previousMessages:", previousMessages)
            // const url = 'http://localhost:3000/api/v3';
            // const options = {
            //     method: 'POST',
            //     // headers: {
            //     //   'X-RapidAPI-Key': rapidApiKey,
            //     //   'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            //     // },
            //     url: `http://localhost:3000/api/v3/writer`,
            //     data: {
            //         messages: history?.map((message) => {
            //             console.log("🚀 ~ file: PersonalChat.js:62 ~ messages:previousMessages.push ~ message:", message)
            //             return {
            //                 role: message.user._id === 1 ? 'user' : 'assistant',
            //                 content: message.text,
            //             }
            //         }),
            //         framework: 'The Myth Buster'
            //     },
            //   };
            // const response = await axios.request(options);
            return GiftedChat.append(previousMessages, messages)
        });
    }, [])

    // change button of send
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View
                    style={{
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        borderRadius: 18,
                        backgroundColor: COLORS.primary,
                        marginRight: 5,
                        marginBottom: 5,
                    }}
                >
                    <FontAwesome name="send" size={12} color={COLORS.white} />
                </View>
            </Send>
        )
    }

    // customize sender messages
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.primary,
                    },
                }}
                textStyle={{
                    right: {
                        color: COLORS.white,
                    },
                }}
            />
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
            <StatusBar style="light" backgroundColor={COLORS.white} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 22,
                    backgroundColor: COLORS.tertiaryWhite,
                    height: 60,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BottomTabNavigation')}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h4, marginLeft: 8 }}>
                        The Myth Buster
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => console.log('search')}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <MaterialIcons
                            name="search"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('Menu')}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <MaterialIcons
                            name="menu"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                textInputStyle={{
                    borderRadius: 22,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    marginRight: 6,
                    paddingHorizontal: 12,
                }}
            />
        </SafeAreaView>
    )
}

export default PersonalChat
