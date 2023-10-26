import { useEffect, useState } from 'react'
import { ScrollView, TextInput, View, Text, FlatList } from 'react-native'
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
} from 'firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import ProfileHeader from '../components/ProfileHeader/ProfileHeader'
import PageTitle from '../components/PageTitle'

export default function Output({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <PageTitle onPress={() => navigation.navigate('BottomTabNavigation')} />
        <ProfileHeader />
        </SafeAreaView>
    )
}
