import React, { useReducer } from "react";
import { IntlProvider } from "react-intl";

import English from "../lang/en.json";
import Persian from "../lang/fa.json";

const LangContext = React.createContext({
  lang: "",
  messages: null,
  selectLang: (lang) => {},
  changeLang: () => {},
});

const defaultLangState = {
  lang: "en",
  messages: English,
};

const langReducer = (state, action) => {
  if (action.type === "SELECT") {
    if (action.lang === "en") {
      return {
        lang: action.lang,
        messages: English,
      };
    } else {
      return {
        lang: action.lang,
        messages: Persian,
      };
    }
  }

  if (action.type === "CHANGE") {
    if (state.lang === "en") {
      return {
        lang: "fa",
        messages: Persian,
      };
    } else {
      return {
        lang: "en",
        messages: English,
      };
    }
  }

  return defaultLangState;
};

export const LangContextProvider = (props) => {
  const [langState, dispatchLangAction] = useReducer(
    langReducer,
    defaultLangState
  );

  const selectLangHandler = (event) => {
    // console.log(event.target.value);
    dispatchLangAction({ type: "SELECT", lang: event.target.value });
  };

  const changeLangHandler = (event) => {
    // console.log(event.target.value);
    dispatchLangAction({ type: "CHANGE" });
  };

  const langContext = {
    lang: langState.lang,
    messages: langState.messages,
    selectLang: selectLangHandler,
    changeLang: changeLangHandler,
  };

  return (
    <LangContext.Provider value={langContext}>
      <IntlProvider messages={langContext.messages} locale={langContext.lang}>
        {props.children}
      </IntlProvider>
    </LangContext.Provider>
  );
};

export default LangContext;
