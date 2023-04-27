import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { getCurrentChannel } from '../../../slices/channelsSlice.js';
import { useChatApi, useAuth } from '../../../hooks';

const MessageForm = () => {
  const { t } = useTranslation();
  const inputEl = useRef();
  const chatApi = useChatApi();
  const auth = useAuth();

  const currentChannel = useSelector(getCurrentChannel);
  useEffect(() => inputEl.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup
        .string()
        .min(1, t('login_page.validation_errors.username.min'))
        .required(t('login_page.validation_errors.username.required')),
    }),
    onSubmit: (values) => {
      chatApi.sendMessage({
        body: values.body,
        channelId: currentChannel.id,
        username: auth.user.username,
      });
      values.body = '';
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          id="body"
          ref={inputEl}
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('chat_page.messages.write_message')}
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.body}
          onChange={formik.handleChange}
        />
        <button type="submit" className="btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
