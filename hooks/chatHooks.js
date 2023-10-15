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
import images from '../constants/images'
import generateUUID from '../utils/StringUtils'

export const initMessage = [
    {
        _id: 1,
        text: "Hey there, it's great to see you. Are you ready to create some awesome content?",
        // createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: images.icon,
        }
    },
]

export const audioMessage = (audioFile) => {
    return [
        {
            _id: generateUUID(),
            text: audioFile.transcript,
            audioFileLocation: audioFile.recordingPath,
            user: {
                _id: 1,
            }
        }
    ]
}

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
                        avatar: message.role === 'user' ? null : images.icon
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

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        // headers: {
        //   'X-RapidAPI-Key': rapidApiKey,
        //   'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        // },
        url: `${url}/${endpoint}`,
        params: { ...query },
    }

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.request(options)

            setData(response.data.data)
        } catch (error) {
            setError(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
}

export default useFetch
