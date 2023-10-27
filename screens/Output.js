import { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import ProfileHeader from '../components/ProfileHeader/ProfileHeader'
import PageTitle from '../components/PageTitle'
import PostCard from '../components/PostCard/PostCard'
import { sendOneShotToServer } from '../hooks/chatHooks'

const Output = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        setIsLoading(true)
        const content = await sendOneShotToServer()
        setIsLoading(false)
        // console.log(posts)
        setPosts(posts => [...posts, content])
    }, [])

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
                        renderItem={ (item) =>  <PostCard content={item.item} /> }
                        style={{
                            paddingTop: SIZES.body3,
                        }}
                        // keyExtractor={(item) => item.id}
                    />
                )}
            </>
            {isLoading && posts.length > 0 ? <ActivityIndicator /> : null}
        </SafeAreaView>
    )
}

export default Output
