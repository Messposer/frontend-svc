import Logo from 'components/Dashboard/Logo';
import { APP_NAME } from 'configs/AppConfig';

const AuthBanner = () => {
  return (
    <div className="auth-banner-wrapper mt-3">
      <div className="auth-banner-content-wrapper center-div">
        <img src='/img/automation.png' height={500} alt={`${APP_NAME} logo`}/>
      </div>
    </div>
  )
}

export default AuthBanner;