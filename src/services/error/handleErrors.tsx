import { Alert } from 'antd';
import { ERROR_MESSAGES } from 'configs/AppConfig';

interface errorProps {
    errors: any;
    isToast?: boolean;
}

export const HandleErrors = ({errors = [], isToast = false} : errorProps) => {
    const alert = (
        <div
          className="my-3"
        >
          <Alert
            type="error"
            message={<SetErrors errors={errors}/>}
          ></Alert>
        </div>
    );

    const toast = (
        <div>toast</div>
    );

    return isToast ? toast : alert
}

export const SetErrors = ({errors} : errorProps) => {
    return (
        <>
            {
                <>
                    {errors?.constructor === Array ? (
                        <>
                        {
                            errors?.length > 0 ? (
                                <ul className='error-display-parent m-0'>
                                {errors?.map((error) => (
                                    <li className='error-display-child' key={error}>{error}</li>
                                ))}
                                </ul>
                            ): (
                                <li className='error-display-child'>{ERROR_MESSAGES.NETWORK_CONNECTIVITY}</li>
                            )
                        }
                        </>
                    ) : (
                        <ul className='error-display-parent m-0'>
                            <li className='error-display-child'>{errors}</li>
                        </ul>
                    )}
                </>
            }
        </>
    );
}