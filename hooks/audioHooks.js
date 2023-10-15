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

export const sendMessageToServer = async (messages, framework) => {
  const url = 'http://localhost:3000/api/v3/writer'
  const options = {
      method: 'POST',
      url: url,
      data: {
          messages: messages
              .map((message) => ({
                  role: message.user._id === 1 ? 'user' : 'assistant',
                  content: message.text,
              }))
              .reverse(),
          framework: framework,
      },
  }

  try {
      const response = await axios.request(options)
      if (response.data.message == 'success') {
          return response.data.result.messages.map((message) => {
              return {
                  _id: response.data.result.sessionStateId,
                  text: message.content,
                  user: {
                      _id: message.role === 'user' ? 1 : 2,
                      // avatar: message.role === 'user' ? 'https://placeimg.com/140/140/any' : 'https://placeimg.com/140/140/any',
                }
              }
          })
      } else {
          throw new Error(response.data.message)
      }
  } catch (error) {
      throw error
  }
}
