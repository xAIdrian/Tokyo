import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Slider } from '@react-native-assets/slider'
import { SIZES, COLORS, SHADOWS } from "../../../constants/theme";
import styles from './frameworkcard.style.js';

const FrameworkCard = () => {
  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <View 
      style={ styles.container }
    >
      <Text 
        style={ styles.title }
        numberOfLines={ 1 }
      >
        Truth vs Trend
      </Text>
      <View style={ styles.infoContainer }>
        <Text 
          style={ styles.subtitle }
          numberOfLines={ 1 }
        >
          Addressing alternatives
        </Text>
        <Text style={ styles.info }>
          60% complete
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={1}
          enabled={false}
          value={60} 
          thumbTintColor={ COLORS.primary }
        />
        <TouchableOpacity>
          <Text style={ styles.selecter }>
            Continue Interview
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FrameworkCard
