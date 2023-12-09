/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
*/
import { useState, useEffect } from 'react'
import axios from 'axios'
import Constants from 'expo-constants';

export const sendAudioForTranscript = async (audioUri) => {
  const pathSegments = audioUri.split('/');
  const filename = pathSegments[pathSegments.length - 1];

  const formData = new FormData()
  formData.append('audio', audioUri)

  const url = `${Constants.expoConfig.extra.aipiUrl}/api/v3/writer/transcript`
  const options = {
    method: 'POST',
    url: url,
    formData, 
    headers: {
        'Content-Type': 'multipart/form-data',
        'x-db-env': Constants.expoConfig.extra.aipiEnv,
    }
  }

  try {
      const response = await axios.request(options)
      if (response.data.message == 'success') {
          // return response.data.result.messages
      } else {
          throw new Error(response.data.message)
      }
  } catch (error) {
      throw error
  }
}
