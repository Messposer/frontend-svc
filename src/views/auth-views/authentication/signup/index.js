import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import { Card, Row, Col } from "antd";
import { useDocumentTitle } from 'hooks/useDocumentTitle';


const SignUp = props => {
	const {title} = props;
	useDocumentTitle(title);
	return (
		<>
			<div className="container d-flex flex-column justify-content-center">
				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={10}>
						<Card style={{border: `none`, background: `none`}} className="add-space">
							<div className="mt-5">
								<div className="text-center">
									<h1 className="text-dark font-weight-bold">Sign up</h1>
								</div>
								<RegisterForm />
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default SignUp
