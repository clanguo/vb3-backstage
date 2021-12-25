import axios, { AxiosResponse } from "axios";
import { IAdmin, ILoginAdmin } from "../redux/actions/AdminActions";
import { ResponseResult } from "./CommonTypes";
import request from "./request";

export default class AdminServices {
  public static async login(admin: ILoginAdmin): Promise<AxiosResponse<ResponseResult<Pick<IAdmin, "account">>>> {
    return axios.post(`/api/admin`, admin);
  }

  public static async logout(): Promise<ResponseResult<string>> {
    return request.put("/api/admin", null, { withCredentials: true });
  }

  public static async whoim(withCredentials: boolean = true): Promise<AxiosResponse<ResponseResult<Pick<IAdmin, "account"> | null>>> {
    return axios.get("/api/admin", { withCredentials });
  }
}