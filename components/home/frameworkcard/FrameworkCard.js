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
    <TouchableOpacity 
      style={{
        width: 300,
        height: 200,
        padding: SIZES.body5,
        margin: SIZES.body5,
        backgroundColor: "#F2E9D3",
        borderRadius: SIZES.body3,
        ...SHADOWS.medium,
        shadowColor: COLORS.black,
      }}
    >
      <TouchableOpacity style={ styles.logoContainer }>
      </TouchableOpacity>
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
          value={60} // Initial value
          onChange={handleChange}
        />
      </View>
    </TouchableOpacity>
  )
}

export default FrameworkCard
