import { useEffect, useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native-safe-area-context'
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
        // const content = await sendOneShotToServer()
        // setIsLoading(false)
        // if (content !== undefined && content !== '') {
        //     setPosts([content])
        // } else {
        //     console.log(
        //         '🔥 ~ file: PersonalChat.js:59 ~ onSend ~ content:',
        //         content
        //     )
        // }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <PageTitle
                onPress={() => navigation.navigate('BottomTabNavigation')}
            />
        </SafeAreaView>
    )
}

export default Output
