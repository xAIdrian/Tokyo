/*
 * Content Machine Complete
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 Adrian Mohnacs
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 *
 * For inquiries, contact: [Your Contact Email]
 */
/*
 * Content Machine Complete
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 Adrian Mohnacs
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 *
 * For inquiries, contact: [Your Contact Email]
 */

import {
    Text,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES } from '../constants'
import TinderCards from '../components/TinderCards/TinderCards'
import { getFrameworkQuestions } from '../hooks/frameworkHooks'

const WriterFinder = ({ navigation }) => {

    const [frameworks, setFrameworks] = useState([])

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
            <PageContainer>
                <Text
                    style={{
                        ...FONTS.h2,
                        color: COLORS.black,
                        padding: 12,
                    }}
                >
                  Swipe right to start your interview
                </Text>
                <TinderCards 
                    data={frameworks}
                    onCardAction={
                        (framework) => {
                            navigation.navigate('PersonalChat', { frameworkQuestions: framework.questions })
                        }
                    }
                    onCardRefresh={ loadFrameworks } 
                />
            </PageContainer>
        </SafeAreaView>
    )
}

export default WriterFinder
