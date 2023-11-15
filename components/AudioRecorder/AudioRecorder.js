import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from "../../constants/theme";
import { Feather } from '@expo/vector-icons';
import styles from './audiorecorder.style.js';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

const AudioRecorder = ({
  isRecording,
  recordingComplete,
  recordingConfirmed,
  moreOptionsClick,
  onUploadError,
  isParentLoading
}) => {
  const [audioPermission, setAudioPermission] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [recording, setRecording] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(COLORS.primary);

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
        onUploadError(error);
      });
    }

    // Call function to get permission
    getPermission()
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  useEffect(() => {
    isRecording(recording)
  }, [recording]);

  // Whenever audioPermission or isLoading changes, this is called
  useEffect(() => {
    setIsDisabled(!audioPermission || isLoading || isParentLoading);
    setButtonBackgroundColor(!audioPermission || isLoading || isParentLoading ? COLORS.grey : COLORS.primary);
  }, [audioPermission, isLoading]);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }
      console.log('Starting Recording')

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');

    } catch (error) {
      console.error('Failed to start recording', error);
      onUploadError(error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        
        await recording.stopAndUnloadAsync();
        let recordingUri = recording.getURI();

        recordingUri = await recordingCompleteCleanup(recordingUri);

        // Send the recording to the server for transcription
        FileSystem.uploadAsync(
          `${Constants.expoConfig.extra.aipiUrl}/api/v3/writer/transcript`,
          recordingUri,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            fieldName: 'audio',
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          }
        ).then(async (fullResponse) => {  
          const response = JSON.parse(fullResponse.body);
          
          if (response.message === 'success') {
            const transcript = response.result;
            console.log("🚀 ~ file: AudioRecorder.js:107 ~ ).then ~ transcript:", transcript)

            recordingConfirmed({
              transcript: transcript
            });
          } else {
            console.log('Error: ', response.message);
            onUploadError(response.message);
          }
        }).catch((error) => {
          setIsLoading(false);
          onUploadError(error);
        })
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function recordingCompleteCleanup(recordingUri) {
    // Move the recording to the new directory with the new file name
    const fileName = `recorded-${Date.now()}-${recordingUri.split('/').pop()}`;
    const recordingPath = FileSystem.documentDirectory + 'recordings/' + `${fileName}`
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
    await FileSystem.moveAsync({
      from: recordingUri,
      to: recordingPath
    });

    // resert our states to record again
    setRecording(null);
    setRecordingStatus('stopped');

    recordingComplete({
      recordingUri: recordingUri,
      recordingPath: recordingPath,   
    });
    return recordingPath;
  }

  async function handleRecordButtonPress() {
    // Your logic here to update the background color
    setButtonBackgroundColor(recording ? COLORS.primary : COLORS.secondary)

    // Functionality for managing the recording
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', savedUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <>
      <TouchableOpacity
            style={{
              width: '100%',
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isParentLoading ? COLORS.grey : buttonBackgroundColor,
            }}
        onPress={handleRecordButtonPress}
        disabled={ isDisabled }
      >
        {
          isLoading || isParentLoading ? (
              <Text style={{
                height: 24,
                alignContent: 'center',
              }}>
                Loading...
              </Text>
          ) : (
            <Feather
              name={ recording ? "mic-off" : "mic" }
              size={ 24 }
              color={ recording ? COLORS.primary : COLORS.white }
            />
          )
        }
      </TouchableOpacity>
      <TouchableOpacity
            style={{
              width: '100%',
              padding: 8,
              alignItems: 'center',
          justifyContent: 'center',
              color: COLORS.secondary,
            }}
            onPress={ moreOptionsClick }
            disabled={ isDisabled }
          >
        <Text>
          More Options
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default AudioRecorder
