/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'
import {  processAudioMessage } from '../hooks/chatHooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import AudioRecorder from '../components/AudioRecorder/AudioRecorder'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'
import images from '../constants/images'
import generateUUID from '../utils/StringUtils.js'
import DetailDialog from '../components/DetailDialog/DetailDialog'
import { Slider } from '@react-native-assets/slider'
import { fixNewLines } from '../utils/StringUtils.js'
import Constants from 'expo-constants'

const PersonalChat = ({ route, navigation }) => {
    const { framework } = route.params ? route.params : {}

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

    const buildInitMessage = (question) => [
        {
            _id: 1,
            text: fixNewLines(question?.text ?? ''),
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
        },
    ]
    
    useEffect(() => {
        if (!isPopupVisible && popupContent.title !== undefined) {
            setIsPopupVisible(true)
        }
    }, [popupContent])

    useEffect(() => {
        fetchFrameworkQuestions()
    }, [route])

    const fetchFrameworkQuestions = () => {
        if (framework.questions !== undefined && framework.questions.length > 0) {
            setQuestions(framework.questions)
            setMessages(buildInitMessage(framework.questions[0]))
            setAnswers([])
            setCurrentQuestion(1)
        } else {
            alert("We weren't able to load your questions. Please close the app & try again.")
        }
    }

    const resetApp = () => {
        if (Constants.expoConfig.extra.aipiEnv === "dev") {
            navigation.navigate('Output', {
                frameworkQuestions: [],
                frameworkAnswers: [
                    "Entrepreneurs like it if they have those things, if they have the ability to lead other people, sell just influence. They have some big motivator, they can control themselves long enough to keep on going during that period of time, and they are doing the right things because they know the inputs and outputs to be successful to create their the thing that they want. Becomes a very difficult person to beat. On that first point then sales, one of the things I read in some of your work is this idea that if everybody just went and spent two years doing door-to-door sales then oh my God why is that important why do you think Georgia sales is a key thing. I think it's just for what for broader definitions for the audience ",
                    "I think it's just high volume transactional sales so whether that's you doing door-to-door are you cold calling, or you work in the front desk at a gym where you do 20 consoles a day like just having a high volume because in order to learn a skill you want to have as much exposure as you can to repeat the action and then you want quick feedback loops so that you can learn what you did wrong. So the perfect scenario would be Mentor mentee repeated exposure fix this try again fix this try again and in sales if you can survive that long then you are good enough that you will have gotten enough feedback like for most people if they can weather the first three months of sales then they'll usually be fine and so for the people who are coming up I always tell them like ",
                    "go Shadow the best guy and do twice the volume he's doing because you're not as good as him so like do twice the volume that they're doing work all of the hours and you will get better faster because you're doing you have to suck for X period of time and so if you can condense how how long that takes you in terms of calendar days not hours you can get there faster but I think that it's important because when you have to learn how to get rejected and still keep going and I think that's a very valuable skill and then two there's lots of like little things that you learn in just interpersonal communication that allow you that you can use with teammates later you can use in marketing because a lot of the best marketers started as salespeople and marketing is just sales one to many at least as as I understand it. And so having that kind of repetition just develops a deep understanding of human psychology I think. And I think it's important for if you want to get people to give you money for the thing that you have. Having that as a base skill comes in handy. ",
                    "I think a lot of people aren't orientated towards developing skills I think they're orientated to Lifestyle to what I can post on Instagram to call whatever's cool. But this idea of developing skills requires this thing that's kind of absent in modern culture which is patience and a lot like you said rejection who wants that you know it wasn't there was no glamor in what you said yeah. It's funny because a lot of us want traits right we want to be patient we want to be humble we want to be you know long-suffering whatever words you want to use. But in order to if I would say hey how would you create if you had to create a human what would you put them through to make them tough. It probably wouldn't be a really chill life yeah what would you put them through to make them patient well you probably wouldn't give them things immediately and so it's like we want these trades but each of the traits has a price tag attached to it it's just like do you want to pay the price tag to get the thing and ",
                    "I think if if people reframe the the period of life that they're going through as the price that they're paying out of their wallet but their wallet is their time it's the seconds of life that they're trading for it then I think more people will be willing to make the trade because at least when I look at myself like when I'm 80 something years old and I'm looking back at my life I want to have these traits but in order to have those traits I know I have to go through these things and I think for me that's given me a lot of comfort in hard times. ",
                    "One of the things that kind of adjacent to that which causes patience is the belief that you are at some point gonna get there so like you know it's all well and good you saying to me you do this for five years Stephen you'll build the skill but I go well listen if I want to be a millionaire and I have a low self belief I'm gonna have low conviction so I'm not even going to take the BET yeah so how does one build that's self-belief self belief is such an interesting thing because it feels like this real it's clear to some degree that you had it in that moment of turmoil it also the reason I say to some degree is because it didn't seem like you had a plan B anyway."                ]
                })
        } else {
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

    }

    const audioRecordingApproved = useCallback((data) => {
        console.log(questions)
        console.log(answers)
        if (currentQuestionIndex >= questions.length) {
            setIsLoading(true)
        }
        onSend(processAudioMessage(data))
    })

    const transcriptionComplete = useCallback((data) => {
        console.log("AUDIO RECORDING APPROVED")
        console.log(questions)
        console.log(answers)
        if (currentQuestionIndex >= questions.length) {
            setIsLoading(false)
        }
        answers.push(data.transcript)
    })

    const showOptions = useCallback(() => {
        const options = [
            'Switch to keyboard mode for session',
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
                    title: "Example",
                    content: fixNewLines(questions[currentQuestionIndex - 1].example),
                    cancelText: "",
                    confirmText: "Done",
                    confirmAction : () => { setIsPopupVisible(false) }
                })
                break
            case 'edit':
                break
            case 'generate':
                navigation.navigate('Output', {
                    frameworkQuestions: questions,
                    frameworkAnswers: answers
                })
                break
            default:
                // Do something if the value doesn't match any of the cases
                break
        }
    })

    const onSend = useCallback(async (newMessage = []) => {
            console.log("🚀 ~ file: PersonalChat.js:163 ~ onSend ~ newMessage:", newMessage[0])
            if (newMessage.length > 0 && newMessage[0].text !== undefined) {
                answers.push(newMessage[0].text)
            }

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
                            text: fixNewLines(questions[currentQuestionIndex].text),
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
                            { framework.title }
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
                                {Constants.expoConfig.extra.aipiEnv === "dev" ? "Send Test" : "Reset"}
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
