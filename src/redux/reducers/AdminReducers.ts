import { stat } from "fs";
import { TAdminActions } from "../actions/AdminActions";

export interface IAdminState {
  account: string | null;
  isLoading: boolean;
  token: string | null;
}

const defaultState: IAdminState = {
  account: null,
  token: null,
  isLoading: false
}

export default function AdminReducers (state = defaultState, action: TAdminActions): IAdminState {
  switch (action.type) {
    default:
      return state;
    case "login_admin":
      return {
        ...state,
        ...action.payload
      };
    case "logout_admin":
      return defaultState;
    case "set_admin_loading":
      return {
        ...state,
        isLoading: action.payload
      }
  }
}