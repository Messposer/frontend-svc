import NewPasswordForm from 'views/auth-views/components/NewPassword';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import AuthBanner from 'views/auth-views/components/banner';

interface NewPasswordProps {
	title: string;
}
const NewPassword = ({title}: NewPasswordProps) => {
	useDocumentTitle(title);
	return (
		<>
			<div className="row m-0">
				<div className='col-md-7 auth-bg'>
					<AuthBanner />
				</div>
				<div className='col-md-5 auth-content'>
					<div className="p-5 w-100">
						<h1 className="text-title">Reset Password,</h1>
						<h5 className="text-sub-title pt-2">Choose a new password</h5>
						<div className="auth-wrapper mt-3">
							<NewPasswordForm />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewPassword;
