import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';

const TemplateBuild = lazy(() => import(`./builder/builder`));
export const TemplateBuilderViews = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/:id" element={<TemplateBuild title="Template Build"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default TemplateBuilderViews;

