import { useDocumentTitle } from 'hooks/useDocumentTitle';
import AuthBanner from 'views/auth-views/components/banner';
import ForgotPasswordForm from 'views/auth-views/components/ForgotPasswordForm';

interface LoginProps {
	title: string;
}
const Forgot = ({title}: LoginProps) => {
	useDocumentTitle(title);
	return (
		<>
			<div className="row m-0">
				<div className='col-md-7 auth-bg'>
					<AuthBanner />
				</div>
				<div className='col-md-5 auth-content'>
					<div className="p-5 w-100">
						<h1 className="text-title">Forgot Password, hmmm,</h1>
						<h5 className="text-sub-title pt-2">Provide your email to continue</h5>
						<div className="auth-wrapper mt-3">
							<ForgotPasswordForm />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Forgot
