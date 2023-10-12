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
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import FrameworkCard from '../components/home/FrameworkCard/FrameworkCard'
import TileCard from '../components/home/TileCard/TileCard'

const Home = ({ navigation }) => {
    const jumpInItems = [
        {
            title: 'Truth vs Trend',
            subtitle: 'Addressing alternatives to the status quo',
            value: 60
        }
    ];
    const scratchItems = [
        {
            title: 'Writer Finder',
            icon: 'pen-tool',
        },
        {
            title: 'Pick From List',
            icon: 'list'
        }
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView
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
                        data={[1]}
                        renderItem={({ item }) => <FrameworkCard />}
                        // keyExtractor={ item => item?.job_id }
                        contentContainerStyle={{ columnGap: SIZES.body3 }}
                        horizontal
                    />
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                            marginTop: 12,
                        }}
                    >
                        Start from scratch
                    </Text>
                    <FlatList
                        data={ scratchItems}
                        renderItem={({ item }) => <TileCard item={ item }/>}
                        keyExtractor={ item => item?.title }
                        horizontal
                    />
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Home
