/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
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
import AudioPlayer from '../AudioPlayer/AudioPlayer'

const AudioRecorder = ({
    recordingApproved,
    transcriptionComplete,
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

    const [audioReviewData, setAudioReviewData] = useState(null)

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
            setAudioReviewData(null)
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
            // onUploadError(error)
        }
    }

    async function stopRecording() {
        try {
            if (recordingStatus === 'recording') {
                console.log('Stopping Recording')
                setRecordingStatus('stopped')
                setRecording(false)
                await recording.stopAndUnloadAsync()
                return recording.getURI()
            }
        } catch (error) {
            console.error('Failed to stop recording', error)
        }
    }

    async function recordingCompleteCleanup(recordingUri) {
        try {
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
    
            setAudioReviewData({
                recordingUri: recordingUri,
                recordingPath: recordingPath,
            })
        } catch (error) {
            console.error('Failed to cleanup recording', error)
        }
    }

    const handleRecordPressIn = async () => {
        if (audioReviewData !== null) {
            // Send the recording to the server for transcription
            FileSystem.uploadAsync(
                `${Constants.expoConfig.extra.aipiUrl}/api/v3/writer/transcript`,
                audioReviewData.recordingPath,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-db-env': Constants.expoConfig.extra.aipiEnv,
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
                        transcriptionComplete({
                            transcript: transcript,
                        })
                    } else {
                        console.log('Error: ', response.message)
                        onUploadError(response.message)
                    }
                })
                .catch((error) => {
                    console.log("🚀 ~ file: AudioRecorder.js:164 ~ handleRecordPressIn ~ error:", error)
                    // onUploadError(error)
                })
            recordingApproved(audioReviewData)
        } else {
            setButtonBackgroundColor(COLORS.secondary)
            await startRecording()
        }
    }

    const handleRecordPressOut = async () => {
        if (audioReviewData !== null) {
            setAudioReviewData(null)
            return
        } else {
            setButtonBackgroundColor(COLORS.primary)
            const earlyStatus = await recording.getStatusAsync()
            if (earlyStatus.durationMillis < 2000) {
                await stopRecording()
                return
            }
            const recordingUri = await stopRecording()
            await recordingCompleteCleanup(recordingUri)
        }
    }

    return (
        <>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        padding: 8,
                        backgroundColor: COLORS.tertiaryWhite,
                        shadowColor: COLORS.black,
                        shadowOffset: { width: 0, height: -1 },
                        shadowOpacity: 0.25,
                    }}
                >
                    {
                        isCountingDown ? (
                            <CountdownProgressBar />
                        ) : audioReviewData === null ? (
                            <View
                                style={{
                                    flex: 1,
                                    padding: 8,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignContent: 'center',
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                }}>
                                    <Text style={{ size: 16, color: COLORS.primary }}>
                                        v{Constants.expoConfig.extra.version}
                                    </Text>
                                    <TouchableOpacity>
                                        <Feather
                                            name="more-vertical"
                                            size={24}
                                            color={COLORS.primary}
                                            onPress={moreOptionsClick}
                                        />
                                    </TouchableOpacity>
                                </View>
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
                                    <AudioPlayer
                                        playFileLocation={
                                            audioReviewData.recordingPath
                                        }
                                    />
                                    <Feather
                                        name="trash"
                                        size={20}
                                        color={COLORS.secondary}
                                        style={{
                                            alignSelf: 'center',
                                            paddingHorizontal: 8,
                                        }}
                                        onPress={() => {
                                            setAudioReviewData(null)
                                        }}
                                    />  
                                </View>
                            )
                    
                }
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
                            {
                                audioReviewData === null ? (
                                    <Feather
                                        name={recording ? 'mic-off' : 'mic'}
                                        size={31}
                                        color={
                                            recording
                                                ? COLORS.primary
                                                : COLORS.white
                                        }
                                    />
                                ) : (
                                    <Feather
                                        name={'send'}
                                        size={24}
                                        color={COLORS.white}
                                    />
                                )
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </>
    )
}

export default AudioRecorder
