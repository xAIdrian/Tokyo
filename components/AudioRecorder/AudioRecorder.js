import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SIZES, COLORS, SHADOWS } from "../../constants/theme";
import { Feather } from '@expo/vector-icons';
import styles from './audiorecorder.style.js';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const AudioRecorder = ({ recordingConfirmed, moreOptionsClick }) => {
  const [audioPermission, setAudioPermission] = useState(null);
  
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [recording, setRecording] = useState(null);

  useEffect(() => {

    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
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

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {

      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        console.log("🚀 ~ file: AudioRecorder.js:66 ~ stopRecording ~ recordingUri:", recordingUri)

        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.caf`;

        // Move the recording to the new directory with the new file name
        const recordingPath = FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: recordingPath
        });
        recordingConfirmed(recordingPath);

        // This is for simply playing the sound back
        // const playbackObject = new Audio.Sound();
        // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
        // await playbackObject.playAsync();

        // resert our states to record again
        setRecording(null);
        setRecordingStatus('stopped');
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function handleRecordButtonPress() {
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
              backgroundColor: recording ? COLORS.secondary : COLORS.primary,
            }}
            onPress={ handleRecordButtonPress }
          >
            <Feather
              name="mic"
              size={ 24 }
              color={ recording ? COLORS.primary : COLORS.white }
            />
      </TouchableOpacity>
      <TouchableOpacity
            style={{
              width: '100%',
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={ moreOptionsClick }
          >
        <Text>
          More Options
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default AudioRecorder
