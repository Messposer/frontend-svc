import { useEffect, useState } from "react";
import { Alert, Modal } from "antd";
import { HandleErrors } from "services/error/handleErrors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { ContactType, ScheduledType } from "redux/types";
import ScheduleService from "services/ScheduleService";
import { useLoading } from "hooks/useLoading";
import { ERROR_MESSAGES } from "configs/AppConfig";
import ContactService from "services/ContactService";
import ScheduleModalTitle from "./scheduleModalTitle";
import moment from 'moment';
import AlertInfo from "components/Dashboard/AlertInfo";

interface ViewScheduleMessageModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void,
  scheduleId: string | null,
}

const ViewScheduleMessageModal = ({title, isOpen = false, onClose, scheduleId}: ViewScheduleMessageModalProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, withLoading] = useLoading();
  const [contactLoading, withContactLoading] = useLoading();
	const [schedule, setSchedule] = useState<ScheduledType>();
  const [contacts, setContacts] = useState<ContactType[]>([]);
  useDocumentTitle(title);

  const getSchedules = async () => {
		try {
			const _schedule = await withLoading(ScheduleService.getSchedule(scheduleId));
      const contacts = await withContactLoading(ContactService.getContactsFromGroupId(_schedule?.contactGroup?.id))
			setContacts(contacts);
			setSchedule(_schedule);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}
  
  const displayContacts = () => {
    let displayText;
    const formattedNames = contacts?.map(contact => `${contact.first_name} ${contact.last_name}`);
    if (formattedNames.length <= 10) {
      return displayText = formattedNames.join(', ');
    } else {
      const remainingCount = formattedNames.length - 10;
      displayText = formattedNames.slice(0, 9).join(', ') + ` and ${remainingCount} more`;
    }
  }

	useEffect(() => {
    if(scheduleId){
      getSchedules();
    }
  }, [scheduleId]);

  return (
    <Modal
      width={1000}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="row">
        <div className="col-md-8">
          <ScheduleModalTitle title={schedule?.name || "Schedule Name"} status={schedule?.status || "waiting"} />
          <div className="mt-4">
            Keep in mind that you'll need to have Bootstrap CSS properly linked in 
            your project for this class to work. If you haven't included Bootstrap 
            in your project yet, you can
          </div>
          <div className="p-3 mt-3 card">
            <h5 className="card-title card-group-title">Group Details</h5>
            <h6 className="card-group-details">Name: {schedule?.contactGroup?.name}</h6>
            <h6 className="card-group-details">Note: {schedule?.contactGroup?.note}</h6>
            <h6 className="card-group-details">This contact group has {contacts?.length} total contacts which includes:</h6>
            <p className="font-weight-bold">{displayContacts()}</p>
          </div>  
          <h6 className="mt-3">Schedule Details</h6>
          <div className="mt-3 text-capitalize">
            Scheduled Date: {moment(schedule?.created_at).format('Do MMMM, YYYY')} <br />
          </div>

          <h6 className="mt-3">Schedule Message:</h6>
          <div className="mt-3 text-capitalize">
            {schedule?.messageScheduler?.text}
          </div>
        </div>
        <div className="mt-5 col-md-4">
          <AlertInfo />
        </div>
      </div>
      {errorMessage &&
        <HandleErrors errors={errorMessage} />
      }
    </Modal>
  )
};

export default ViewScheduleMessageModal;