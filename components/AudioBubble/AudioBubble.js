import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SIZES, COLORS, SHADOWS } from "../../constants/theme";
import styles from './audiobubble.style.js';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import images from '../../constants/images';

//TODO we pass in a uri or any other option that does not required using the actual phone memory
const AudioBubble = ({ playFileLocation }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = useCallback(async () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // This is for simply playing the sound back
      const playbackObject = new Audio.Sound();
      // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
      await playbackObject.loadAsync({ uri: playFileLocation });
      await playbackObject.playAsync();
      playbackObject.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } else {
      setIsPlaying(false);
    }
  }, []);

  return (
    <>
      <View style={styles.bubble}>
        <TouchableOpacity
          onPress={ playSound }
        >
          {
            isPlaying ?
              <FontAwesome
                name="stop-circle"
                size={32}
                color={COLORS.white}
              /> :
              <FontAwesome
                name="play-circle"
                size={32}
                color={COLORS.white}
              />
          }
        </TouchableOpacity>
        <Image
            source={images.waveIcon}
            style={{
                width: 50,
                height: 30,
                marginLeft: 10,
            }}
        />
        <Image
            source={images.waveIcon}
            style={{
                width: 50,
                height: 30,
            }}
        />
    </View> 
    </>
  );
}

export default AudioBubble
