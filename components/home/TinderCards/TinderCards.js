import { React, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { SIZES, COLORS, SHADOWS, FONTS } from '../../../constants/theme'
import styles from './tindercards.style.js'
import TinderCard from 'react-tinder-card'

const TinderCards = ({ item }) => {
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
    }
  
    return (
      <View>
          <Text
              style={{
                  ...FONTS.h2,
                  color: COLORS.black,
                  marginTop: 12,
              }}
          >
            Swipe to start your interview
        </Text>
        <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen('fooBar')}
          preventSwipe={['up', 'down']}
        >
          <View style={styles.container}>
            <Text style={styles.subtitle}> Sample Name </Text>
          </View>
        </TinderCard>
      </View>
    )
}

export default TinderCards
