import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';

const Template = lazy(() => import(`./template/index`));
const ViewTemplateModal = lazy(() => import(`./template/viewTemplateModal`));

export const TemplateViews = () => {
  const [searchParams, setSearchParams] = useSearchParams({ 
    templateId: '', 
    modal_mode: 'show_template', 
    viewType: '' 
  });
  const onOpenModal = (param: string, type: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('templateId', param ?? '');
    nextSearchParams.set('viewType', type ?? '');
    setSearchParams(nextSearchParams);
  }

  const onCloseModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('templateId');
    nextSearchParams.delete('modal_mode');
    nextSearchParams.delete('viewType');
    setSearchParams(nextSearchParams);
  }

  const templateId = searchParams.get('templateId');
  const isOpen = Boolean(templateId);
  const viewType = searchParams.get('viewType');

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Template onOpenModal={onOpenModal} title="Templates"/>} />
        </Routes>
        {
          viewType &&
          <ViewTemplateModal viewType={viewType} title='View Template' templateId={templateId} onClose={onCloseModal} isOpen={isOpen} />
        }
      </Suspense>
    </div>
  )
}

export default TemplateViews;

