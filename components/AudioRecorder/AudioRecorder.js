import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS } from '../../constants/theme'
import { Feather } from '@expo/vector-icons'
import styles from './audiorecorder.style.js'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import Constants from 'expo-constants'
import CountdownProgressBar from '../CountdownProgressBar/CountdownProgressBar'
import { TouchableWithoutFeedback } from 'react-native'

const AudioRecorder = ({
    recordingApproved,
    recordingConfirmed,
    heightUpdate,
    moreOptionsClick,
    onUploadError,
}) => {
    const [audioPermission, setAudioPermission] = useState(null)
    const [recordingStatus, setRecordingStatus] = useState('idle')
    const [recording, setRecording] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isCountingDown, setIsCountingDown] = useState(false)
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState(COLORS.primary)

    // const [stagedAudio, setStagedAudio] = useRef(null)

    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout
        heightUpdate(height)
    }

    useEffect(() => {
        // Simply get recording permission upon first render
        async function getPermission() {
            await Audio.requestPermissionsAsync()
                .then((permission) => {
                    setAudioPermission(permission.granted)
                })
                .catch((error) => {
                    console.log(error)
                    onUploadError(error)
                })
        }

        // Call function to get permission
        getPermission()
        // Cleanup upon first render
        return () => {
            if (recording) {
                stopRecording()
            }
        }
    }, [])

    useEffect(() => {
        setIsCountingDown(recording)
    }, [recording])

    // Whenever audioPermission or isLoading changes, this is called
    useEffect(() => {
        setIsDisabled(!audioPermission || isLoading)
        setButtonBackgroundColor(
            !audioPermission || isLoading ? COLORS.grey : COLORS.primary
        )
    }, [audioPermission, isLoading])

    async function startRecording() {
        try {
            // needed for IoS
            if (audioPermission) {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                })
            }
            console.log('Starting Recording')

            const newRecording = new Audio.Recording()
            await newRecording.prepareToRecordAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            )
            await newRecording.startAsync()
            setRecording(newRecording)
            setRecordingStatus('recording')
        } catch (error) {
            console.error('Failed to start recording', error)
            onUploadError(error)
        }
    }

    async function stopRecording() {
        try {
            if (recordingStatus === 'recording') {
                console.log('Stopping Recording')

                await recording.stopAndUnloadAsync()
                let recordingUri = recording.getURI()

                recordingUri = await recordingCompleteCleanup(recordingUri)

                // Send the recording to the server for transcription
                FileSystem.uploadAsync(
                    `${Constants.expoConfig.extra.aipiUrl}/api/v3/writer/transcript`,
                    recordingUri,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        fieldName: 'audio',
                        httpMethod: 'POST',
                        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    }
                )
                    .then(async (fullResponse) => {
                        const response = JSON.parse(fullResponse.body)

                        if (response.message === 'success') {
                            const transcript = response.result
                            console.log(
                                '🚀 ~ file: AudioRecorder.js:107 ~ ).then ~ transcript:',
                                transcript
                            )

                            recordingConfirmed({
                                transcript: transcript,
                            })
                        } else {
                            console.log('Error: ', response.message)
                            onUploadError(response.message)
                        }
                    })
                    .catch((error) => {
                        setIsLoading(false)
                        // onUploadError(error)
                    })
            }
        } catch (error) {
            console.error('Failed to stop recording', error)
        }
    }

    async function recordingCompleteCleanup(recordingUri) {
        // Move the recording to the new directory with the new file name
        const fileName = `recorded-${Date.now()}-${recordingUri
            .split('/')
            .pop()}`
        const recordingPath =
            FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + 'recordings/',
            { intermediates: true }
        )
        await FileSystem.moveAsync({
            from: recordingUri,
            to: recordingPath,
        })

        // resert our states to record again
        setRecording(null)
        setRecordingStatus('stopped')
        setIsCountingDown(false)

        recordingApproved({
            recordingUri: recordingUri,
            recordingPath: recordingPath,
        })
        return recordingPath
    }

    const handleRecordPressIn = async () => {
        setButtonBackgroundColor(COLORS.secondary)
        await startRecording()
    }

    const handleRecordPressOut = async () => {
        setRecordingStatus('stopped')
        setButtonBackgroundColor(COLORS.primary)
        const audioUri = await stopRecording(recording)
        if (audioUri) {
            console.log('Saved audio file to', savedUri)
        }
    }

    return (
        <>
            <View
                onLayout={handleLayout}
            >
                {/* <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        padding: 8,
                        backgroundColor: COLORS.tertiaryWhite,
                    }}
                >
                    
                </View> */}
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        minHeight: 64,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        padding: 8,
                        backgroundColor: COLORS.tertiaryWhite,
                        shadowColor: COLORS.black,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                    }}
                >
                    {isCountingDown ? (
                        <CountdownProgressBar />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                padding: 8,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}
                        >
                            <TouchableOpacity>
                                <Feather
                                    name="more-vertical"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: COLORS.primary,
                                    fontSize: 16,
                                    marginHorizontal: 24,
                                }}
                            >
                                Hold to record
                            </Text>
                        </View>
                    )}
                    <TouchableWithoutFeedback
                        onPressIn={handleRecordPressIn}
                        onPressOut={handleRecordPressOut}
                        disabled={isDisabled}
                    >
                        <View
                            style={{
                                width: 48,
                                padding: 8,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: buttonBackgroundColor,
                            }}
                        >
                            {isLoading ? (
                                <Text
                                    style={{
                                        height: 24,
                                        alignContent: 'center',
                                    }}
                                >
                                    Loading...
                                </Text>
                            ) : (
                                <Feather
                                    name={recording ? 'mic-off' : 'mic'}
                                    size={30}
                                    color={
                                        recording
                                            ? COLORS.primary
                                            : COLORS.white
                                    }
                                />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    )
}

export default AudioRecorder
