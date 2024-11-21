"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceMessageHandler = void 0;
const pubsub_1 = require("firebase-functions/v2/pubsub");
const logger = require("firebase-functions/logger");
exports.deviceMessageHandler = (0, pubsub_1.onMessagePublished)('test-topic', (_event) => {
    logger.debug('Log happened!');
});
//# sourceMappingURL=index.js.map