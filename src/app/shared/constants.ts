export const TEXT_MODAL = {
  add: {
    titleModal: 'Добавление сообщения',
    buttonText: 'Добавить',
  },
  edit: {
    titleModal: 'Редактирование сообщения',
    buttonText: 'Изменить',
  },
  delete: {
    titleModal: 'Удаление сообщения',
    bodyText: 'Вы уверены, что хотетите удалить данное сообщение?',
    buttonText: 'Удалить',
  },
};

export const LIMIT_CHARACTERS = 100;

export const enum NOTIFICATION {
  MESSAGE_ADD = 'Сообщение добавлено',
  MESSAGE_EDIT = 'Сообщение изменено',
  MESSAGE_DELETE = 'Сообщение удалено',
  MESSAGE_LOAD_DATA = 'Данные загружены',
  MESSAGE_LOAD_CONFIG = 'Конфигурация загружена',
  MESSAGE_NO_MATCHES = 'Совпадений не найдено',
  MESSAGE_DONT_SAVE = 'Изменения не внесены',
}

export const toastrConfig = {
  timeOut: 1500,
  positionClass: 'toast-bottom-left',
  preventDuplicates: true,
};
