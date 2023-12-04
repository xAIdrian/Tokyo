/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { React, useState } from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    Dimensions 
} from 'react-native'
import styles from './tindercards.style.js'
import TinderCard from 'react-tinder-card'
import { mapping } from '../../constants/images'
import { COLORS, SIZES, SHADOWS } from '../../constants/theme'


const TinderCards = ({ 
    data, 
    onCardAction,
    onMoreInfo,
}) => {
    const { height } = Dimensions.get('window');
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const onSwipe = (direction, item) => {
        console.log('You swiped: ' + direction)
        if (direction === 'right') {
            onCardAction(item)
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
        navigator.navigate('PersonalChat')
    }

    return (
        <View>
            {
                data.map((item, index) => (
                    <TinderCard
                        // ref={item.title}
                        key={item.title}
                        onSwipe={(dir) => onSwipe(dir, item)}
                        // onCardLeftScreen={ () => onCardAction(item) }
                        preventSwipe={['up', 'down']}
                    >
                        <View 
                            style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                                width: "90%",
                                height: height * 0.75,
                                margin: SIZES.body5,
                                backgroundColor: COLORS.tertiaryWhite,
                                borderRadius: SIZES.body5,
                                ...SHADOWS.medium,
                                shadowColor: COLORS.black,
                                position: 'absolute',
                              }}
                        >
                            <Image source ={mapping[item.image]} style={ styles.image }/>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{ item.title }</Text>
                                <Text 
                                    style={styles.description}
                                    numberOfLines={5} 
                                    ellipsizeMode='tail'
                                >
                                    { item.description }
                                </Text>
                                <Text style={styles.subdescription}>
                                    Expected time: { item.time}
                                </Text>
                                <Text style={styles.subdescription}>
                                    Expected pieces of content: { item.num_pieces}
                                </Text>
                            </View>
                            <View style={{
                                padding: SIZES.body3,
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                <TouchableOpacity 
                                    style={ styles.selecter }
                                    onPress={ () => onMoreInfo(item) }    
                                >
                                    <Text style={{
                                        color: COLORS.primary,
                                        textAlign: 'center',
                                    }}>
                                        More Info
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TinderCard>
                ))
            }
        </View>
    )
}

export default TinderCards
