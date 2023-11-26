import { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import PageTitle from '../components/PageTitle'
import PostCard from '../components/PostCard/PostCard'
import { sendContentForPosts, contentPosts } from '../hooks/contentHooks'

const Output = ({ route, navigation }) => {
    const { frameworkQuestions, frameworkAnswers } = route.params ?? {}

    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts([])
    }, [])

    useEffect(() => {
        console.log("🚀 ~ file: Output.js:21 ~ useEffect ~ useEffect:", route.params)
        console.log("🚀 ~ file: Output.js:22 ~ useEffect ~ console:", contentPosts)
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
        } else if (contentPosts.length > 0) {
            setPosts(contentPosts)
        }
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <PageTitle
                onPress={() => navigation.navigate('BottomTabNavigation')}
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
                    <ScrollView
                        style={{
                            flex: 1,
                            paddingTop: SIZES.body3,
                        }}
                    >
                        <Text style={{
                            ...FONTS.body3,
                            textAlign: 'center',
                            marginHorizontal: SIZES.body1,
                        }}>
                            We have created a bunch of content for you.
                        </Text>
                        <FlatList
                            data={posts}
                            renderItem={(item) => <PostCard content={item.item} />}
                            style={{
                                paddingBottom: SIZES.body3,
                            }}
                            keyExtractor={(item) => item.length}
                        />
                    </ScrollView>
                )}
            </>
            {
                isLoading && posts.length > 0 ? (
                    <ActivityIndicator />
                ) : null
            }
        </SafeAreaView>
    )
}

export default Output
