import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES } from '../constants'
import TinderCards from '../components/TinderCards/TinderCards'
import { getFrameworkQuestions } from '../hooks/frameworkHooks'

const WriterFinder = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [frameworks, setFrameworks] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        loadFrameworks()
    }, [])

    const loadFrameworks = () => {
        setIsLoading(true)
        getFrameworkQuestions()
            .then((loadFrameworks) => {
                setIsLoading(false)
                setFrameworks(loadFrameworks.reverse())
            })
            .catch((error) => {
                setIsLoading(false)
                alert(error)
            })
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <PageContainer key={reload}>
                {isLoading ? (
                    <View
                        style={{
                            alignContent: 'center',
                            width: '100%',
                            height: '100%',
                            paddingTop: 120,
                        }}
                    >
                        <ActivityIndicator />
                    </View>
                ) : (
                    <>
                        <View
                            style={{
                                position: 'absolute',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 120,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                Opps! Looks like you're all out of frameworks in
                                your area.
                            </Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primary,
                                    padding: 8,
                                    borderRadius: 8,
                                    marginTop: 16,
                                }}
                                onPress={() => setReload(!reload)}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        textAlign: 'center',
                                    }}
                                >
                                    Refresh
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{
                                ...FONTS.body3,
                                padding: 12,
                            }}
                        >
                            Swipe right to start interview or left to skip
                        </Text>
                        <TinderCards
                            data={frameworks}
                            onCardAction={(framework) => {
                                if (framework.questions !== undefined) {
                                    navigation.navigate('PersonalChat', {
                                        framework: framework,
                                    })
                                }
                            }}
                            onMoreInfo={(framework) => {
                                navigation.navigate('WriterDetails', {
                                    framework: framework,
                                })
                            }}
                        />
                    </>
                )}
            </PageContainer>
        </SafeAreaView>
    )
}

export default WriterFinder
