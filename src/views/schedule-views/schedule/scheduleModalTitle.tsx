interface ScheduleModalTitleProps {
  title: string,
  status: string,
}
const ScheduleModalTitle = ({title, status}: ScheduleModalTitleProps) => {
  return (
    <div className="d-flex justify-content-between">
      <h5 className="mr-3 text-text-capitalize"><strong>{title}</strong></h5>
      <div className="schedule-status-wrapper">{status}</div>
    </div>
  );
};

export default ScheduleModalTitle;