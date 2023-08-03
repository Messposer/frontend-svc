import { APP_NAME } from "configs/AppConfig";
import { useEffect, useState } from "react";

const useDocumentTitle = (title: string) => {
  const [document_title, setDoucmentTitle] = useState(title);
   useEffect(() => {
    document.title = `${document_title || ''} - ${APP_NAME}`; 
  },[document_title]);

  return [document_title, setDoucmentTitle];
};

export {useDocumentTitle};