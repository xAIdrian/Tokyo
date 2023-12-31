/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
*/
import axios from 'axios'
import {Observable, from } from 'rxjs'
import Constants from 'expo-constants';

const POLLING_TIMER = 10000  

export const sendContentForPosts = (questions, answers) => {
  contentPosts = []

  const allQuestions = questions.map((question) => question.text)

  return new Observable(async (subscriber) => {
    sendOneShotToServer(allQuestions, answers)
    return checkContentPolling(subscriber)
  })
};

const checkContentPolling = async (subscriber) => {
  const polling_url = `${Constants.expoConfig.extra.aipiUrl}/api/v3/writer/oneshotpolling`
  const options = {
    method: 'GET', 
    url: polling_url,
    headers: {
      'Content-Type': 'application/json',
      'x-db-env': Constants.expoConfig.extra.aipiEnv,
    },
    params: {
      userUuid: '123',
    },
  }
  let isComplete = false
  const intervalaId = setInterval( async() => {
    if (isComplete) {
      console.log("🚀 ~ file: contentHooks.js:38 ~ intervalaId ~ isComplete:", isComplete)
      subscriber.complete()
      clearInterval(intervalaId)
      return
    }
    try {
      isComplete = await getContentStatus(
        subscriber, 
        options
      ) 
    } catch (error) {
      console.log("🚀 ~ file: contentHooks.js:46 ~ intervalaId ~ error:", error)
      subscriber.error(error)
      clearInterval(intervalaId)
    }
  }, POLLING_TIMER)
}

const getContentStatus = async (subscriber, options) => {
  try {
    const pollResponse = await axios.request(options)
    console.log("🚀 ~ file: contentHooks.js:53 ~ getContentStatus ~ pollResponse:", pollResponse.data)
    if (pollResponse.data.message == 'success') {
      const { isComplete, result } = pollResponse.data.result
      subscriber.next(result)
      return isComplete
    } else {
      throw new Error('Error getting content generation status from server')
    }
  } catch (error) {
      throw error
  }
}

export const sendOneShotToServer = (questions, answers) => {
    console.log("❓ ~ file: chatHooks.js:124 ~ sendOneShotToServer ~ questions:", questions)
    console.log("📣 ~ file: chatHooks.js:124 ~ sendOneShotToServer ~ answers:", answers)
 
    const url = `${Constants.expoConfig.extra.aipiUrl}/api/v3/writer/oneshot`
    const options = {
        method: 'POST', 
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-db-env': Constants.expoConfig.extra.aipiEnv,
        },
        data: {
            userUuid: '123',
            questions: questions,
            answers: answers
        },
    }
    try {
        const response = axios.request(options)
        // console.log("🚀 ~ file: contentHooks.js:83 ~ sendOneShotToServer ~ response:", response)
        // if (response.data.message == 'success') {
        //   return true;
        // } else {
        //     return false;
        // }
    } catch (error) {
        throw error
    }
};

/**
 * This will need a programmatic overhaul to work with the new data structure
 * @param {*} questions 
 * @param {*} answers 
 * @returns 
 */
const getSubsetArrays = (questions, answers) => {
  //create an array of indices
  const indices = Array.from({ length: questions.length }, (_, i) => i);

  // Shuffle the indices to randomize the order
  shuffleArray(indices);

  // Calculate the split point (e.g., 50%)
  const splitPoint = Math.floor(indices.length / 2);

  // Split the indices into two arrays
  //TODO modify these for different results
  const firstHalfIndices = indices.slice(0, 1);
  const secondHalfIndices = indices.slice(1, 2);
  const thirdHalfIndices = indices.slice(2, 3);
  const fourthHalfIndices = indices.slice(3, 4);

  // Create two new arrays using the split indices
  const questionsFirstHalf = firstHalfIndices.map((index) => questions[index]);
  const answersFirstHalf = firstHalfIndices.map((index) => answers[index]);
  
  const questionsSecondHalf = secondHalfIndices.map((index) => questions[index]);
  const answersSecondHalf = secondHalfIndices.map((index) => answers[index]);

  const questionsThirdHalf = thirdHalfIndices.map((index) => questions[index]);
  const answersThirdHalf = thirdHalfIndices.map((index) => answers[index]);

  const questionsFourthHalf = fourthHalfIndices.map((index) => questions[index]);
  const answersFourthHalf = fourthHalfIndices.map((index) => answers[answers[0], index]);

  return {
    questionsFirstHalf,
    questionsSecondHalf,
    questionsThirdHalf,
    questionsFourthHalf,
    answersFirstHalf,
    answersSecondHalf,
    answersThirdHalf,
    answersFourthHalf
  };
};

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
