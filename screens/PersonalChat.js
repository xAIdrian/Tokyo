import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import { sendOneShotToServer, initMessage, audioMessage, questionCount, questionsArray, answersArray } from '../hooks/chatHooks'
import { useActionSheet } from '@expo/react-native-action-sheet';
import AudioRecorder from '../components/AudioRecorder/AudioRecorder'
import AudioBubble from '../components/AudioBubble/AudioBubble'
import images from '../constants/images'
import generateUUID from '../utils/StringUtils'

const PersonalChat = ({ navigation }) => {
    const { showActionSheetWithOptions } = useActionSheet();

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestion] = useState(1);

    useEffect(async () => {
        setMessages(initMessage)
        answersArray.length = 0;
        setCurrentQuestion(1);
        
    }, [])

    const handleAudioRecording = useCallback((data) => { 
        onSend(audioMessage(data));
    });

    const showOptions = useCallback(() => {
        const options = [
            'Redo Last Recording',
            'Skip This Question',
            'Remind Me Later',
            'Speaker Notes',
            'Cancel'
        ];
        const cancelButtonIndex = 4;
      
        showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
            title: 'What would you like to do?',
            // message: 'Select an option from below:',
            destructiveButtonIndex: 3, // Index of the destructive option (if needed)
            tintColor: 'red', // Color of the Cancel button text
          },
          (buttonIndex) => {
            // Handle the selected option
            if (buttonIndex === 0) {
              // Option 1 selected
            } else if (buttonIndex === 1) {
              // Option 2 selected
            }
          }
        );
    }, [showActionSheetWithOptions]);

    /**
     * Called after every time messages object is updated.
     * This is where we need to put the request to the server for chat messages.
     */
    // const starter = useEffect(() => {
    //     console.log("🚀 ~ file: PersonalChat.js:59 ~ onSend ~ newMessage:", messages)
    // }, [messages])

    const onSend = useCallback(async (newMessage = []) => {
        console.log("🚀 ~ file: PersonalChat.js:59 ~ onSend ~ newMessage:", newMessage)

        answersArray.push(newMessage[0].text);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

        if (currentQuestionIndex <= questionCount) {
            
            if (currentQuestionIndex === questionCount) {
                setIsLoading(true);
                const content = await sendOneShotToServer();
                setIsLoading(false);
                if (content !== undefined && content !== '') {
                    setMessages(previousMessages => GiftedChat.append(previousMessages, {
                        _id: generateUUID(),
                        text: content,
                        user: {
                            _id: 2,
                            name: 'React Native',
                            avatar: images.icon,
                        }
                    }));
                } else {
                    console.log("🔥 ~ file: PersonalChat.js:59 ~ onSend ~ content:", content)
                }
                return;
            }

            //still questions to ask
            setMessages(previousMessages => GiftedChat.append(previousMessages, {
                _id: generateUUID(),
                text: questionsArray[currentQuestionIndex],
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: images.icon,
                }
            }));
            setCurrentQuestion(currentQuestionIndex + 1);
        } 
        // const responseResult = await sendMessageToServer(sendMessages, 'The Myth Buster');

        // if (responseResult !== undefined) {
        //     setMessages(previousMessages =>
        //         GiftedChat.append(previousMessages, {
        //             ...responseResult[responseResult.length - 1],
        //             quickReplies: responseResult[responseResult.length - 1].role === 'user' ? null : {
        //                 type: 'radio', // or 'checkbox',
        //                 // keepIt: true,
        //                 values: [
        //                   {
        //                     title: 'Examples',
        //                     value: 'examples',
        //                   },
        //                   {
        //                     title: 'Learn More',
        //                     value: 'more_info',
        //                   }
        //                 ],
        //               },
        //         }),
        //     )
        // } else {
        //     alert('There is an error')
        // }
    }, [currentQuestionIndex, messages]);

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
            <>
                {
                    props.currentMessage.user._id === 2 || props.currentMessage.audioFileLocation === undefined ? (
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
                    ): ( <AudioBubble playFileLocation={ props.currentMessage.audioFileLocation } /> )
                }
            </>
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
                textInputStyle={{
                    borderRadius: 22,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    marginRight: 6,
                    paddingHorizontal: 12,
                }}
                scrollToBottom
                renderBubble={ renderBubble }
                renderSend={renderSend} 
                renderLoading={() =>  <ActivityIndicator size="large" color="#0000ff" />}
            />

            <AudioRecorder
                recordingConfirmed={ handleAudioRecording }
                moreOptionsClick={ showOptions }
                onUploadError={(error) => alert(error)}
                isParentLoading={ isLoading }
            />
        </SafeAreaView>
    )
}

export default PersonalChat
