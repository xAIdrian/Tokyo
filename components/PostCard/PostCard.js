import React from 'react'
import { Share, Alert, View, Text, TouchableOpacity, Image } from 'react-native'
import images from '../../constants/images'
import styles from './postcard.style.js'

const PostCard = (content) => {
    const onShare = async () => {
        try {
          const result = await Share.share({
            message: content.content,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.subtitle}>
                    { content.content  }
                </Text>
                <TouchableOpacity
                    onPress={ onShare }
                >
                    <Text style={styles.selecter}>
                        Post to Social
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostCard;
