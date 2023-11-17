import { lazy, Suspense } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';

const Settings = lazy(() => import('./settings'));
const CreateSenderEmailModal = lazy(() => import(`./settings/components/createSenderEmailModal`));

export const SettingsViews = () => {
  const [searchParams, setSearchParams] = useSearchParams({ sender_email_id: '', modal_mode: '', });

  const onOpenModal = (param: string, type: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('sender_email_id', param ?? '');
    nextSearchParams.set('modal_mode', type ?? '');
    setSearchParams(nextSearchParams);
  }

  const onCloseModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('sender_email_id');
    nextSearchParams.delete('modal_mode');
    setSearchParams(nextSearchParams);
  }

  const senderEmailId = searchParams.get('sender_email_id');
  const modal_mode = searchParams.get('modal_mode');
  const isOpen = Boolean(senderEmailId);
  const isAddEnderEmailModalOpen = isOpen && modal_mode === 'add';
  const isShowEnderEmailModalOpen = isOpen && modal_mode === 'show';

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Settings title="Settings" onOpenModal={onOpenModal} senderEmailId={senderEmailId}/>} />
        </Routes>
        <CreateSenderEmailModal 
          title='Add Sender Email' 
          senderEmailId={senderEmailId} 
          onClose={onCloseModal} 
          isOpen={isAddEnderEmailModalOpen} 
        />
      </Suspense>
    </div>
  )
}

export default SettingsViews;

