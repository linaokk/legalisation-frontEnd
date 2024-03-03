export const API_FETCH_ADMIN_USERS = "/admin/fetch_users";
export const API_FETCH_ADMIN_DISABLED_CLIENTS = "/admin/fetch_d_clients";
export const API_ACTION_ADMIN_ENABLE_CLIENT = "/admin/enable_user/:username";
export const API_FETCH_USER_INFO = "/auth/get_user_info";
export const API_FETCH_MY_ACCOUNT = "/auth/get_my_account";
export const API_LOGIN = "/auth/login";
export const API_ACTION_UPDATE_MY_ACCOUNT = "/auth/update_my_account";
export const API_FETCH_PENDING_REQUESTS = "/admin/fetch_p_requests";
export const API_ACTION_VALIDATE_REQUEST = "/admin/request/:requestId/validate";
export const API_ACTION_REFUSE_REQUEST = "/admin/request/:requestId/refuse";
export const API_FETCH_ADMINS = "/super_admin/fetch_admins";
export const API_ACTION_SUPERADMIN_ENABLE_ADMIN =
  "/super_admin/enable_admin/:identityCode";
export const API_ACTION_SUPERADMIN_DISABLE_ADMIN =
  "/super_admin/disable_admin/:identityCode";

export const API_ACTION_SUPERADMIN_ADD_ADMIN = "/super_admin/add_admin";
