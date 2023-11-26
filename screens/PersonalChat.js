import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
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
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        if (!isPopupVisible && popupContent.title !== undefined) {
            setIsPopupVisible(true)
        }
    }, [popupContent])

    useEffect(() => {
        fetchFrameworkQuestions()
    }, [route])

    const fetchFrameworkQuestions = () => {
        if (frameworkQuestions !== undefined && frameworkQuestions.length > 0) {
            setQuestions(frameworkQuestions)
            console.log("🚀 ~ file: PersonalChat.js:56 ~ fetchFrameworkQuestions ~ questions:", questions)
            setMessages(buildInitMessage(frameworkQuestions[0]))
            setAnswers([])
            setCurrentQuestion(1)
        } else {
            setIsLoading(true)
            getFrameworkQuestions().then((loadFrameworks) => {
                console.log("🚀 ~ file: PersonalChat.js:62 ~ getFrameworkQuestions ~ loadFrameworks:", loadFrameworks)
                setIsLoading(false)
                const currentFramework = loadFrameworks.reverse()[0]
                setQuestions(currentFramework.questions)
                setMessages(buildInitMessage(currentFramework.questions[0]))
                setAnswers([])
                setCurrentQuestion(1)
            }).catch((error) => {
                alert(error)
            }) 
        }
    }

    const resetApp = () => {
        setQuestions([])
        setMessages([])
        setAnswers([])
        setCurrentQuestion(1)
        setSliderValue(0)
        setShowTextInputToolbar(false)
        setTextInputToolbarHeight(0)
        //getting the new data
        fetchFrameworkQuestions()
    }

    const audioRecordingApproved = useCallback((data) => {
        onSend(processAudioMessage(data))
    })

    const transcriptionComplete = useCallback((data) => {
        answers.push(data.transcript)
    })

    const showOptions = useCallback(() => {
        const options = [
            'Switch to keyboard mode for this session',
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
                    setTextInputToolbarHeight(36)
                    setShowTextInputToolbar(!showTextInputToolbar)
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
                if (questions.length > answers.length) {
                    alert("We're still loading your voice note. Please wait a few more seconds then try again.")
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
                                        title: '❌ Record more',
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
                                        title: 'More Info',
                                        value: 'more_info',
                                    },
                                ],
                            },
                        })
                    )
                    setCurrentQuestion(currentQuestionIndex + 1)
                    setSliderValue((100 / questions.length) * currentQuestionIndex)
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
            : null
            
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
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.25,
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
                            <Text 
                                style={{ ...FONTS.body4, color: COLORS.primary }}
                                onPress={() => resetApp()}    
                            >
                                Reset
                            </Text>
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

            <Modal
                transparent={true}
                visible={isLoading}
                onRequestClose={() => setIsLoading(false)}
                >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default PersonalChat
