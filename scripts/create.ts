import { setupAnswer } from './answer';
module.exports = {
  handler: async () => {
    await setupAnswer();
  },
};
