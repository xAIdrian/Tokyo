import React from 'react';

export function fixNewLines(string) {
  return string.replace(/\\n /g, '\n').replace(/\\n/g, '\n');
}

function generateUUID() {
  let uuid = '';
  const chars = '0123456789abcdef';

  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uuid += chars[randomIndex];
    if (i === 7 || i === 11 || i === 15 || i === 19) {
      uuid += '-';
    }
  }

  return uuid;
}

function RandomUUID() {
  const uuid = generateUUID();

  return (
    <div>
      <p>Random UUID: {uuid}</p>
    </div>
  );
}

export default generateUUID;
