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
    FlatList,
    ScrollView,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES } from '../constants'
import FrameworkCard from '../components/FrameworkCard/FrameworkCard'
import TileCard from '../components/TileCard/TileCard'

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
            locked: false
        },
        {
            title: 'Quick Start',
            icon: 'list',
            locked: false
        }
    ];
    const popularItems = [
        {
            title: 'The Challenger',
            icon: 'ice',
            locked: true
        },
        {
            title: 'Soul Sync',
            icon: 'fire',
            locked: true
        },
        {
            title: 'The Mythbuster',
            icon: 'question',
            locked: true
        },
    ];

    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
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
                            color: COLORS.black,
                            marginVertical: 12,
                        }}
                    >
                        Welcome to Outbrand
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.black,
                            marginVertical: 12,
                        }}
                    >
                        Where your thoughts become your business
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h2,
                            marginTop: 12,
                        }}
                    >
                        Jump back in
                    </Text>
                    <FlatList
                        data={[1]}
                        renderItem={({ item }) => <FrameworkCard 
                            onContinueInterviewPress = {() => navigation.navigate('PersonalChat')}
                        />}
                        // keyExtractor={ item => item?.job_id }
                        contentContainerStyle={{ columnGap: SIZES.body3 }}
                        horizontal
                    />
                    <Text
                        style={{
                            ...FONTS.h2,
                            marginTop: 12,
                        }}
                    >
                        Start from scratch
                    </Text>
                    <FlatList
                        data={ scratchItems}
                        renderItem={({ item }) => <TileCard
                            item={item}
                            onHandlePress={() => {
                                if (item.title === 'Writer Finder') {
                                    navigation.jumpTo('WriterFinder')
                                } else {
                                    navigation.navigate('PersonalChat')
                                }
                            }}
                        />}
                        keyExtractor={ item => item?.title }
                        horizontal
                    />
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                            marginTop: 12,
                        }}
                    >
                        Trending today
                    </Text>
                    <FlatList
                        data={ popularItems }
                        renderItem={({ item }) => <TileCard item={ item } locked={ item.locked }/>}
                        keyExtractor={ item => item?.title }
                        horizontal
                        style={{
                            marginBottom: SIZES.body1,
                        }}
                    />
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Home
