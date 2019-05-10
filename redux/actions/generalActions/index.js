
import { syncTypes } from '../../types';
import en from '../../../translations/en';
import tr from '../../../translations/tr';

export function onChangeLanguageAction(payload) {
  return {
    type: syncTypes.CHANGE_LANGUAGE,
    payload,
  };
}

export function onChangeLanguage(locale) {
  return (dispatch) => {
    switch (locale) {
      case 'tr': dispatch(onChangeLanguageAction({ messages: tr, locale })); break;
      case 'en': dispatch(onChangeLanguageAction({ messages: en, locale })); break;
      default: dispatch(onChangeLanguageAction({ messages: tr, locale })); break;
    }
  };
}
