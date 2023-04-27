import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Container } from 'react-bootstrap';

import { useAuth } from '../../hooks/index.js';
import { fetchChannels } from '../../slices/channelsSlice.js';
import { getModalOpenedStatus } from '../../slices/modalsSlice.js';
import ChannelComponent from './components/ChannelComponent.jsx';
import MessageComponent from './components/MessageComponent.jsx';
import Modal from './components/modals/Modal.jsx';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const header = auth.getAuthHeader();
  const isModalOpen = useSelector(getModalOpenedStatus);

  useEffect(() => {
    console.log('!!dispatch');
    dispatch(fetchChannels(header));
  }, []);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelComponent />
          <MessageComponent />
        </Row>
      </Container>
      {isModalOpen && <Modal />}
    </>
  );
};

export default ChatPage;
