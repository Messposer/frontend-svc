import { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useLoading } from "hooks/useLoading";
import ContactService from "services/ContactService";
import Loading from "components/Loading";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { HandleErrors } from "services/error/handleErrors";
import { BroadCastType, ContactType } from "redux/types";
import { ColumnsType } from "antd/es/table";
import UserService from "services/UserService";
import { CreateUserContactType } from "services/types/ContactServiceType";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import FilterInput from 'components/Input/filterInput';
import { toast } from "sonner";

interface AddContactToBroadcastModalProps {
  title: string;
  broadCastId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const AddContactToBroadcastModal = ({ 
  isOpen = false, 
  onClose, 
  broadCastId,
  title 
}: AddContactToBroadcastModalProps) => {
  useDocumentTitle(title);
  const [loading, withLoading] = useLoading();
  const [broadCast, setBroadCast] = useState<BroadCastType>();
  const [errorMessage, setErrorMessage] = useState(null);
	const [contacts, setContacts] = useState<ContactType[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
	const [filterValue, setFilterValue] = useState<string>('');

  const columns: ColumnsType<ContactType> = [
		Table.EXPAND_COLUMN,
		{ title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
		{ title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Phone', dataIndex: 'number', key: 'number' },
	];

  const filteredContacts = contacts.filter((contact: ContactType) =>
    `${contact.first_name} ${contact.last_name} ${contact.email} ${contact.number}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

  const getContacts = async () => {
		try {
			const contacts = await withLoading(UserService.getUserContacts());
			setContacts(contacts);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  const getBroadCast = async () => {
		try {
			const broadCast = await withLoading(ContactService.getBroadCast(broadCastId));
			setBroadCast(broadCast);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  const getContactsInGroup = async () => {
		try {
			const contactIds = await withLoading(UserService.getUserContactsInGroup(broadCastId));
			setSelectedRowIds(contactIds);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  useEffect(() => {
		getContacts();
    getContactsInGroup();
    getBroadCast();
  }, []);

  const handleAddToGroup = async () => {
    try {
      const createUserContactPayload: CreateUserContactType = {
        contactIds: [...new Set(selectedRowIds)],
        groupId: Number(broadCastId),
      }
			await withLoading(ContactService.createUserContact(createUserContactPayload));
			onClose();
		} catch (error:any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  return (
    <Modal
      title={`Add Contacts to ${broadCast?.name} Broadcast`}
      centered
      width={900}
      open={isOpen}
      onCancel={onClose}
      onOk={handleAddToGroup}
    >
      {loading && <Loading />}
      {!loading && (
        <>
          <hr />
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h4 className="text-sub-title">Click ok to save changes</h4>
            <FilterInput 
              filterValue={filterValue} 
              setFilterValue={setFilterValue} 
              placeholder='Filter contacts'
            />
          </div>
          <Table
            columns={columns}
            rowSelection={{
              onSelect: (row, selected) => {
                if (selected) {
                  toast.success(`${row?.first_name} ${row?.last_name} has been added to ${broadCast?.name} successfully`)
                  setSelectedRowIds(prevIds => [...prevIds, row.id]);
                } else {
                  toast.info(`${row?.first_name} ${row?.last_name} has been removed from ${broadCast?.name} successfully`)
                  setSelectedRowIds(prevIds => prevIds.filter(id => id !== row.id));
                }
              },
              onSelectAll: (selected, selectedRows) => {
                if (selected) {
                  const selectedIds = selectedRows.map(row => row.id);
                  const uniqueIds = Array.from(new Set(selectedIds));
                  setSelectedRowIds(uniqueIds);
                  toast.success(`All contacts has been added to ${broadCast?.name} successfully`)
                } else {
                  setSelectedRowIds([]);
                  toast.info(`All contacts has been removed from ${broadCast?.name} successfully`)
                }
              },
              selectedRowKeys: [...selectedRowIds]
            }}
            loading={loading}
            rowKey={(contact) => contact.id}
            dataSource={filteredContacts}
          />
        </>
      )}
      {errorMessage &&
        <HandleErrors errors={errorMessage} />
      }
    </Modal>
  )
};

export default AddContactToBroadcastModal;
