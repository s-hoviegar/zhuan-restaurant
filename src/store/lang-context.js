import React, { useReducer } from "react";
import { IntlProvider } from "react-intl";

import English from "../lang/en.json";
import Persian from "../lang/fa.json";

const LangContext = React.createContext({
  lang: "",
  messages: null,
  selectLang: (lang) => {},
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

  const langContext = {
    lang: langState.lang,
    messages: langState.messages,
    selectLang: selectLangHandler,
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
