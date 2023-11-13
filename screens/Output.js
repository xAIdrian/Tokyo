import { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import PageTitle from '../components/PageTitle'
import PostCard from '../components/PostCard/PostCard'
import { sendManyToServer } from '../hooks/contentHooks'

const Output = ({ route, navigation }) => {
    const { frameworkQuestions, frameworkAnswers } = route.params

    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts([])
    }, [])

    useEffect(() => {
        if (route.params !== undefined) {
            sendManyToServer(frameworkQuestions, frameworkAnswers).subscribe({
                next: (content) => {
                    if (content !== undefined) {
                        setIsLoading(true)
                        setPosts((posts) => [...posts, content])
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
