import { onMessagePublished } from 'firebase-functions/v2/pubsub';
// import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

async function sendPushNotification(body: string, expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Bin Notify',
    body,
    data: {},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

// export const sendNotification = onRequest(async (_req, res) => {
//   try {
//     logger.log('Sending Message');
//     await sendPushNotification('ExponentPushToken[2wc2Z7Mu0l9qF7NocIBkTt]');
//     logger.log('Message Sent');
//
//     res.status(200).json({
//       status: 'success',
//       message: 'Notification Sent Successfully',
//     });
//   } catch (err) {
//     logger.error('Message Sending Failed');
//     logger.error(`Error: ${err}`);
//     res.status(500).json({
//       status: 'failed',
//       message: 'Notification Sending Failed',
//     });
//   }
// });

export const deviceMessageHandler = onMessagePublished(
  'test-topic',
  async (_event) => {
    try {
      // const name = event.data.message.json.name;
      logger.log('Sending Message');
      await sendPushNotification(
        // `Device: ${name}`,
        'test 2 see u',
        'ExponentPushToken[2wc2Z7Mu0l9qF7NocIBkTt]'
      );
      logger.log('Message Sent');
    } catch (err) {
      if (err instanceof ReferenceError) {
        logger.error('PubSub message was not JSON', err);
      } else {
        logger.error('Message Sending Failed');
        logger.error(`Error: ${err}`);
      }
    }
  }
);
