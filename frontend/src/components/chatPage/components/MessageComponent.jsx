// import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { getMessagesOfCurrentChannel } from '../../../slices/messagesSlice.js';
import { getCurrentChannel } from '../../../slices/channelsSlice.js';
import MessageForm from './MessageForm.jsx';

const MessageComponent = () => {
  // const { t } = useTranslation();
  const messages = useSelector(getMessagesOfCurrentChannel);
  const currentChannel = useSelector(getCurrentChannel);

  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel?.name}
            </b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              :
              {` ${message.body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </Col>
  );
};

export default MessageComponent;
