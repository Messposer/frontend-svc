import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { HandleErrors } from "services/error/handleErrors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { ContactType, ScheduledType } from "redux/types";
import ScheduleService from "services/ScheduleService";
import { useLoading } from "hooks/useLoading";
import { ERROR_MESSAGES } from "configs/AppConfig";
import ContactService from "services/ContactService";
import ScheduleModalTitle from "./scheduleModalTitle";
import moment from 'moment';
import RawHTMLComponent from 'components/RawHtml';
import { DAY_MONTH_YEAR } from "configs/dateFormat";
import { ContactScheduleType } from "services/types/ScheduleServiceType";
import { displayContactScheduleNames } from "utils/schedules/displayContactScheduleNames";
import GroupDetails from "./components/groupDetails";

interface ViewScheduleMessageModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void,
  scheduleId: string | null,
  onOpenModal: (id: string, type: string) => void,
}

const ViewScheduleMessageModal = ({title, isOpen = false, onClose, scheduleId, onOpenModal}: ViewScheduleMessageModalProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, withLoading] = useLoading();
  const [contactLoading, withContactLoading] = useLoading();
  const [contactScheduleLoading, withContactScheduleLoading] = useLoading();
	const [schedule, setSchedule] = useState<ScheduledType>();
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [contactSchedule, setContactSchedule] = useState<ContactScheduleType[]>([]);
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

  const getContactSchedule = async () => {
		try {
			const _contactSchedule = await withLoading(ScheduleService.getContactSchedule(scheduleId));
      setContactSchedule(_contactSchedule);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

	useEffect(() => {
    if(scheduleId){
      getSchedules();
      getContactSchedule();
    }
  }, [scheduleId]);

  return (
    <Modal
      width={1200}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="row">
        <div className="col-md-8">
          <ScheduleModalTitle title={schedule?.name || "Schedule Name"} status={schedule?.status || "waiting"} />
          <h5 className="mt-3">Schedule Details</h5>
          <hr />
          <div className="mt-3 text-capitalize">
            Scheduled For: <strong>{moment(schedule?.sendDate).format(DAY_MONTH_YEAR)} </strong><br />
            Scheduled Created on: <strong>{moment(schedule?.created_at).format(DAY_MONTH_YEAR)} </strong><br />
          </div>
          
          <h5 className="mt-3">Schedule Message:</h5>
          <hr />
          {
            schedule?.messageScheduler &&
            <div className="mt-3 text-capitalize">
              <RawHTMLComponent htmlContent={schedule?.messageScheduler?.text || ''} />
            </div>
          }
          {
            !schedule?.messageScheduler &&
            <>
              <p>No message is attached to this schedule, schedule would run unless you add a message to it</p>
              <Button type="primary" onClick={() => onOpenModal(String(schedule?.id), "add")}>Create a message</Button>
            </>
          }
        </div>
        <div className="mt-5 col-md-4">
          <div className="p-3 mt-3 card">
            <h5 className="card-title card-group-title">Schedule Report</h5>
            <hr />
            <h6 className="card-group-details">Total Contacts: <strong>{contacts?.length}</strong></h6>
            <h6 className="card-group-details">Total Sent: <strong>{contactSchedule?.length}</strong></h6>
            {
              contactSchedule.length > 0 &&
              <h6 className="card-group-details">Names of your contact that has received this schedule:</h6>
            }
            <p className="font-weight-bold"><strong>{displayContactScheduleNames(contactSchedule)}</strong></p>
          </div>  
  
          {schedule && <GroupDetails schedule={schedule} contacts={contacts} />}
        </div>
      </div>
      {errorMessage &&
        <HandleErrors errors={errorMessage} />
      }
    </Modal>
  )
};

export default ViewScheduleMessageModal;
