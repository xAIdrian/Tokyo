import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SIZES, COLORS, SHADOWS } from '../../../constants/theme'
import styles from './tilecard.style.js'
import { Feather } from '@expo/vector-icons'

const TileCard = ({ item }) => {
    return (
        <View>
            <TouchableOpacity
                style={ styles.container }
            >
          <Feather
            name={item.icon}
            color={COLORS.primary}
            size={ 64 }
          />
          </TouchableOpacity>
          <Text style={ styles.subtitle }>{item.title}</Text>
        </View>
    )
}

export default TileCard
