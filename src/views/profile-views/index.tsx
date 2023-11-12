import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';

const Profile = lazy(() => import('./profile'));

export const ProfileViews = () => {

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Profile title="Profile"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default ProfileViews;

