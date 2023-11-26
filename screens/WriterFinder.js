import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES } from '../constants'
import TinderCards from '../components/TinderCards/TinderCards'
import { getFrameworkQuestions } from '../hooks/frameworkHooks'

const WriterFinder = ({ navigation }) => {

    const [frameworks, setFrameworks] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        loadFrameworks()
    }, [])

    const loadFrameworks = () => {
        getFrameworkQuestions().then((loadFrameworks) => {
            setFrameworks(loadFrameworks.reverse())
        }).catch((error) => {
            alert(error)
        }) 
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <PageContainer
                key={reload}
            >
                <View style={{
                    position: 'absolute',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 100
                }}>
                    <Text style={{
                        textAlign: 'center',
                    }}>
                        Opps! Looks like you're all out of frameworks in your area.
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            padding: 8,
                            borderRadius: 8,
                            marginTop: 16,
                        }}
                        onPress={ () => setReload(!reload) }
                    >
                        <Text style={{
                            color: COLORS.white,
                            textAlign: 'center',
                        }}>
                            Refresh
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        ...FONTS.h2,
                        padding: 12,
                    }}
                >
                  Swipe right to start your interview
                </Text>
                <TinderCards 
                    data={frameworks}
                    onCardAction={
                        (framework) => {
                            if (framework.questions !== undefined) {
                                navigation.navigate('PersonalChat', { frameworkQuestions: framework.questions })
                            }
                        }
                    }
                    onMoreInfo={
                        (framework) => {
                            navigation.navigate('WriterDetails', { framework: framework })
                        }
                    }
                />
            </PageContainer>
        </SafeAreaView>
    )
}

export default WriterFinder
