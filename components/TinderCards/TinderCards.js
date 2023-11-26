import { React, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import styles from './tindercards.style.js'
import TinderCard from 'react-tinder-card'
import images from '../../constants/images'
import { mapping } from '../../constants/images'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants/theme'


const TinderCards = ({ 
    data, 
    onCardAction
}) => {
    console.log("🚀 ~ file: TinderCards.js:16 ~ data:", data)

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
                        <View style={styles.container}>
                            <Image source ={mapping[item.image]} style={ styles.image }/>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{ item.title }</Text>
                                <Text style={styles.description}>
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
                                <TouchableOpacity style={ styles.selecter }>
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
