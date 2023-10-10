import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PaymentType } from 'services/types/SubscriptionServiceType';
import { ERROR_MESSAGES } from 'configs/AppConfig';
import SubscriptionService from 'services/SubscriptionService';

interface TransactionProps {
	title: string,
  onOpenModal: (paymentId: string) => void;
}

const Transaction = ({title, onOpenModal}: TransactionProps) => {
	const [loading, withLoading] = useLoading();
	const [payments, setPayments] = useState<PaymentType[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);

	const columns: ColumnsType<PaymentType> = [
		{ title: 'Transaction Id', dataIndex: 'transaction_id', key: 'transaction_id' },
		{ title: 'Transaction Type', dataIndex: 'type', key: 'type' },
		{ title: 'Stats', dataIndex: 'status', key: 'status' },
		{ title: 'Date Created', dataIndex: 'created_at', key: 'created_at' },
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (payment: PaymentType) => <Button type="primary" onClick={() => onOpenModal(String(payment?.id))}>Details</Button>,
		},
	];
	
	const getUserPayments = async () => {
		try {
			const payments = await withLoading(SubscriptionService.getUserPayments());
			setPayments(payments);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

	
	useEffect(() => {
		getUserPayments();
  }, []);

	useDocumentTitle(title);

	return (
		<div className='p-5 payment-body-container'>
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(payment) => payment.id}
				dataSource={payments}
			/>
		</div>

	)
}

export default Transaction;
