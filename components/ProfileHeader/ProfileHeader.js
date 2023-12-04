/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import React from 'react'
import { View, Text, Image } from 'react-native'
import images from '../../constants/images'
import styles from './profileheader.style.js'

const ProfileHeader = () => {

    const handleChange = (value) => {
        console.log(value)
    }

    return (
        <View style={styles.container}>
            <Image
                source={images.user8}
                resizeMode="contain"
                style={{
                    alignSelf: 'center',
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                }}
            />
            <Text style={styles.title} numberOfLines={1}>
                Mrs Experto Coachperson
            </Text>
            <View style={styles.infoContainer}>
                <Text style={styles.subtitle} numberOfLines={1}>
                    Helping bring their voice to the world.
                </Text>
            </View>
        </View>
    )
}

export default ProfileHeader;
