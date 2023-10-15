import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, images } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import { sendMessageToServer } from '../hooks/useFetch'
import AudioRecorder from '../components/AudioRecorder/AudioRecorder'
import { useActionSheet } from '@expo/react-native-action-sheet';

const PersonalChat = ({ navigation }) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const [messages, setMessages] = useState([])

    //TODO: temporary until we can fetch messages from server
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hey there, it\'s great to see you. Are you ready to create some awesome content?',
                // createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: images.icon,
                },
            },
        ])
    }, [])

    const showOptions = useCallback(() => {
        const options = [
            'Redo Last Recording',
            'Skip This Question',
            'Remind Me Later',
            'Cancel'
        ];
        const cancelButtonIndex = 3;
      
        showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
            title: 'Choose an option',
            message: 'Select an option from below:',
            destructiveButtonIndex: 3, // Index of the destructive option (if needed)
            tintColor: 'red', // Color of the Cancel button text
          },
          (buttonIndex) => {
            // Handle the selected option
            if (buttonIndex === 0) {
              // Option 1 selected
              // Add your logic here
            } else if (buttonIndex === 1) {
              // Option 2 selected
              // Add your logic here
            }
          }
        );
      }, [showActionSheetWithOptions]);

    const onSend = useCallback(async (newMessage = []) => {
        let sendMessages = [];
        setMessages(previousMessages => {
            sendMessages = GiftedChat.append(previousMessages, newMessage);
            return sendMessages;
        });
        const responseResult = await sendMessageToServer(sendMessages, 'The Myth Buster');
        setMessages( previousMessages =>
            GiftedChat.append(previousMessages, responseResult[responseResult.length - 1]),
        )
    }, [setMessages])

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
                    left: {
                        backgroundColor: COLORS.tertiaryWhite,
                    },
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
                onSend={ messages => onSend(messages) }
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
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
            <AudioRecorder
                moreOptionsClick={ showOptions }
            />
        </SafeAreaView>
    )
}

export default PersonalChat
