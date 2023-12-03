import { useEffect, useState } from 'react'
import {
    Share,
    Alert,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import styles from './postcard.style.js'

const PostCard = (content) => {
    const [isEditing, setIsEditing] = useState(false)
    const [currentContent, setCurrentContent] = useState(content.content)

    const onEdit = () => {
        setIsEditing(!isEditing)
        if (isEditing) {
            // save content
          content.content = currentContent
        }
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: content.content,
            })
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
            Alert.alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            {
              isEditing ? (
                <View style={styles.editBar}>
                  <Text style={styles.title}>Edit Mode</Text>
                </View>
              ) : null
            }
            <View style={styles.infoContainer}>
                {isEditing ? (
                    <TextInput 
                      multiline={true}
                      onChangeText={ newVal=>{
                        setCurrentContent(newVal)
                      }}
                    >
                        <Text style={styles.subtitle}>{content.content}</Text>
                    </TextInput>
                ) : (
                    <Text style={styles.subtitle}>{content.content}</Text>
                )}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <TouchableOpacity 
                      onPress={ onEdit }
                      style={{
                        width: "25%",
                      }}
                    >
                        <Text style={styles.secondarySelector}>{
                          isEditing ? "Done" : "Edit"
                        }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={onShare}
                      style={{
                        width: "75%",
                        marginLeft: 4
                      }}
                    >
                        <Text style={styles.secondarySelector}>Post to Social</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PostCard
