import { useEffect, useState } from 'react'
import {
    FlatList,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    TextInput,
    View,
    Text,
    Image,
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, COLORS, SIZES, FONTS } from '../constants'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'

export default function PhoneNumber({ navigation }) {
    const [areas, setAreas] = useState([])
    const [selectedArea, setSelectedArea] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    // fectch codes from rescountries api

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                let areaData = data.map((item) => {
                    return {
                        code: item.alpha2Code,
                        item: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`, // https://flagsapi.com/${item.alpha2Code}/flat/64.png
                    }
                })

                setAreas(areaData)
                if (areaData.length > 0) {
                    let defaultData = areaData.filter((a) => a.code == 'US')

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])

    // render countries codes modal
    function renderAreasCodesModal() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: 10,
                        flexDirection: 'row',
                    }}
                    onPress={() => {
                        setSelectedArea(item), setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            height: 30,
                            width: 30,
                            marginRight: 10,
                        }}
                    />

                    <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                        {item.item}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                color: '#fff',
                                backgroundColor: '#342342',
                                borderRadius: 12,
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                verticalScrollIndicator={false}
                                style={{
                                    padding: 20,
                                    marginBottom: 20,
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
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
                                keyboardType="numeric"
                            />
                        </View>
                        <Button
                            title="Submit"
                            onPress={() =>
                                navigation.navigate('BottomTabNavigation')
                            }
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
