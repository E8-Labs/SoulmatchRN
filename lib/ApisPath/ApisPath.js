const BasePath = "http://13.58.134.250:8004/";

const ApisPath = {
    ApiRegisterUser:`${BasePath}api/users/register`,
    ApiLoginUser:`${BasePath}api/users/login`,
    ApiSendVerificationEmail: `${BasePath}api/users/send_verification_email`,
    ApiVerifyEmail: `${BasePath}api/users/verify_email`,
    ApiResetPassword: `${BasePath}api/users/update_password`,
    ApiSendResetCode: `${BasePath}api/users/send_reset_email`,
    ApiUploadIntroVideo: `${BasePath}api/users/upload_intro_video`,
    ApiUploadMedia: `${BasePath}api/users/upload_user_media`,
    
}

export default ApisPath;
