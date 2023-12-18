const axios = require('axios');

const token = '6803978849:AAG1mCvJKpTUe2R5gcsXB9ZemuOUXMsPUlQ'; // Replace with your Telegram bot token
const chatId = '-1001936016561'; // Replace with your group chat ID
const url = `https://api.telegram.org/bot${token}/sendMessage`;

const commitMessage = process.argv[2]; 
const commitAccount = process.argv[3];

const message = `Liftoff! 🚀 ${commitAccount} added to the code base: \"${commitMessage}\".`;

axios.post(url, {
    chat_id: chatId,
    text: message,
    reply_to_message_id: '4127'
  })
  .then(response => {
    console.log('Message posted within the topic');
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
