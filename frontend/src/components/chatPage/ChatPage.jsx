import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Container } from 'react-bootstrap';

import useAuth from '../../hooks/index.js';
import { fetchChannels } from '../../slices/channelsSlice.js';
import ChannelComponent from './components/ChannelComponent.jsx';
import MessageComponent from './components/MessageComponent.jsx';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const header = auth.getAuthHeader();

  useEffect(() => {
    dispatch(fetchChannels(header));
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelComponent />
        <MessageComponent />
      </Row>
    </Container>
  );
};

export default ChatPage;
