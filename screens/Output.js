import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import ProfileHeader from '../components/ProfileHeader/ProfileHeader'
import PageTitle from '../components/PageTitle'
import PostCard from '../components/PostCard/PostCard'
import { sendOneShotToServer } from '../hooks/chatHooks'
import Lottie from "react-lottie";

const Output = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const content = await sendOneShotToServer();
    setIsLoading(false);
    if (content !== undefined && content !== '') {
        setPosts([content]);
    } else {
        console.log("🔥 ~ file: PersonalChat.js:59 ~ onSend ~ content:", content)
    }
  }, []);

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <PageTitle
              onPress={() => navigation.navigate('BottomTabNavigation')}
          />
      <ProfileHeader />
      <FlatList
          data={ posts }
          renderItem={ (item, index) => {(
            <PostCard
              name={item.name}
              content={item.content}
            />
          )}}
        //the key extractor needs to be updated
          keyExtractor={(item, index) => index.toString()}
      />
      </SafeAreaView>
  )
}

export default Output;
