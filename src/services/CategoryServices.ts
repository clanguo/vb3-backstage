import { IBlog } from "./BlogServices";
import { ResponseResult } from "./CommonTypes";
import request from "./request";

export interface ICategory {
  id?: string;
  name: string;

  blogs: IBlog[];

  createdAt?: string;
  updatedAt?: string;
}

export default class CategoryServices {
  public static async getCategories(): Promise<ResponseResult<Required<ICategory>[]>> {
    return await request.get("/api/category");
  }

  public static async getCategoryById(id: string): Promise<ResponseResult<Required<ICategory>>> {
    return await request.get(`/api/category/${id}`);
  }

  public static async addCategory(name: string): Promise<ResponseResult<Required<ICategory>>> {
    return await request.post("/api/category", { name });
  }

  public static async removeCategory(id: string): Promise<ResponseResult<boolean>> {
    return await request.delete(`/api/category/${id}`);
  }
}