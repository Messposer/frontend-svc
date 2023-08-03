import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from 'components/Loading';

const Contact = lazy(() => import(`./contact`));
const Create = lazy(() => import(`./contact/create`));
const Update = lazy(() => import(`./contact/update`));

export const ChatViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Routes>
        <Route path="/" element={<Contact title="Contacts"/>} />
        <Route path="/:id" element={<Update title="Update Contact"/>} />
        <Route path="/new" element={<Create title="Create Contact"/>} />
      </Routes>
    </Suspense>
  )
}

export default ChatViews;

