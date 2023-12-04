/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import React from 'react'
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'
import { SIZES, COLORS, SHADOWS } from '../../constants/theme'
import styles from './tilecard.style.js'
import { Feather } from '@expo/vector-icons'

const TileCard = ({ item, onHandlePress, locked = false }) => {
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onHandlePress}>
                {locked ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            borderRadius: SIZES.body3,
                        }}
                    >
                      <Feather name="lock" color={COLORS.white} size={64} />
                    </View>
                ) : 
                  <Feather name={item.icon} color={COLORS.primary} size={64} />
                }
            </TouchableOpacity>
            <Text style={styles.subtitle}>{item.title}</Text>
        </View>
    )
}

export default TileCard
