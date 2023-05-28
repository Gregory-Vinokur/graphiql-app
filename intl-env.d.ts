import IMessageID from './lang/en-US';

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof IMessageID;
    }
  }
}
