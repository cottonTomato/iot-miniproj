import { onMessagePublished } from 'firebase-functions/v2/pubsub';
import * as logger from 'firebase-functions/logger';

export const deviceMessageHandler = onMessagePublished(
  'test-topic',
  (_event) => {
    logger.debug('Log happened!');
  }
);
