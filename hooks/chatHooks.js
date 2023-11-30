/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 Adrian Mohnacs
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
*/
import { useState, useEffect } from 'react'
import axios from 'axios'
import images from '../constants/images'
import generateUUID from '../utils/StringUtils.js'
import Constants from 'expo-constants';

export const samplesArray = [
    "I've seen too many marketers copying each other's exact offers, funnels, posts & words.",
    "It comes from the culture of 'Funnel hacking' which been drilled into their heads by industry leaders over the years.",
    "While modeling something does work it can only take you so far! If all you do is model other people you never develop true skill and originality. You always depend on someone to copy and you lack judgment of whether what you copy is GOOD in the first place because again you never developed actual skill and you can't recognize something good to model something that might be terrible for you.",
    "They don't understand why they are not successful. They copied someone word for word, but the results are different. They think, how can this be? I copied x and y to a t. I should be rich, but that's not how building a business works.",
    "Copying someone might make you feel like you're moving faster but at some point you will get stuck at the point where there is a real skill required and you won't know how to move forward it will be another failed business. It might take longer to see results when you try to develop a true skill without trying to shortcut it but it will be worth it in the long run",
    "They might say, but Johnny, people like Russell said that you need to model what works and I generally agree But don't forget that Russell is a marketer himself, and he tries to sell you his system and solutions If you have no skills doesn't matter how much you copy or like they say model You will always fail when real skill is used. You might as well do it the hard way which makes it easier at the end",
    "Getting exceptional results will take five years of hard work and dedication, but in one year you can already achieve more than most people achieve in 30 years of a 9-5 job. Set your one year goal, three year goals, and five year goals and get started now. You would be surprised how quickly time flies by and what you can achieve when you are not rushing to get results in two months. I'll leave this quote for everyone, a quote to live by. Most people overestimate what they can do in one year and underestimate what they can do in ten years.",
]

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
