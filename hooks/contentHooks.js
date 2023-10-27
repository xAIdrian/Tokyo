
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
    const { questionsFirstHalf, questionsSecondHalf, answersFirstHalf, answersSecondHalf } = getSubsetArrays(allQuestions, allAnswers);
    subscriber.next(await sendOneShotToServer(questionsFirstHalf, answersFirstHalf))
    subscriber.next(await sendOneShotToServer(questionsSecondHalf, answersSecondHalf))

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

const getSubsetArrays = (questions, answers) => {
  //create an array of indices
  const indices = Array.from({ length: questions.length }, (_, i) => i);

  // Shuffle the indices to randomize the order
  shuffleArray(indices);

  // Calculate the split point (e.g., 50%)
  const splitPoint = Math.floor(indices.length / 2);

  // Split the indices into two arrays
  const firstHalfIndices = indices.slice(0, splitPoint);
  const secondHalfIndices = indices.slice(splitPoint);

  // Create two new arrays using the split indices
  const questionsFirstHalf = firstHalfIndices.map((index) => questions[index]);
  const questionsSecondHalf = secondHalfIndices.map((index) => questions[index]);

  const answersFirstHalf = firstHalfIndices.map((index) => answers[index]);
  const answersSecondHalf = secondHalfIndices.map((index) => answers[index]);

  return {
    questionsFirstHalf,
    questionsSecondHalf,
    answersFirstHalf,
    answersSecondHalf,
  };
};

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}