import { useEffect, useState } from 'react'
import {
    ScrollView,
    TextInput,
    View,
    Text,
} from 'react-native'
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
import { database, USERS } from '../config/firebase';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'

export default function PhoneNumber({ navigation }) {
    const [email, setEmail] = useState('');

    const handleSend = () => {
        if (email.trim() !== '') {
            const newEmail = {
                _id: Math.random().toString(36).substring(7),
                email: email,
                createdAt: new Date().getTime(),
                user: {  _id: 'user-id' }
            };

            addDoc(collection(database, USERS), newEmail);
            setEmail('');

            navigation.navigate('BottomTabNavigation')
        } else {
            alert('Please enter your email')
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <PageTitle onPress={() => navigation.navigate('Walkthrough')} />
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                            marginTop: 80,
                        }}
                    >
                        Enter Your Email For Early Access
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body3,
                            textAlign: 'center',
                            marginVertical: 4,
                            paddingHorizontal: 22,
                        }}
                    >
                        It's time to meet your personal ghost writer and share
                        your voice with the world.
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 22,
                            paddingVertical: 60,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 88,
                            }}
                        >
                            {/* Phone Number Text Input */}
                            <TextInput
                                style={{
                                    flex: 1,
                                    marginVertical: 10,
                                    borderColor: '#111',
                                    backgroundColor: COLORS.secondaryWhite,
                                    borderRadius: SIZES.padding,
                                    paddingLeft: SIZES.padding,
                                    height: 48,
                                    fontSize: 12,
                                    color: '#111',
                                }}
                                placeholder="Enter your email"
                                placeholderTextColor="#111"
                                selectionColor="#111"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                            />
                        </View>
                        <Button
                            title="Submit"
                            onPress={() => handleSend() }
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 48,
                            }}
                        />
                    </View>
                </View>
                {/* {renderAreasCodesModal()} */}
            </ScrollView>
        </SafeAreaView>
    )
}
