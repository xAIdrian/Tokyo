import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme.js'
import styles from './audioplayer.style.js'
import { Audio } from 'expo-av'
import images from '../../constants/images.js'

//TODO we pass in a uri or any other option that does not required using the actual phone memory
const AudioBubble = ({ playFileLocation, styleType }) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const currentPlabackObject = useRef(null)

    const effect = useCallback((isPlaying) => {
        console.log("🚀 ~ file: AudioPlayer.js:17 ~ useEffect ~ useEffect:", isPlaying)
        if (!isPlaying && currentPlabackObject.current == null) {
            setIsPlaying(true)
            currentPlabackObject.current = new Audio.Sound()
            
            currentPlabackObject.current.setOnPlaybackStatusUpdate((playbackStatus) => {
                if (playbackStatus.didJustFinish) {
                    setIsPlaying(false)
                    currentPlabackObject.current = null
                }
            })
            currentPlabackObject.current.loadAsync({ uri: playFileLocation }).then(() => {
                setIsPlaying(true)
                currentPlabackObject.current.playAsync()
            })
        } else {
            console.log("📡 ~ file: AudioPlayer.js:32 ~ effect ~ else:", isPlaying)
            setIsPlaying(false)
            currentPlabackObject.current = null
        }
    })

    return (
        <>
            <View style={
                styleType == "bubble" ? styles.bubble : styles.container
            }>
                <TouchableOpacity onPress={() => effect(isPlaying)}>
                    {isPlaying ? (
                        <FontAwesome
                            name="stop-circle"
                            size={32}
                            color={COLORS.primary}
                        />
                    ) : (
                        <FontAwesome
                            name="play-circle"
                            size={32}
                            color={COLORS.primary}
                        />
                    )}
                </TouchableOpacity>
                <Image
                    source={images.waveIcon}
                    style={{
                        width: 50,
                        marginLeft: 10,
                    }}
                />
                <Image
                    source={images.waveIcon}
                    style={{
                        width: 50,
                    }}
                />
                <Image
                    source={images.waveIcon}
                    style={{
                        width: 50,
                    }}
                />
            </View>
        </>
    )
}

export default AudioBubble
