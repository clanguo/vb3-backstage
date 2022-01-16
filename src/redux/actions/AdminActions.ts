import { message } from "antd";
import { replace, RouterAction } from "connected-react-router";
import { ThunkAction, ThunkMiddleware } from "redux-thunk";
import AdminServices from "../../services/AdminServices";
import { IState } from "../reducers";
import { IAdminState } from "../reducers/AdminReducers";
import { IAction, IPureAction } from "./CommonAction";

export interface IAdmin {
  account: string | null;

  // password: string;
  // token: string | null;
}

export interface ILoginAdmin {
  account: string;

  password: string;
}

export type LoginAdminAction = IAction<"login_admin", IAdmin>;
export function loginAdminAction(admin: IAdmin): LoginAdminAction {
  return {
    type: "login_admin",
    payload: admin
  }
}

export type LogoutAdminAction = IPureAction<"logout_admin">;
export function logoutAdminAction(): LogoutAdminAction {
  return {
    type: "logout_admin"
  }
}

export type SetLoadingAdmin = IAction<"set_admin_loading", boolean>;
export function setLoadingAction(isLoading: boolean): SetLoadingAdmin {
  return {
    type: "set_admin_loading",
    payload: isLoading
  }
}

export type TAdminActions = LoginAdminAction | LogoutAdminAction | SetLoadingAdmin;
export function loginAdmin(admin: ILoginAdmin): ThunkAction<Promise<void>, IAdminState, any, TAdminActions> {
  return async (dispatch, getState) => {
    dispatch(setLoadingAction(true));
    try {
      const { data, headers } = await AdminServices.login(admin);
      if (data.err) {
        message.error(data.err);
      } else {
        // let token = headers.authorization;
        let account = data.data!.account;
        dispatch(loginAdminAction({ account }));
        message.success("登录成功");
      }
    } catch (e) { 
      message.error("登录失败");
      console.warn(e);
     }
    finally {
      dispatch(setLoadingAction(false));
    }
  }
}

export function logoutAdmin(): ThunkAction<Promise<void>, IState, any, TAdminActions | RouterAction> {
  return async (dispatch, getState) => {
    dispatch(setLoadingAction(true));
    const res = await AdminServices.logout();
    if (res.err) {
      message.error(res.err);
    } else {
      message.success(res.data);
      dispatch(logoutAdminAction());
      dispatch(replace("/login"));
    }
    dispatch(setLoadingAction(false));
  }
}

export default {
  setLoadingAction,
  loginAdminAction,
  logoutAdminAction,
  loginAdmin,
  logoutAdmin,
}