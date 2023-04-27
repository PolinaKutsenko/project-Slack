import store from '../slices/index.js';
import { actions as channelActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const buildChatApi = (socket) => {
  const sendMessage = (messageDataObj) => {
    socket.emit('newMessage', messageDataObj, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
  };

  const addNewChannel = (channelNameObj) => {
    socket.emit('newChannel', channelNameObj, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel creation failed');
      }
    });
  };

  const removeChannel = (channelIdObj) => {
    socket.emit('removeChannel', channelIdObj, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel removing failed');
      }
    });
  };

  const renameChannel = (channelDataObj) => {
    socket.emit('renameChannel', channelDataObj, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel removing failed');
      }
    });
  };

  socket.on('newMessage', (payload) => {
    console.log('payload', payload);
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => store.dispatch(channelActions.addChannel(payload)));
  socket.on('removeChannel', () => {});
  socket.on('renameChannel', () => {});

  return {
    sendMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default buildChatApi;
