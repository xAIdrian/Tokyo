/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SIZES, COLORS, FONTS } from '../constants'

const PageTitle = (props) => {
    return (
        <View style={styles.pageTitleContainer}>
            <TouchableOpacity
                onPress={props.onPress}
                style={{
                    marginRight: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={SIZES.padding * 3}
                    color={COLORS.black}
                />
                <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                    Home
                </Text>
            </TouchableOpacity>
            {props.title && (
                <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                    {props.title}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    pageTitleContainer: {
        margin: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default PageTitle
