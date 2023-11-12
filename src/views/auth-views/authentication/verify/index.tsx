import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { connect } from 'react-redux';
import { RootState } from 'redux/types/Root';
import AuthBanner from 'views/auth-views/components/banner';
import VerifyCodeForm from 'views/auth-views/components/VerifyCodeForm';

interface CodeVerifyProps {
	title: string;
	currentEmail: string | null;
}
const CodeVerify = ({title, currentEmail}: CodeVerifyProps) => {
	
	useDocumentTitle(title);
	return (
		<>
			<div className="row m-0">
				<div className='col-md-7 auth-bg'>
					<AuthBanner />
				</div>
				<div className='col-md-5 auth-content'>
					<div className="p-5 w-100">
						<h1 className="text-title">Enter code, hmmm,</h1>
						<h5 className="text-sub-title pt-2">A code has been sent to your email address: <small>{currentEmail}</small></h5>
						<div className="auth-wrapper mt-3">
							<VerifyCodeForm />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = ({auth}: RootState) => {
  const {  currentEmail } = auth;
  return { currentEmail };
};

export default connect(mapStateToProps)(CodeVerify);
