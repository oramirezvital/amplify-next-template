"use client";

import { useState, useEffect } from "react";
import { downloadData } from 'aws-amplify/storage';

export default function App() {
  
  
  const result =   downloadData({
    path: 'chats/transcript-2023-12-17T10-00-00-WIM8902.json',
    options: {
  
      // Specify a target bucket using name assigned in Amplify Backend
      bucket: 'chat-analyzer-output'
    }
  }).result;


  return (
    <main>
      <h1>Chat</h1>
      
    </main>
  );
}