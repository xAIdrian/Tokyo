import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'
import {
    processAudioMessage,
    buildInitMessage
} from '../hooks/chatHooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import AudioRecorder from '../components/AudioRecorder/AudioRecorder'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'
import images from '../constants/images'
import generateUUID from '../utils/StringUtils'
import DetailDialog from '../components/DetailDialog/DetailDialog'
import { Slider } from '@react-native-assets/slider'
import CountdownProgressBar from '../components/CountdownProgressBar/CountdownProgressBar'
import { getFrameworkQuestions } from '../hooks/frameworkHooks'

const PersonalChat = ({ route, navigation }) => {
    const { frameworkQuestions } = route.params ? route.params : { frameworkQuestions: []}

    const { showActionSheetWithOptions } = useActionSheet()
    const [showTextInputToolbar, setShowTextInputToolbar] = useState(false)
    const [textInputToolbarHeight, setTextInputToolbarHeight] = useState(0)

    const [messages, setMessages] = useState([])
    const [sliderValue, setSliderValue] = useState(0)

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [currentQuestionIndex, setCurrentQuestion] = useState(1)
    
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [popupContent, setPopupContent] = useState({})
    
    useEffect(() => {
        if (!isPopupVisible && popupContent.title !== undefined) {
            setIsPopupVisible(true)
        }
    }, [popupContent])

    useEffect(() => {
        if (route.params !== undefined) {
            setQuestions(frameworkQuestions)
            setMessages(buildInitMessage(questions[0]))
            setAnswers([])
            setCurrentQuestion(1)
        } else {
            getFrameworkQuestions().then((loadFrameworks) => {
                const currentFramework = loadFrameworks.reverse()[0]
                setQuestions(currentFramework.questions)
                setMessages(buildInitMessage(currentFramework.questions[0]))
                setAnswers([])
                setCurrentQuestion(1)
            }).catch((error) => {
                alert(error)
            }) 
        }
    }, [route])

    const audioRecordingApproved = useCallback((data) => {
        onSend(processAudioMessage(data))
    })

    const transcriptionComplete = useCallback((data) => {
        answers.push(data.transcript)
    })

    const showOptions = useCallback(() => {
        const options = [
            'Show text entry',
            'Cancel',
        ]
        const cancelButtonIndex = 1

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                tintColor: 'red', 
            },
            (buttonIndex) => {
                // Handle the selected option
                if (buttonIndex === 0) {
                    setShowTextInputToolbar(!setShowTextInputToolbar)
                } 
            }
        )
    }, [showActionSheetWithOptions])

    const onQuickReply = useCallback((quickReply) => {
        switch (quickReply[0].value) {
            case 'more_info':
                setPopupContent({
                    title: "More Info",
                    content: questions[currentQuestionIndex - 1].info,
                    cancelText: "",
                    confirmText: "Done",
                    confirmAction : () => { setIsPopupVisible(false) }
                })
                break
            case 'examples':
                setPopupContent({
                    title: "Example Answer",
                    content: questions[currentQuestionIndex].example,
                    cancelText: "",
                    confirmText: "Done",
                    confirmAction : () => { setIsPopupVisible(false) }
                })
                break
            case 'edit':
                break
            case 'generate':
                if (questions.length !== answers.length) {
                    alert("Please wait until we load all of your content before clicking to generate")
                } else {
                    navigation.navigate('Output', {
                        frameworkQuestions: questions,
                        frameworkAnswers: answers
                    }) 
                }
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

            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, newMessage)
            )

            if (currentQuestionIndex <= questions.length) {
                if (currentQuestionIndex === questions.length) {
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
                            text: questions[currentQuestionIndex].text,
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
                    setSliderValue((100 / questions.length) * currentQuestionIndex)
                }, 500)
            }
        },
        [currentQuestionIndex, messages]
    )

    const renderInputToolbar = (props) => {
        return showTextInputToolbar ? 
            <InputToolbar {...props} 
                containerStyle={{ 
                    backgroundColor: COLORS.tertiaryWhite,
                    justifyContent: 'center',
                }} /> 
            : setTextInputToolbarHeight(0)
            
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
                    <AudioPlayer 
                        playFileLocation={
                            props.currentMessage.audioFileLocation
                        }
                        styleType="bubble"
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
                            
                            {/* <Feather
                                name="more-vertical"
                                size={24}
                                color={COLORS.primary}
                            /> */}
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
                        value={sliderValue}
                        thumbTintColor={COLORS.primary}
                        style={{
                            width: '70%',
                        }}
                    />
                    <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                        Question {currentQuestionIndex} of {questions.length} 
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
                minInputToolbarHeight={textInputToolbarHeight}
                renderInputToolbar={renderInputToolbar}
                renderLoading={() => (
                    <ActivityIndicator size="large" color="#0000ff" />
                )}
            />
            {
                !showTextInputToolbar ?
                    <AudioRecorder
                        recordingApproved={audioRecordingApproved}
                        transcriptionComplete={transcriptionComplete}
                        moreOptionsClick={showOptions}
                        onUploadError={(error) => alert(error)}
                    /> : null
            }

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
