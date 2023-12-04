/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
*/
import Constants from 'expo-constants';
import axios from 'axios'

export const getFrameworkQuestions = async () => {
  const url = `${Constants.expoConfig.extra.aipiUrl}/api/v3/writer/questions`
  const options = {
      method: 'GET',
      url: url,
      params: {
          framework: 'framework',
      },
  }

  try {
      const response = await axios.request(options)
      if (response.data.message == 'success') {
          return response.data.result
      } else {
          return undefined
      }
  } catch (error) {
      throw error
  }
}
