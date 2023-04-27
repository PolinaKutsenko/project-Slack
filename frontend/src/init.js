import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './components/App';
import ru from './locales/ru.js';
import store from './slices/index.js';
import { ApiContext } from './hooks/index.js';
import buildChatApi from './api/buildChatApi.js';

const init = (socket) => {
  const chatApi = buildChatApi(socket);

  const i18nextInstance = i18n.createInstance();
  i18nextInstance.use(initReactI18next).init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <Provider store={store}>
      <ApiContext.Provider value={chatApi}>
        <I18nextProvider i18n={i18nextInstance}>
          <App />
        </I18nextProvider>
      </ApiContext.Provider>
    </Provider>
  );
};

export default init;
