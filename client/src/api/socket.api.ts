import { io } from 'socket.io-client';
import { MessageType } from 'types/types';

let serverMessageSubscribers = [] as Array<(message: MessageType) => void>;
let unreadMessagesSubscribers = [] as Array<(unreadMessagesCount: number) => void>;
let notAuthorizedSubscribers = [] as Array<() => void>;
let connectSubscribers = [] as Array<() => void>;

const socket = io(
  process.env.REACT_APP_API_URL || 'http://localhost:5000/',
  { withCredentials: true, autoConnect: false, reconnection: true },
);

// handle dialog message from server
type ServerMessageResponseType = { dialogId: string, message: MessageType }
const handleServerMessage = (serverMessageResponse: ServerMessageResponseType) => {
  serverMessageSubscribers.forEach((s) => s(serverMessageResponse.message));
};
socket.on('server-message', handleServerMessage);

// handle unread message notification from server
type UnreadMessagesResponseType = { unreadMessagesCount: number }
const handleUnreadMessages = (unreadMessagesResponse: UnreadMessagesResponseType) => {
  unreadMessagesSubscribers.forEach(
    (s) => s(unreadMessagesResponse.unreadMessagesCount),
  );
};
socket.on('unread-message', handleUnreadMessages);

// handle not authorized event
const handleNotAuthorized = () => {
  notAuthorizedSubscribers.forEach(async (s) => s());
};
socket.on('not-authorized', handleNotAuthorized);

const handleConnect = () => {
  connectSubscribers.forEach((s) => s());
};
socket.on('connect', handleConnect);

export const socketApi = {
  connect() {
    if (!socket.connected) socket.connect();
  },
  disconnect() {
    if (socket.connected) {
      socket.disconnect();
      connectSubscribers = [];
      serverMessageSubscribers = [];
      unreadMessagesSubscribers = [];
      notAuthorizedSubscribers = [];
    }
  },

  subscribe(
    connectCallback: () => void,
    serverMessageCallback: (message: MessageType) => void,
    unreadMessagesCallback: (unreadMessagesCount: number) => void,
    notAuthorizedCallback: () => void,
  ) {
    connectSubscribers.push(connectCallback);
    serverMessageSubscribers.push(serverMessageCallback);
    unreadMessagesSubscribers.push(unreadMessagesCallback);
    notAuthorizedSubscribers.push(notAuthorizedCallback);
  },

  unsubscribe(
    connectCallback: () => void,
    serverMessageCallback: (message: MessageType) => void,
    unreadMessagesCallback: (unreadMessagesCount: number) => void,
    notAuthorizedCallback: () => void,
  ) {
    connectSubscribers = connectSubscribers.filter((s) => s !== connectCallback);
    serverMessageSubscribers = serverMessageSubscribers
      .filter((s) => s !== serverMessageCallback);
    unreadMessagesSubscribers = unreadMessagesSubscribers
      .filter((s) => s !== unreadMessagesCallback);
    notAuthorizedSubscribers = notAuthorizedSubscribers
      .filter((s) => s !== notAuthorizedCallback);
  },
  sendMessage(message: string, dialogId: string) {
    socket.emit('client-message', message, dialogId);
  },
};
