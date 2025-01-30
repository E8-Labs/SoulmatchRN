const BasePath = "http://54.196.165.141:8004/"

const Apis = {
    DashboardDetails: `${BasePath}api/admin/dashboard`,
    AdminDates: `${BasePath}api/admin/dates/get_date_places`,
    GetCategories: `${BasePath}api/admin/dates/get_categories`,
    // DeleteDate: `${BasePath}api/admin/dates/delete_category`,
    GetAdminUsers: `${BasePath}api/admin/users`,
    AddDatePlace: `${BasePath}api/admin/dates/add_date_place`,
    UpdateDatePlace: `${BasePath}api/admin/dates/update_date_place`,
    SuspendUser: `${BasePath}api/admin/suspend_user`,
    DeleteUser: `${BasePath}api/admin/delete_user`,
    DeleteDate: `${BasePath}api/admin/dates/delete_date_place`,
    FlaggedUsers: `${BasePath}api/admin/reported_users`,
    IgnoreReport: `${BasePath}api/admin/ignore_flagged`,
    GetProfile: `${BasePath}api/users/get_profile`,
    
}

export default Apis;
