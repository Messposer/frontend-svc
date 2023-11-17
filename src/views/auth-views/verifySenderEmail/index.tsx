import Loading from "components/Loading";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SettingsService from "services/SettingsService";
import { VerifySenderEmailDataType } from "services/types/SettingsSerivceType";

interface VerifySenderEmailType {
  title: string;
}
const VerifySenderEmail = ({ title }: VerifySenderEmailType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const [successMessage, setSuccessMessage] = useState<string|null>(null);
  const [loading, withLoading] = useLoading();

  const validateCode = async() => {
    try {
      const verifyUserSenderEmailPayload: VerifySenderEmailDataType = {
        code: Number(token),
      }
      await withLoading(SettingsService.verifyUserSenderEmail(verifyUserSenderEmailPayload));
      setSuccessMessage('Email has been verified');
    }catch {
      setErrorMessage('Email cannot be verified');
    }
  }

  useEffect(() => {
    if(!token){
      navigate('/');
    }else{
      validateCode();
    }
  }, [token]);


  useDocumentTitle(title);

  return (
    <>
      {
        loading && <Loading />
      }
      {
        !loading && errorMessage && 
        <div className="error">{errorMessage}</div>
      }
      {
        !loading && successMessage && 
        <div className="error">{successMessage}</div>
      }
    </>
  );

}

export default VerifySenderEmail;
