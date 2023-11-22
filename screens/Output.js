import { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import PageTitle from '../components/PageTitle'
import PostCard from '../components/PostCard/PostCard'
import { sendContentForPosts } from '../hooks/contentHooks'

const Output = ({ route, navigation }) => {
    const { frameworkQuestions, frameworkAnswers } = route.params

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
                        // setPosts((existingPosts) => {
                        //     console.log("🚀 ~ file: Output.js:27 ~ setPosts ~ existingPosts:", existingPosts)
                        //     console.log("🚀 ~ file: Output.js:28 ~ sendContentForPosts ~ posts.length !== contentListSoFar.length:", existingPosts.length, contentListSoFar.length);
                        //     if (posts.length !== contentListSoFar.length) {
                        //         const tartar = contentListSoFar[contentListSoFar.length - 1]
                        //         console.log("🚀 ~ file: Output.js:31 ~ sendContentForPosts ~ tartar:", tartar);
                        //         [...existingPosts, tartar]
                        //     }
                        // })
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
                onPress={() => navigation.navigate('BottomTabNavigation')}
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.25,
                }}
            />
            <>
                {posts.length == 0 ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={posts}
                        renderItem={(item) => <PostCard content={item.item} />}
                        style={{
                            paddingBottom: SIZES.body3,
                        }}
                        keyExtractor={(item) => item.length}
                    />
                )}
            </>
            {isLoading && posts.length > 0 ? <ActivityIndicator /> : null}
        </SafeAreaView>
    )
}

export default Output
