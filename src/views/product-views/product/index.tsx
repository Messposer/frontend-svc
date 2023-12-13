import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import {
	DeleteOutlined,
	TeamOutlined
} from '@ant-design/icons';
import FilterInput from 'components/Input/filterInput';
import { ERROR_MESSAGES } from 'configs/AppConfig';
import ConfirmModal from 'components/Modal/ConfirmModal';
import MomentTime from 'components/Moment';
import { toast } from 'sonner';
import { ProductType } from 'redux/types';

interface ProductProps {
	title: string,
}

const Product = ({title}: ProductProps) => {
	const [loading, withLoading] = useLoading();
	const [products, setProducts] = useState<ProductType[]>([]);
	const [filterValue, setFilterValue] = useState<string>('');
	const [deleteId, setDeleteId] = useState<string>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);

	const filteredProducts = products.filter((product: ProductType) =>
    `${product.title} ${product.description} ${product.category.title}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

	const toggleShowModal = () => {
    setShowModal(!showModal);
    setErrorMessage(null);
  };

	const deleteProduct = async () => {
		if(deleteId){
			try {
				await withLoading(UserService.DeleteAProduct(deleteId));
				const newData = products.filter((product: ProductType) => product.id !== deleteId);
				setProducts(newData);
				toggleShowModal();
				toast.success('Product deleted successfully');
			} catch (error: any) {
				setErrorMessage(
					error?.response?.data?.message
						? error?.response?.data?.message
						: ERROR_MESSAGES.NETWORK_CONNECTIVITY
				);
			}
		}
	};

	const columns: ColumnsType<ProductType> = [
		{ title: 'Title', dataIndex: 'title', key: 'title' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{ 
			title: 'Category', 
			key: 'description',
			render: (product: ProductType) => product.category.title
		},
		{ 
			title: 'View', 
			key: 'View',
			render: (product: ProductType) => <a href={`https://${product.file}`} target='_blank'>View photo</a>
		},
		{ 
			title: 'Dated Created', 
			key: 'createdAt',
			render: (product: ProductType) => <MomentTime date={product.created_at} showTime={false}/>
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (product: ProductType) => (
				<div className="d-flex justify-content-between align-items-center">
					<Button 
						onClick={() => navigate(`${product?.id}`)}
						className="custom-button custom-button-sm"
					>
						Edit
					</Button>
					<Button 
						danger 
						icon={<DeleteOutlined />} 
						onClick={() => [setDeleteId(product.id), toggleShowModal()]}
						className="custom-button custom-button-sm"
					>
						Delete
					</Button>
				</div>
			),
		},
	];

	const navigate = useNavigate();
	
	
	useEffect(() => {
		const getProducts = async () => {
			try {
				const products = await withLoading(UserService.getAllProducts());
				setProducts(products?.data?.products);
			} catch (error) {
				console.log(error);
			}
		}
		getProducts();
  }, []);

	useDocumentTitle(title);

	return (
		<div className='p-3 chat-body-container'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Button 
					type="primary"
					icon={<TeamOutlined />}
					size="large"
					className="custom-button custom-primary-button"
                    onClick={() => navigate('create')}
				>
					Add Product
				</Button>
				<FilterInput 
					filterValue={filterValue} 
					setFilterValue={setFilterValue} 
					placeholder='Filter products'
				/>
			</div>
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(product) => product.id}
				dataSource={filteredProducts}
			/>
			{
        showModal &&
        <ConfirmModal 
          title="The selected contact will be deleted, which might after your existing templates"
          loading={loading} 
          handleConfirm={deleteProduct}
          isOpen={showModal}
          onClose={toggleShowModal}
          errorMessage={errorMessage}
          continueText="Yes, delete"
					errorMessageTitle="Error Deleting"
        />
      }
		</div>

	)
}

export default Product;
