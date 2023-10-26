import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import images from '../../constants/images'
import styles from './postcard.style.js'

const PostCard = (name, content) => {
    const handleChange = (value) => {
        console.log(value)
    }

    return (
        <View style={styles.container}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <Image
                    source={images.user8}
                    resizeMode="contain"
                    style={{
                        height: 32,
                        width: 32,
                        borderRadius: 25,
                    }}
                />
                <Text style={styles.title} numberOfLines={1}>
                    {{ name }}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.subtitle}>
                    {{ content }}
                </Text>
            </View>
        </View>
    )
}

export default PostCard;
