import { lazy, Suspense } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';

const Template = lazy(() => import(`./template/index`));
const TemplateBuild = lazy(() => import(`./template/builder`));
const ViewTemplateModal = lazy(() => import(`./template/viewTemplateModal`));

export const TemplateViews = () => {
  const [searchParams, setSearchParams] = useSearchParams({ templateId: '', modal_mode: 'show_template', });

  const onOpenModal = (param: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('templateId', param ?? '');
    setSearchParams(nextSearchParams);
  }

  const onCloseModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('templateId');
    nextSearchParams.delete('modal_mode');
    setSearchParams(nextSearchParams);
  }

  const templateId = searchParams.get('templateId');
  const isOpen = Boolean(templateId);

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Template onOpenModal={onOpenModal} title="Templates"/>} />
          <Route path="/builder/:id" element={<TemplateBuild onOpenModal={onOpenModal} title="Template Build"/>} />
        </Routes>
        <ViewTemplateModal title='View Template' templateId={templateId} onClose={onCloseModal} isOpen={isOpen} />
      </Suspense>
    </div>
  )
}

export default TemplateViews;

