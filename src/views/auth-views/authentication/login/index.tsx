import LoginForm from 'views/auth-views/components/LoginForm';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import AuthBanner from 'views/auth-views/components/banner';

interface LoginProps {
	title: string;
}
const Login = ({title}: LoginProps) => {
	useDocumentTitle(title);
	return (
		<>
			<div className="row m-0">
				<div className='col-md-7 auth-bg'>
					<AuthBanner />
				</div>
				<div className='col-md-5 auth-content'>
					<div className="p-5 w-100">
						<h1 className="text-title">Welcome back,</h1>
						<h5 className="text-sub-title pt-2">Provide your email and password to continue</h5>
						<div className="auth-wrapper mt-3">
							<LoginForm />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
