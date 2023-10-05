import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';
import AddMediaModal from './media/addMediaModal';

const Media = lazy(() => import(`./media/index`));
const ViewMediaModal = lazy(() => import(`./media/viewMediaModal`));

export const MediaViews = () => {
  const [searchParams, setSearchParams] = useSearchParams({ 
    media_Id: '', 
    modal_mode: '', 
  });
  const onOpenModal = (param: string, type: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('media_Id', param ?? '');
    nextSearchParams.set('modal_mode', type ?? '');
    setSearchParams(nextSearchParams);
  }

  const onCloseModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('media_Id');
    nextSearchParams.delete('modal_mode');
    setSearchParams(nextSearchParams);
  }

  const mediaId = searchParams.get('media_Id');
  const modal_mode = searchParams.get('modal_mode');
  const isOpen = Boolean(mediaId);
  const isAddMediaModalOpen = modal_mode === 'add';
  const isShowMediaModalOpen = isOpen && modal_mode === 'show';

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Media onOpenModal={onOpenModal} title="Media"/>} />
        </Routes>
        {
          isShowMediaModalOpen &&
          <ViewMediaModal title='View Media' mediaId={mediaId} onClose={onCloseModal} isOpen={isShowMediaModalOpen} />
        }
        {
          isAddMediaModalOpen &&
          <AddMediaModal title='Add Media' onClose={onCloseModal} isOpen={isAddMediaModalOpen} />
        }
      </Suspense>
    </div>
  )
}

export default MediaViews;

