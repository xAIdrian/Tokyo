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
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES } from '../constants'
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import FrameworkCard from '../components/home/frameworkcard/FrameworkCard'

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginHorizontal: 22,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginVertical: 12,
                        }}
                    >
                        Welcome to Yonni 👋
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginVertical: 12,
                        }}
                    >
                        Where your thoughts become your business
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                            marginTop: 12,
                        }}
                    >
                        Jump back in
                    </Text>
                    <FlatList
                        data= { [1] }
                        renderItem={ ({ item }) => <FrameworkCard /> }
                        // keyExtractor={ item => item?.job_id }
                        contentContainerStyle={{ columnGap: SIZES.body3 }}
                        horizontal
                    />
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Home
