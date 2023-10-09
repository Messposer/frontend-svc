import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from 'components/Loading';

const Dashboard = lazy(() => import(`./dashboard`));

export const DashboardViews = () => {
  return (
    <div className="bg-background pt-4">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Dashboard title="Dashboard"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default DashboardViews;

