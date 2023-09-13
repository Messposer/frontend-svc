import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';

const BroadCast = lazy(() => import(`./broadcast`));
const CreateBroadCast = lazy(() => import(`./broadcast/create`));
const UpdateBroadCast = lazy(() => import(`./broadcast/update`));

export const BroadCastViews = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<BroadCast title="BroadCast List"/>} />
          <Route path="/create" element={<CreateBroadCast title="Create a BroadCast List"/>} />
          <Route path="/:id" element={<UpdateBroadCast title="Update a BroadCast List"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default BroadCastViews;

