import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import images from '../../constants/images'
import { SIZES, COLORS, SHADOWS } from '../../constants/theme'
import styles from './postcard.style.js'

const PostCard = () => {
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
                    Helping people bring their voice to the world in a way that
                    is authentic and impactful.
                </Text>
            </View>
        </View>
    )
}

export default PostCard;
