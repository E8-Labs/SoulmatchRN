const BasePath = "https://plurawlapp.com/soulmatch/";

const ApisPath = {
    ApiRegisterUser:`${BasePath}api/users/register`,
    ApiLoginUser:`${BasePath}api/users/login`,
    ApiSendVerificationEmail: `${BasePath}api/users/send_verification_email`,
    ApiVerifyEmail: `${BasePath}api/users/verify_email`,
    ApiResetPassword: `${BasePath}api/users/update_password`,
    ApiSendResetCode: `${BasePath}api/users/send_reset_email`,
    ApiUploadIntroVideo: `${BasePath}api/media/upload_intro_video`,
    ApiUploadMedia: `${BasePath}api/media/upload_user_media`,
    ApiDeleteMedia: `${BasePath}api/media/delete_media`,
    ApiUpdateProfile: `${BasePath}api/users/update_profile`,
    ApiGetProfileLikes: `${BasePath}api/users/get_profile_likes`,
    ApiGetDiscover: `${BasePath}api/users/discover`,
    ApiLikeProfile: `${BasePath}api/users/like_profile`,
    ApiGetQuestions: `${BasePath}api/users/questions`,
    ApiAddAnswer: `${BasePath}api/media/answer_question`,
    
}

export default ApisPath;
