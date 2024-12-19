import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'chat-analyzer-output',
  access: (allow) => ({
    'chats/*': [
      allow.authenticated.to(['read','write']),
      allow.guest.to(['read','write'])
    ],
  })
});