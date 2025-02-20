import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// create pusher server instance
/*export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'mt1',
  useTLS: true,
});*/

export const pusherServer = new PusherServer({
  appId: '1944087',
  key: 'fce44556e6f6dfa383c3',
  secret: '134da508b304fdb6a688',
  cluster: 'mt1',
  useTLS: true,
});

// create pusher client instance
export const pusherClient = new PusherClient(
  //process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  'fce44556e6f6dfa383c3',
  {
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax',
    },
    cluster: 'mt1',
  }
);


