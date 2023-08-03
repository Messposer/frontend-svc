import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from 'components/Loading';

const Chat = lazy(() => import(`./chat`));
const SingleChat = lazy(() => import(`./chat/singleChat`));
const Create = lazy(() => import(`./chat/create`));
const Continue = lazy(() => import(`./chat/continue`));

export const ChatViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Routes>
        <Route path="/" element={<Chat title="Chats"/>} />
        <Route path="/:id" element={<SingleChat title="Chats"/>} />
        <Route path="/compose" element={<Create title="New Chat"/>} />
        <Route path="/continue-chat" element={<Continue title="Continue Chat"/>} />
      </Routes>
    </Suspense>
  )
}

export default ChatViews;

