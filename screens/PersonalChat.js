import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'
import {
    initMessage,
    audioMessage,
    questionCount,
    questionsArray,
    answersArray,
} from '../hooks/chatHooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import AudioRecorder from '../components/AudioRecorder/AudioRecorder'
import AudioBubble from '../components/AudioBubble/AudioBubble'
import images from '../constants/images'
import generateUUID from '../utils/StringUtils'
import DetailDialog from '../components/DetailDialog/DetailDialog'
import { Slider } from '@react-native-assets/slider'
import CountdownProgressBar from '../components/CountdownProgressBar/CountdownProgressBar'

const PersonalChat = ({ navigation }) => {
    const { showActionSheetWithOptions } = useActionSheet()

    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentQuestionIndex, setCurrentQuestion] = useState(1)
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [popupContent, setPopupContent] = useState({})
    const [isCountingDown, setIsCountingDown] = useState(false)

    useEffect(() => {
        if (!isPopupVisible) {
            setIsPopupVisible(true)
        }
    }, [popupContent])

    useEffect(() => {
        setMessages(initMessage)
        answersArray.length = 0
        setCurrentQuestion(1)

        setPopupContent({
            title: "It's a pleasure to meet you.",
            content: `Hey there 👋, 
I am the Conception Buster.

I help you create engaging content that dissects,debunks and re-frames a common misconception/belief or thought in your audience, by asking you a few simple questions. 
            
There are 9 questions in total. You will have 40 seconds to answer each question.

Just tap the microphone button to start recording your answer.
            
Ready to go?`,
            cancelText: "",
            confirmText: "Start Interview",
            confirmAction : () => { setIsPopupVisible(false) }
        })
        // setIsPopupVisible(true)
    }, [])

    /**
     * Called after every time messages object is updated.
     * This is where we need to put the request to the server for chat messages.
     */
    // const starter = useEffect(() => {
    //     console.log("🚀 ~ file: PersonalChat.js:59 ~ onSend ~ newMessage:", messages)
    // }, [messages])

    const handleTimerStart = useCallback(() => {

    })

    const handleAudioRecording = useCallback((data) => {
        setIsCountingDown(false)
        onSend(audioMessage(data))
    })

    const showOptions = useCallback(() => {
        const options = [
            'Redo Last Recording',
            'Skip This Question',
            'Remind Me Later',
            'Speaker Notes',
            'Cancel',
        ]
        const cancelButtonIndex = 4

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
                    setPopupContent({
                        title: "Are you sure?",
                        content: "We'll get started writing your social media posts. This will take a little bit of time.\n\nAre you sure you want to continue?",
                        cancelText: "Go Back",
                        confirmText: "Get My Posts",
                        cancelAction : () => { setIsPopupVisible(false) },
                        confirmAction : () => { 
                            setIsPopupVisible(false)
                            navigation.navigate('Output') 
                        }
                    })
                } else if (buttonIndex === 1) {
                    // Option 2 selected
                }
            }
        )
    }, [showActionSheetWithOptions])

    const onQuickReply = useCallback((quickReply) => {
        switch (quickReply[0].value) {
            case 'more_info':
                setPopupContent({
                    title: "More Info",
                    content: questionsArray[currentQuestionIndex - 1].explanation,
                    cancelText: "",
                    confirmText: "Done",
                    confirmAction : () => { setIsPopupVisible(false) }
                })
                break
            case 'examples':
                setPopupContent({
                    title: "Example Answer",
                    content: questionsArray[currentQuestionIndex].example,
                    cancelText: "",
                    confirmText: "Done",
                    confirmAction : () => { setIsPopupVisible(false) }
                })
                break
            case 'edit':
                break
            case 'generate':
                setPopupContent({
                    title: "Are you sure?",
                    content: "We'll get started writing your social media posts. This will take a little bit of time.\n\nAre you sure you want to continue?",
                    cancelText: "Go Back",
                    confirmText: "Get My Posts",
                    cancelAction : () => { setIsPopupVisible(false) },
                    confirmAction : () => { 
                        setIsPopupVisible(false)
                        navigation.navigate('Output') 
                    }
                })
                break
            default:
                // Do something if the value doesn't match any of the cases
                break
        }
    })

    const onSend = useCallback(
        async (newMessage = []) => {
            console.log(
                '🚀 ~ file: PersonalChat.js:59 ~ onSend ~ newMessage:',
                newMessage
            )

            answersArray.push(newMessage[0].text)
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, newMessage)
            )

            if (currentQuestionIndex <= questionCount) {
                if (currentQuestionIndex === questionCount) {
                    setMessages((previousMessages) =>
                        GiftedChat.append(previousMessages, {
                            _id: generateUUID(),
                            text: "We have everything we need and we're ready to write your content\n\nAre you satisfied with your answers?",
                            user: {
                                _id: 2,
                                name: 'React Native',
                                avatar: images.icon,
                            },
                            quickReplies: {
                                type: 'radio', // or 'checkbox',
                                // keepIt: true,
                                values: [
                                    {
                                        title: '❌ Make edits',
                                        value: 'edit',
                                    },
                                    {
                                        title: '✅ Create content!',
                                        value: 'generate',
                                    },
                                ],
                            },
                        })
                    )
                    return
                }

                //still questions to ask, let's make them wait a little bit though
                setTimeout(() => {
                    setMessages((previousMessages) =>
                        GiftedChat.append(previousMessages, {
                            _id: generateUUID(),
                            text: questionsArray[currentQuestionIndex].text,
                            user: {
                                _id: 2,
                                name: 'React Native',
                                avatar: images.icon,
                            },
                            quickReplies: {
                                type: 'radio', // or 'checkbox',
                                // keepIt: true,
                                values: [
                                    {
                                        title: 'Example',
                                        value: 'examples',
                                    },
                                    {
                                        title: 'Learn More',
                                        value: 'more_info',
                                    },
                                ],
                            },
                        })
                    )
                    setCurrentQuestion(currentQuestionIndex + 1)
                }, 1000)
            }
        },
        [currentQuestionIndex, messages]
    )

    const renderInputToolbar = (props) => {
        return !isCountingDown ? 
            <InputToolbar {...props} 
                containerStyle={{ 
                    backgroundColor: COLORS.tertiaryWhite,
                    justifyContent: 'center',
                    height: 50, 
                }} /> 
            : <CountdownProgressBar />
    }

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
                {props.currentMessage.user._id === 2 ||
                props.currentMessage.audioFileLocation === undefined ? (
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
                ) : (
                    <AudioBubble
                        playFileLocation={
                            props.currentMessage.audioFileLocation
                        }
                    />
                )}
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
            <StatusBar style="light" backgroundColor={COLORS.white} />
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: COLORS.tertiaryWhite,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 8,
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
                            onPress={() =>
                                navigation.navigate('BottomTabNavigation')
                            }
                        >
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={24}
                                color={COLORS.black}
                            />
                        </TouchableOpacity>
                        <Text style={{ ...FONTS.h4, marginLeft: 8 }}>
                            The Conception Buster
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
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingBottom: 8,
                    }}
                >
                    <Slider
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        enabled={false}
                        value={(100 / questionCount) * currentQuestionIndex}
                        thumbTintColor={COLORS.primary}
                        style={{
                            width: '70%',
                        }}
                    />
                    <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                        Question {currentQuestionIndex} of {questionCount} 
                    </Text>
                </View>
            </View>

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                onQuickReply={(selected) => onQuickReply(selected)}
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
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                renderLoading={() => (
                    <ActivityIndicator size="large" color="#0000ff" />
                )}
            />
            
            <AudioRecorder
                isRecording={(isRecording) => setIsCountingDown(isRecording)}
                recordingConfirmed={handleAudioRecording}
                moreOptionsClick={showOptions}
                onUploadError={(error) => alert(error)}
                isParentLoading={isLoading}
            />

            <DetailDialog
                isVisible={ isPopupVisible }
                title= { popupContent.title }
                content= { popupContent.content }
                cancelText= { popupContent.cancelText }
                confirmText= { popupContent.confirmText }
                cancelAction= { popupContent.cancelAction }
                confirmAction= { popupContent.confirmAction }
            />
        </SafeAreaView>
    )
}

export default PersonalChat
