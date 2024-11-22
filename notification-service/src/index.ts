// import { onMessagePublished } from 'firebase-functions/v2/pubsub';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
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

export const sendNotification = onRequest(async (_req, res) => {
  try {
    logger.log('Sending Message');
    await sendPushNotification('ExponentPushToken[2wc2Z7Mu0l9qF7NocIBkTt]');
    logger.log('Message Sent');

    res.status(200).json({
      status: 'success',
      message: 'Notification Sent Successfully',
    });
  } catch (err) {
    logger.error('Message Sending Failed');
    logger.error(`Error: ${err}`);
    res.status(500).json({
      status: 'failed',
      message: 'Notification Sending Failed',
    });
  }
});

// const _deviceMessageHandler = onMessagePublished(
//   'test-topic',
//   (_event) => {
//     logger.debug('Log happened!');
//   }
// );
