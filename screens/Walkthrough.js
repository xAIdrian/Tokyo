/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import PageContainer from '../components/PageContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, COLORS, SIZES, FONTS } from '../constants'
import Button from '../components/Button'

const Walkthrough = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ImageBackground
                    source={images.welcome}
                    resizeMode="cover"
                    style={{ flex: 1 }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginHorizontal: 22,
                        }}
                    >
                        <Text
                            style={{
                                ...(SIZES.width <= 360
                                    ? { ...FONTS.h2 }
                                    : { ...FONTS.h1 }),
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignContent: 'center',
                                marginHorizontal: SIZES.padding * 0.8,
                            }}
                        >
                            Months of content in minutes a day.
                        </Text>

                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}>
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    marginVertical: 12,
                                }}
                            >
                                Terms and Privacy
                            </Text>

                            <Button
                                title="Start Messaging"
                                onPress={() =>
                                    navigation.navigate('Login')
                                }
                                style={{
                                    width: '100%',
                                    paddingVertical: 12,
                                    marginBottom: 48,
                                }}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </PageContainer>
        </SafeAreaView>
    )
}
export default Walkthrough;
