import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';

const Subscription = lazy(() => import(`./subscription/index`));
const SubscriptionStatus = lazy(() => import(`./subscription/status`));

export const UserSubscriptionViews = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Subscription title="Manage Subscription"/>} />
          <Route path="/status" element={<SubscriptionStatus title="Subscription Status"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default UserSubscriptionViews;

