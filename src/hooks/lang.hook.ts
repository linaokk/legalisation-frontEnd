import { useContext } from "react";
import { GlobalContext } from "../contexts/global.context";
import { messages } from "../intl/intl.index";

export const useLang = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      "No context found, useIntl has to be construct within GlobalContextProvider"
    );

  const {
    intl: { lang, setLang },
  } = context;

  return { lang, setLang, messages: messages[lang] };
};
