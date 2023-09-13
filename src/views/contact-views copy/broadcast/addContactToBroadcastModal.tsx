import { useEffect, useState } from "react";
import { Button, Modal, Table, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useLoading } from "hooks/useLoading";
import ContactService from "services/ContactService";
import Loading from "components/Loading";
import { CONTACT_GROUP_PREFIX_PATH, ERROR_MESSAGES } from "configs/AppConfig";
import { HandleErrors } from "services/error/handleErrors";
import { BroadCastType, ContactType } from "redux/types";
import { ColumnsType } from "antd/es/table";
import UserService from "services/UserService";
import { CreateUserContactType } from "services/types/ContactServiceType";

interface AddContactToBroadcastModalProps {
  showAddContactToBroadcastModal: boolean;
  toggleAddContactToBroadcastModal: () => void;
  broadCast: BroadCastType;

}

const AddContactToBroadcastModal = ({ showAddContactToBroadcastModal = false, toggleAddContactToBroadcastModal, broadCast }: AddContactToBroadcastModalProps) => {
  const [loading, withLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
	const [contacts, setContacts] = useState<ContactType[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const columns: ColumnsType<ContactType> = [
		Table.EXPAND_COLUMN,
		{ title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
		{ title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Phone', dataIndex: 'number', key: 'number' },
	];

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

  const getContactsInGroup = async () => {
		try {
			const contactIds = await withLoading(UserService.getUserContactsInGroup(broadCast?.id));
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
    return () => {
      setContacts([]);
      setSelectedRowIds([]);
    }
  }, []);

  const handleAddToGroup = async () => {
    try {
      const createUserContactPayload: CreateUserContactType = {
        contactIds: selectedRowIds,
        groupId: broadCast?.id,
      }
			await withLoading(ContactService.createUserContact(createUserContactPayload));
			toggleAddContactToBroadcastModal();
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
      open={showAddContactToBroadcastModal}
      onCancel={toggleAddContactToBroadcastModal}
      onOk={handleAddToGroup}
    >
      {loading && <Loading />}
      {!loading && (
        <Table
          columns={columns}
          rowSelection={{
            onSelect: (row, selected) => {
              if (selected) {
                setSelectedRowIds(prevIds => [...prevIds, row.id]);
              } else {
                setSelectedRowIds(prevIds => prevIds.filter(id => id !== row.id));
              }
            },
            onSelectAll: (selected, selectedRows) => {
              if (selected) {
                const selectedIds = selectedRows.map(row => row.id);
                const uniqueIds = Array.from(new Set(selectedIds));
                setSelectedRowIds(uniqueIds);
              } else {
                setSelectedRowIds([]);
              }
            },
            selectedRowKeys: [...selectedRowIds]
          }}
          loading={loading}
          rowKey={(contact) => contact.id}
          dataSource={contacts}
        />
      )}
      {errorMessage &&
        <HandleErrors errors={errorMessage} />
      }
    </Modal>
  )
};

export default AddContactToBroadcastModal;