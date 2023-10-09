import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';

const Subscription = lazy(() => import(`./subscription/index`));

export const UserSubscriptionViews = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Subscription title="Manage Subscription"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default UserSubscriptionViews;

