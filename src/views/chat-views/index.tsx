import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from 'components/Loading';

const Chat = lazy(() => import(`./chat`));

export const ChatViews = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Chat title="Chats"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default ChatViews;

