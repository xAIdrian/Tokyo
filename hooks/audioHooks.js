/*
 * Tokyo Mobile
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 Adrian Mohnacs
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 *
 * For inquiries, contact: [Your Contact Email]
 */
import { useState, useEffect } from 'react'
import axios from 'axios'

export const sendAudioForTranscript = async (audioUri) => {
  const pathSegments = audioUri.split('/');
  const filename = pathSegments[pathSegments.length - 1];

  const formData = new FormData()
  formData.append('audio', audioUri)

  const url = 'https://legion-ai-content-machine.uc.r.appspot.com/api/v3/writer/transcript'
  const options = {
    method: 'POST',
    url: url,
    formData, 
    headers: {
        'Content-Type': 'multipart/form-data'
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
