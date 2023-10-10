import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';

const Transaction = lazy(() => import('./transaction/index'));
const ViewPaymentModal = lazy(() => import('./transaction/viewTransactionModal'));

export const TransactionViews = () => {
  const [searchParams, setSearchParams] = useSearchParams({ 
    paymentId: '', 
    modal_mode: 'show_transaction', 
  });
  const onOpenModal = (param: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('paymentId', param ?? '');
    setSearchParams(nextSearchParams);
  }

  const onCloseModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('paymentId');
    nextSearchParams.delete('modal_mode');
    setSearchParams(nextSearchParams);
  }

  const paymentId = searchParams.get('paymentId');
  const isOpen = Boolean(paymentId);

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Transaction onOpenModal={onOpenModal} title="Transactions"/>} />
        </Routes>
        {
          isOpen &&
          <ViewPaymentModal title='View Template' paymentId={paymentId} onClose={onCloseModal} isOpen={isOpen} />
        }
      </Suspense>
    </div>
  )
}

export default TransactionViews;

