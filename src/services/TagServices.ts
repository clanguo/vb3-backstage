import { IBlog } from "./BlogServices";
import { ResponseResult } from "./CommonTypes";
import request from "./request";

export interface ITag {
  id?: string;
  
  name: string;

  blogs?: IBlog[]
}

export default class TagServices {
  public static async addTag(tag: ITag): Promise<ResponseResult<ITag>> {
    return request.post("/api/tag", tag);
  }

  /**
   * TODO 完成后端delete操作
   */
  public static async deleteTag(id: string): Promise<ResponseResult<boolean>> {
    return request.delete(`/api/tag/${id}`);
  }

  public static async editTag(id: string, name: string): Promise<ResponseResult<boolean>> {
    return request.put(`/api/tag/${id}`, { name });
  }

  public static async getTag(id: string): Promise<ResponseResult<Required<ITag>>> {
    return request.get(`/api/tag/${id}`);
  }

  public static async getTags(): Promise<ResponseResult<ITag[]>> {
    return request.get(`/api/tag`);
  }
}