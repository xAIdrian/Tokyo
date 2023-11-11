import { React, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import styles from './tindercards.style.js'
import TinderCard from 'react-tinder-card'
import images from '../../constants/images'
import { mapping } from '../../constants/images'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants/theme'


const TinderCards = ({ data, onCardAction }) => {

    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
        navigator.navigate('PersonalChat')
    }

    return (
        <View>
            {data.map((item, index) => (
                <TinderCard
                    key={index}
                    onSwipe={(dir) => onSwipe(dir, item.title)}
                    onCardLeftScreen={ () => onCardAction(item.title) }
                    preventSwipe={['up', 'down']}
                >
                    <View style={styles.container}>
                        <Image source ={mapping[item.image]} style={ styles.image }/>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{ item.title }</Text>
                            <Text style={styles.subtitle}>
                                { item.subtitle }
                            </Text>
                            <Text style={styles.description}>
                                { item.description }
                            </Text>
                            <Text style={styles.subdescription}>
                                Best for: { item.bestfor.join(', ') }
                            </Text>
                        </View>
                    </View>
                </TinderCard>
            ))}
        </View>
    )
}

export default TinderCards
