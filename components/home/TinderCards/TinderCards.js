import { React, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { SIZES, COLORS, SHADOWS, FONTS } from '../../../constants/theme'
import styles from './tindercards.style.js'
import TinderCard from 'react-tinder-card'
import images from '../../../constants/images'

const TinderCards = ({ item, onCardAction }) => {
    const swipeItems = [
        {
            name: 'Tinder Card 1',
        },
        {
            name: 'Tinder Card 2',
        },
        {
            name: 'Tinder Card 3',
        },
        {
            name: 'Tinder Card 4',
        },
    ]

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
        <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={ onCardAction }
          preventSwipe={['up', 'down']}
        >
          <View style={styles.container}>
            <Text style={styles.title}>The Myth Buster</Text>
            <Image source={images.user1} style={ styles.image } />
            <Text style={styles.subtitle}>The misconception, limiting belief, or myth cracker </Text>
            <Text style={styles.description}>Think about a common misconception (that you’d like to debunk)
              that your audience tends to have. Something that is holding them back, 
              and hurting them. 
            </Text>
            <Text style={styles.subdescription}>Best for: Education, Rapport, & Growth</Text>
          </View>
        </TinderCard>
      </View>
    )
}

export default TinderCards
