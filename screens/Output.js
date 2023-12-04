/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, Text, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants/theme'
import PageTitle from '../components/PageTitle'
import PostCard from '../components/PostCard/PostCard'
import { sendContentForPosts } from '../hooks/contentHooks'

const Output = ({ route, navigation }) => {
    const { frameworkQuestions, frameworkAnswers } = route.params ?? {}

    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts([])
    }, [])

    useEffect(() => {
        if (route.params !== undefined) {
            sendContentForPosts(frameworkQuestions, frameworkAnswers).subscribe({
                next: (contentListSoFar) => {
                    console.log("🚀 ~ file: Output.js:23 ~ sendContentForPosts ~ contentListSoFar:", contentListSoFar)
                    if (contentListSoFar !== undefined && contentListSoFar.length > 0) {
                        setIsLoading(true)
                        setPosts(contentListSoFar)
                    }
                },
                complete: () => {
                    setIsLoading(false)
                },
            });
        } 
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <PageTitle
                onPress={() => {
                    Alert.alert(
                        'Are you sure?',
                        'You will lose all your content and will have to start over.',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Yes',
                                onPress: () => {
                                    setPosts([])
                                    navigation.navigate('BottomTabNavigation')
                                },
                            },
                        ],
                    )
                }}
                style={{
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                }}
            />
            <>
                {posts.length == 0 ? (
                    <View>
                        <Text
                            style={{
                                ...FONTS.body3,
                                textAlign: 'center',
                                marginTop: SIZES.body1,
                                marginHorizontal: SIZES.body1,
                            }}
                        >
                            We are creating your posts. 
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body3,
                                textAlign: 'center',
                                marginBottom: SIZES.body1,
                                marginHorizontal: SIZES.body1,
                            }}
                        >
                            Please don't leave us.
                        </Text>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <FlatList
                        contentContainerStyle={{
                            paddingBottom: SIZES.body3,
                        }}
                        ListHeaderComponent={
                            <Text style={{
                                ...FONTS.body3,
                                textAlign: 'center',
                                marginHorizontal: SIZES.body1,
                            }}>
                                We have created a bunch of content for you.
                            </Text>
                        }
                        ListFooterComponent={
                            isLoading && posts.length > 0 ? (
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: SIZES.body5,
                                }}>
                                    <ActivityIndicator />
                                    <Text style={{
                                        textAlign: 'center',
                                        marginHorizontal: SIZES.body1,
                                    }}>
                                        Please wait.  We are still creating more content.
                                    </Text>
                                </View>
                            ) : null
                        }
                        data={posts}
                        renderItem={(item) => <PostCard content={item.item} />}
                        style={{
                            paddingBottom: SIZES.body3,
                        }}
                        keyExtractor={(item) => item.length}
                    />
                )}
            </>
        </SafeAreaView>
    )
}

export default Output
