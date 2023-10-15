import { useState, useEffect } from 'react'
import axios from 'axios'
import images from '../constants/images'

export const initMessage = [
    {
        _id: 1,
        text: "Hey there, it's great to see you. Are you ready to create some awesome content?",
        // createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: images.icon,
        },
        quickReplies: {
            type: 'radio', // or 'checkbox',
            // keepIt: true,
            values: [
                {
                    title: 'Examples',
                    value: 'examples',
                },
                {
                    title: 'Learn More',
                    value: 'more_info',
                },
            ],
        },
    },
]

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
                  },
                  quickReplies: message.role === 'user' ? null : {
                    type: 'radio', // or 'checkbox',
                    // keepIt: true,
                    values: [
                      {
                        title: 'Examples',
                        value: 'examples',
                      },
                      {
                        title: 'Learn More',
                        value: 'more_info',
                      }
                    ],
                  },
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
