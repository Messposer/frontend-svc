import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from 'components/Loading';

const Chat = lazy(() => import(`./dashboard`));

export const ChatViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Routes>
        <Route path="/" element={<Chat title="Chats"/>} />
      </Routes>
    </Suspense>
  )
}

export default ChatViews;

