/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Slider } from '@react-native-assets/slider'
import { SIZES, COLORS, SHADOWS } from "../../constants/theme";
import styles from './frameworkcard.style.js';

const FrameworkCard = ({
  onContinueInterviewPress
}) => {
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
        The Conception Buster
      </Text>
      <View style={ styles.infoContainer }>
        <Text 
          style={ styles.subtitle }
        >
          I help you create engaging content that dissects,debunks and re-frames a common misconception your audience has.

        </Text>
        {/* <Text style={ styles.info }>
          14% complete
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={1}
          enabled={false}
          value={14} 
          thumbTintColor={ COLORS.primary }
        /> */}
        <TouchableOpacity
          onPress={ onContinueInterviewPress }
        >
          <Text style={ styles.selecter }>
            Start Interview
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FrameworkCard
