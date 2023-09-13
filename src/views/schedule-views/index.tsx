import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';
import { useSearchParams } from 'react-router-dom';
import { ScheduledType } from 'redux/types';
import AddScheduleMessageModal from './schedule/addScheduleMessageModal';

const Schedule = lazy(() => import(`./schedule`));
const CreateSchedule = lazy(() => import(`./schedule/create`));
const ViewScheduleMessageModal = lazy(() => import(`./schedule/viewScheduleMessageModal`));

export const ScheduleViews = () => {
  const [searchParams, setSearchParams] = useSearchParams({ schedule_id: '', modal_mode: '', });

  const onOpenModal = (param: string, type: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('schedule_id', param);
    nextSearchParams.set('modal_mode', type);
    setSearchParams(nextSearchParams);
  }

  const onCloseModal = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('schedule_id');
    nextSearchParams.delete('modal_mode');
    setSearchParams(nextSearchParams);
  }

  const scheduleId = searchParams.get('schedule_id');
  const modal_mode = searchParams.get('modal_mode');
  const isOpen = Boolean(scheduleId);
  const isAddScheduleModalOpen = isOpen && modal_mode === 'add';
  const isShowScheduleModalOpen = isOpen && modal_mode === 'show';

  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Schedule onOpenModal={onOpenModal} title="Your Schedules"/>} />
          <Route path="/create" element={<CreateSchedule title="Create a Schedule"/>} />
        </Routes>
      </Suspense>
      <ViewScheduleMessageModal title='View Schedule' scheduleId={scheduleId} onClose={onCloseModal} isOpen={isShowScheduleModalOpen} />
      <AddScheduleMessageModal title='Add Schedule' scheduleId={scheduleId} onClose={onCloseModal} isOpen={isAddScheduleModalOpen} />
    </div>
  )
}

export default ScheduleViews;

