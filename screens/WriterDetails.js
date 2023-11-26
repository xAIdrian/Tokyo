
/*
* Oligarch Ventures, LLC.
* Version: 1.0.0
* Author: Adrian Mohnacs
* Copyright (c) 2023 Adrian Mohnacs
* All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
*/
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import { Alert } from 'react-native'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import styles from '../components/TinderCards/tindercards.style'
import { mapping } from '../constants/images'
import { fixNewLines } from '../utils/StringUtils.js'
import { Feather } from '@expo/vector-icons'

const WriterDetails = ({ route, navigation }) => {
    const { framework } = route.params ?? {}
    const [showButtons, setShowButtons] = useState(true)

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        if (contentHeight - (offsetY + layoutHeight) < 100) { 
          setShowButtons(false);
        } else {
          setShowButtons(true);
        }
    }

    useEffect(() => {
        if (route.params === undefined || framework === undefined) {
            Alert.alert('Something went wrong. Please go back')
        }
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView
              onScroll={handleScroll}
            >
                <View>
                    <Image source={mapping[framework.image]} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{framework.title}</Text>
                        <Text style={styles.description}>
                            {framework.description}
                        </Text>
                        <Text style={styles.subdescription}>
                            Expected time: {framework.time}
                        </Text>
                        <Text style={styles.subdescription}>
                            Expected pieces of content: {framework.num_pieces}
                        </Text>
                        <Text style={styles.subtitle}>
                            Example
                        </Text>
                        <Text style={styles.description}>
                          { fixNewLines(framework.example) }
                        </Text>
                        <Text style={styles.subtitle}>
                            Questions
                        </Text>
                        {
                          framework.questions.map((question) => (
                            <Text style={styles.description}>
                              { fixNewLines(question.text) }
                            </Text>
                          ))
                        }
                        <Text style={styles.description}>
                          {framework.questions.map}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            {
              showButtons && (
                <TouchableOpacity>
                  <View
                    style={{
                        width: 64,
                        height: 64,
                        padding: 8,
                        borderRadius: 50,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        margin: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.primary,
                        shadowColor: COLORS.black,
                        shadowOffset: { width: 2, height: 2 },  
                        shadowOpacity: 0.25,
                        shadowRadius: 2,
                        elevation: 6,
                    }}
                >
                    <Feather
                      name={ 'check' }
                      size={31}
                      color={ COLORS.white }
                    />
                  </View>
                </TouchableOpacity>
              )
            }
            {
              showButtons && (
                <TouchableOpacity>
                  <View
                    style={{
                        width: 64,
                        height: 64,
                        padding: 8,
                        borderRadius: 50,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        margin: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                        shadowColor: COLORS.black,
                        shadowOffset: { width: 2, height: 2 },  
                        shadowOpacity: 0.25,
                        shadowRadius: 2,
                        elevation: 6,
                    }}
                >
                    <Feather
                      name={ 'x' }
                      size={31}
                      color={ COLORS.primary }
                    />
                  </View>
                </TouchableOpacity>
              )
            }
        </SafeAreaView>
    )
}

export default WriterDetails
