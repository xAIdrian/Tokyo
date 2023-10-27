
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
import {Observable, from } from 'rxjs'
import { questionsArray, answersArray, samplesArray } from './chatHooks'

export const sendManyToServer = () => {
  const allQuestions = questionsArray
  // const allAnswers = answersArray
  const allAnswers = samplesArray

  return new Observable(async (subscriber) => {
    subscriber.next(await sendOneShotToServer(allQuestions, allAnswers))

    const firstHalfQuestions = allQuestions.slice(0, allQuestions.length / 2)
    const firstHalfAnswers = allAnswers.slice(0, allAnswers.length / 2)
    subscriber.next(await sendOneShotToServer(firstHalfQuestions, firstHalfAnswers))

    const secondHalfQuestions = allQuestions.slice(allQuestions.length / 2, allQuestions.length)
    const secondHalfAnswers = allAnswers.slice(allAnswers.length / 2, allAnswers.length)
    subscriber.next(await sendOneShotToServer(secondHalfQuestions, secondHalfAnswers))

    subscriber.complete()
  })
};

export const sendOneShotToServer = async (questions, answers) => {
    console.log("❓ ~ file: chatHooks.js:124 ~ sendOneShotToServer ~ sendOneShotToServer:", questions)
    console.log("📣 ~ file: chatHooks.js:124 ~ sendOneShotToServer ~ sendOneShotToServer:", answers)
 
    const url = 'http://localhost:3000/api/v3/writer/oneshot'
    const options = {
        method: 'POST',
        url: url,
        data: {
            questions: questions,
            answers: answers
        },
    }

    try {
        const response = await axios.request(options)
        if (response.data.message == 'success') {
            return response.data.result
        } else {
            return '';
        }
    } catch (error) {
        throw error
    }
};
