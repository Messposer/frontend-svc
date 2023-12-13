import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';

const Category = lazy(() => import(`./category`));
const Create = lazy(() => import(`./category/create`));
const Update = lazy(() => import(`./category/update`));

export const CategoryViews = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Category title="Contacts"/>} />
          <Route path="/:id" element={<Update title="Update Contact"/>} />
          <Route path="/create" element={<Create title="Create Contact"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default CategoryViews;

