export default {
  translation: {
    layout: {
      slack_chat: 'Slack chat',
      exit_button: 'Выйти',
    },
    login_page: {
      username: 'Логин',
      password: 'Пароль',
      submit: 'Войти',
      auth_error: 'Ошибка авторизации. Неправильный логин или пароль',
      network_error: 'Ошибка сети',
      validation_errors: {
        username: {
          min: 'Логин должен быть не менее 6 символов',
          required: 'Пожалуйста, введите Ваш логин',
        },
        password: {
          min: 'Пароль должен быть не менее 6 символов',
          matches: 'Пароль содержит кириллицу или следующие символы: ,;:&()*%#-',
          required: 'Пожалуйста введите ваш пароль',
        },
      },
    },
    chat_page: {
      channels: {
        channels: 'Каналы',
      },
      messages: {
        write_message: 'Введите сообщение',
        send: 'Отправить',
      },
    },
    not_found_page: {
      page_not_found: 'Страница не найдена',
      but_you_can_go: 'Но вы можете перейти',
      to_home_page: 'на главную страницу',
    },
  },
};
