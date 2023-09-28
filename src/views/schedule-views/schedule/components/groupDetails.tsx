import { ContactType, ScheduledType } from "redux/types";
import { displayContactsInfo } from "utils/schedules/displayContacts";

interface GroupDetailsProps {
  schedule: ScheduledType;
  contacts: ContactType[]
}
const GroupDetails = ({ schedule, contacts }: GroupDetailsProps) => {
  return (
    <div className="p-3 mt-3 card">
      <h5 className="card-title card-group-title">Group Details</h5>
      <hr />
      <h6 className="card-group-details">Name: <strong>{schedule?.contactGroup?.name}</strong></h6>
      <h6 className="card-group-details">Note: <strong>{schedule?.contactGroup?.note}</strong></h6>
      <h6 className="card-group-details">This contact group has <strong>{contacts?.length}</strong> total contacts which includes:</h6>
      <p className="font-weight-bold"><strong>{displayContactsInfo(contacts)}</strong></p>
    </div>  
  );
};

export default GroupDetails;