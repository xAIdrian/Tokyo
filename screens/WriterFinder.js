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
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES } from '../constants'
import TinderCards from '../components/TinderCards/TinderCards'

const WriterFinder = ({ navigation }) => {
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
                <TinderCards onCardAction={
                    (itemName) => {
                        if (itemName == 'The Conception Buster') {
                            console.log('Card action')
                            navigation.navigate('PersonalChat')
                        }
                    }
                } />
            </PageContainer>
        </SafeAreaView>
    )
}

export default WriterFinder
