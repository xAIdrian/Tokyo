/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
*/
import { useState, useEffect } from 'react'
import axios from 'axios'
import images from '../constants/images'
import generateUUID from '../utils/StringUtils.js'
import Constants from 'expo-constants';

export const processAudioMessage = (audioFile) => {
    return [
        {
            _id: generateUUID(),
            text: audioFile.transcript,
            audioFileLocation: audioFile.recordingPath,
            user: {
                _id: 1,
            },
        },
    ]
}

export const sendBackAndForth = async (messages, framework) => {
    console.log(
        '🚀 ~ file: chatHooks.js:42 ~ sendMessageToServer ~ messages:',
        messages
    )
    const url =`${Constants.expoConfig.extra.aipiUrl}/api/v3/writer`
    const options = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-db-env': Constants.expoConfig.extra.aipiEnv,
        },
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
                        avatar: message.role === 'user' ? null : images.icon,
                    },
                }
            })
        } else {
            return undefined
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
