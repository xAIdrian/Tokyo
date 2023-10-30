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

export const questionsArray = [
    {
        text: 'Please state a common mistake/ limiting belief / misinformation that your audience seems to have.',
        explanation:
            'This could be a statement that your audience is repeating that’s absolutely not true, or a belief that they have about themselves or about something external that is wrong.\n\nRemember it could be a belief, a thought, a misconception, behavior.\n\nSomething that makes you think “wow they got this totally wrong"',
        example:
            'For example - if you are a fitnes coach your audience might think “if I do a lot of sit-ups i’ll have abs”\n\nIf you’re a software agency your audeince might think that “coders are coders, it doesnt matter which country their from”\n\nIf you’re running an insurance agency your audience might think “it’s better to buy directly from the company and skip the agents commission”',
    },
    {
        text: 'What is behind this / Where does it come from / Why are they engaging in it?',
        explanation: "This is where you explain why do they most likely have this misconception. Where did they get it from:\n\nCould be from myths, could be from people’s natural inclination, someone who told them that or ingrained these ideas in them etc…",
        example: "For example - if you are a fitnes coach your audience might think “if I do a lot of sit-ups i’ll have abs”\n\nIf you’re a software agency your audeince might think that “coders are coders, it doesnt matter which country their from”\n\nIf you’re running an insurance agency your audience might think “it’s better to buy directly from the company and skip the agents commission”"
    },
    {
        text: 'What are the consequences of this belief or behaviour?\n\nIt could be something that is happening now that they may or may not be aware of. It could be something that has happened in the past as a result or something that could happen in the future.',
        explanation: "Explain the consequences. Ideally you want to connect these consequenses to these 5 topics:\n\nWaste of time.\nDamages in relationships (business or personal).\nLoss of money or potential profits\nBeing less attractive or appealing to others\nLoss of health\nFeeling bad",
        example: ""
    },
    {
        text: 'What does your ideal customer tell themselves when they experience these consequences you just described? What is their internal dialogue? And why?\n\nWhat are they actually missing?\nWhat are they not aware of?\nWhy aren’t they aware of it? ',
        explanation: " Show your audience that you are familiar with their internal dialoge. Use their own words to describe what they are thinking or telling themselves. Usually it would be related to confusion / self judgement or negative emotions",
        example: ""
    },
    {
        text: 'What additional perspective could you give them?',
        explanation: "",
        example: ""
    },
    {
        text: 'What objections could they have to your new perspective and why?\nWhat would be your response?',
        explanation: "",
        example: ""
    },
    {
        text: 'What is the action item you’d like to leave them with?/ food for thought / something to do next time? ',
        explanation: "",
        example: ""
    },
]

export const samplesArray = [
    "I've seen too many marketers copying each other's exact offers, funnels, posts & words.",
    "It comes from the culture of 'Funnel hacking' which been drilled into their heads by industry leaders over the years.",
    "While modeling something does work it can only take you so far! If all you do is model other people you never develop true skill and originality. You always depend on someone to copy and you lack judgment of whether what you copy is GOOD in the first place because again you never developed actual skill and you can't recognize something good to model something that might be terrible for you.",
    "They don't understand why they are not successful. They copied someone word for word, but the results are different. They think, how can this be? I copied x and y to a t. I should be rich, but that's not how building a business works.",
    "Copying someone might make you feel like you're moving faster but at some point you will get stuck at the point where there is a real skill required and you won't know how to move forward it will be another failed business. It might take longer to see results when you try to develop a true skill without trying to shortcut it but it will be worth it in the long run",
    "They might say, but Johnny, people like Russell said that you need to model what works and I generally agree But don't forget that Russell is a marketer himself, and he tries to sell you his system and solutions If you have no skills doesn't matter how much you copy or like they say model You will always fail when real skill is used. You might as well do it the hard way which makes it easier at the end",
    "Getting exceptional results will take five years of hard work and dedication, but in one year you can already achieve more than most people achieve in 30 years of a 9-5 job. Set your one year goal, three year goals, and five year goals and get started now. You would be surprised how quickly time flies by and what you can achieve when you are not rushing to get results in two months. I'll leave this quote for everyone, a quote to live by. Most people overestimate what they can do in one year and underestimate what they can do in ten years.",
]

export const questionCount = questionsArray.length

export const answersArray = []

export const initMessage = [
    {
        _id: 1,
        text: questionsArray[0].text,
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
                    title: 'Example',
                    value: 'examples',
                },
                {
                    title: 'Learn More',
                    value: 'more_info',
                },
            ],
        },
    },
    // {
    //     _id: 2,
    //     text: "Hey there, it's great to see you. Let's get started creating some awesome content...",
    //     // createdAt: new Date(),
    //     user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: images.icon,
    //     },
    // },
]

export const audioMessage = (audioFile) => {
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
    const url =
        'https://legion-ai-content-machine.uc.r.appspot.com/api/v3/writer'
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
