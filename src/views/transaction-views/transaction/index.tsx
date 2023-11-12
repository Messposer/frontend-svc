import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PaymentType } from 'services/types/SubscriptionServiceType';
import { ERROR_MESSAGES } from 'configs/AppConfig';
import SubscriptionService from 'services/SubscriptionService';
import MomentTime from 'components/Moment';
import FilterInput from 'components/Input/filterInput';
import { EyeOutlined } from '@ant-design/icons';
interface TransactionProps {
	title: string,
  onOpenModal: (paymentId: string) => void;
}

const Transaction = ({title, onOpenModal}: TransactionProps) => {
	const [loading, withLoading] = useLoading();
	const [payments, setPayments] = useState<PaymentType[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
	const [filterValue, setFilterValue] = useState<string>('');

	const columns: ColumnsType<PaymentType> = [
		{ title: 'Transaction Id', dataIndex: 'transaction_id', key: 'transaction_id' },
		{ title: 'Transaction Type', dataIndex: 'type', key: 'type' },
		{ title: 'Stats', dataIndex: 'status', key: 'status' },
		{ 
			title: 'Dated Created', 
			key: 'createdAt',
			render: (payment: PaymentType) => <MomentTime date={payment.created_at} />
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (payment: PaymentType) => 
				<Button 
					type="primary" 
					onClick={() => onOpenModal(String(payment?.id))}
					icon={<EyeOutlined />}
					className="custom-button custom-button-sm custom-secondary-button"
				>
					Details
				</Button>,
		},
	];

	const filteredTransactions = payments.filter((payment: PaymentType) =>
    `${payment.transaction_id} ${payment.status} ${payment.type}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 
	
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
		<div className='p-3 payment-body-container'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h5>Transaction list</h5>
				<FilterInput 
					filterValue={filterValue} 
					setFilterValue={setFilterValue} 
					placeholder='Filter transaction list'
				/>
			</div>
			
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(payment) => payment.id}
				dataSource={filteredTransactions}
			/>
		</div>

	)
}

export default Transaction;
