import { React, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import styles from './tindercards.style.js'
import TinderCard from 'react-tinder-card'
import images from '../../constants/images'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants/theme'


const TinderCards = ({ data, onCardAction }) => {
    const swipeItems = [
        {
            title: 'Truth vs Trend',
            icon: 'layers',
            subtitle: 'Addressing alternatives to the status quo',
            description: 'Show your audience that there is a better way to do something. This is a great way to build trust and rapport with your audience.',
            subdescription: 'Best for: Education, Rapport, & Growth',
        },
        {
            title: 'The Conception Buster',
            icon: 'key',
            subtitle: 'Debunking a common misconception',
            description: 'Think about a common misconception (that you’d like to debunk) that your audience tends to have. Something that is holding them back, and hurting them.',
            subdescription: 'Best for: Education, Rapport, & Growth',
        },
        {
            title: 'Close the Gap',
            icon: 'crop',
            subtitle: 'Showing the gap between where they are and where they want to be',
            description: 'We all have a gap between where we are and where we want to be. This gap is what causes us to take action. Think about the gap that your audience has between where they are and where they want to be.',
            subdescription: 'Best for: Marketing, Sales, & Growth',
        },
        {
            title: 'Weekly Win',
            icon: 'user',
            subtitle: 'Sharing a win with your audience',
            description: 'Share a win that you’ve had recently. This is a great way to build rapport with your audience, and show them that you’re a real person.',
            subdescription: 'Best for: Authority & Knowledge',
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
            {data.map((item, index) => (
                <TinderCard
                    key={index}
                    onSwipe={(dir) => onSwipe(dir, item.title)}
                    onCardLeftScreen={ () => onCardAction(item.title) }
                    preventSwipe={['up', 'down']}
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>{ item.title }</Text>
                        <Feather
                            name= { item.icon }
                            size={100}
                            color={COLORS.primary}
                            style={styles.image}
                        />
                        <Text style={styles.subtitle}>
                            { item.subtitle }
                        </Text>
                        <Text style={styles.description}>
                            { item.description }
                        </Text>
                        <Text style={styles.subdescription}>
                            { item.bestfor }
                        </Text>
                    </View>
                </TinderCard>
            ))}
        </View>
    )
}

export default TinderCards
