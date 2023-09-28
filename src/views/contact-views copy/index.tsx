import { lazy, Suspense } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';

const BroadCast = lazy(() => import(`./broadcast`));
const CreateBroadCast = lazy(() => import(`./broadcast/create`));
const UpdateBroadCast = lazy(() => import(`./broadcast/update`));
const AddContactToBroadcastModal = lazy(() => import(`./broadcast/addContactToBroadcastModal`));

export const BroadCastViews = () => {
  const [searchParams, setSearchParams] = useSearchParams({ broadCastId: '', modal_mode: 'show_broadcast', });

  const onOpenModal = (param: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('broadCastId', param ?? '');
    setSearchParams(nextSearchParams);
  }

  const onCloseModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('broadCastId');
    nextSearchParams.delete('modal_mode');
    setSearchParams(nextSearchParams);
  }

  const broadCastId = searchParams.get('broadCastId');
  const isOpen = Boolean(broadCastId);

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<BroadCast onOpenModal={onOpenModal} title="BroadCast List"/>} />
          <Route path="/create" element={<CreateBroadCast title="Create a BroadCast List"/>} />
          <Route path="/:id" element={<UpdateBroadCast title="Update a BroadCast List"/>} />
        </Routes>
        {
          isOpen &&
          <AddContactToBroadcastModal title='View BroadCast Group' broadCastId={broadCastId} onClose={onCloseModal} isOpen={isOpen} />
        }
      </Suspense>
    </div>
  )
}

export default BroadCastViews;

