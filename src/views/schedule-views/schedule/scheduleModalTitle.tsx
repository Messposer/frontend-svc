interface ScheduleModalTitleProps {
  title: string,
  status: string,
}
const ScheduleModalTitle = ({title, status}: ScheduleModalTitleProps) => {
  return (
    <div className="d-flex justify-content-between">
      <h6 className="mr-3">{title}</h6>
      <div className="schedule-status-wrapper">{status}</div>
    </div>
  );
};

export default ScheduleModalTitle;