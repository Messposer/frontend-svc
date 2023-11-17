import { Alert, message } from 'antd';
import CustomToast from 'components/Toast';
import { TeamOutlined } from '@ant-design/icons';
import { toast } from 'sonner';

interface ErrorProps {
    errors: any;
    isToast?: boolean;
    title?: string;
}

export const HandleErrors = ({errors = [], isToast = false, title} : ErrorProps) => {
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

    const toastAlert = (
        <CustomToast 
            type="error"
            title={title ?? "Error"} 
            content={<SetErrors errors={errors}/>} 
        />
    );

    return isToast ? toastAlert : alert
}

export const SetErrors = ({errors} : ErrorProps) => {
    return (
        <>
            {
                <>
                    {errors?.constructor === Array ? (
                        <>
                            {
                                errors?.length > 0 &&
                                    <ul className='error-display-parent m-0'>
                                    {errors?.map((error) => (
                                        <li className='error-display-child' key={error}>{error}</li>
                                    ))}
                                    </ul>
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