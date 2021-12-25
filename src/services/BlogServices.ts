import { ISearchCondition } from "../redux/reducers/BlogReducer";
import { ICategory } from "./CategoryServices";
import { ResponsePageData, ResponsePageError, ResponsePageResult, ResponseResult } from "./CommonTypes";
import request from "./request";
import { ITag } from "./TagServices";

interface IContent {
  content: string;

  // blog: IBlog;
}

export interface IBlog {
  id: string;

  title: string;

  /**
   * 封面
   */
  poster: string;

  /**
   * 描述
   */
  description: string;

  content?: IContent;

  tags: ITag[];

  category: ICategory

  createdAt: Date;

  updatedAt: Date
}

export default class BlogServices {
  public static async getBlogs(condition: ISearchCondition): Promise<ResponsePageResult<IBlog>> {
    return request.get("/api/blog", {
      params: condition
    });
  }

  public static async getBlogById(id: string): Promise<ResponseResult<Required<IBlog>>> {
    return request.get(`/api/blog/${id}`);
  }

  public static async editBlogInfo(id: string, blog: IBlog): Promise<ResponseResult<boolean>> {
    return request.put(`/api/blog/info/${id}`, blog, { withCredentials: true });
  }

  public static async editBlogContent(id: string, content: string): Promise<ResponseResult<boolean>> {
    return request.put(`/api/blog/${id}`, { content }, { withCredentials: true });
  }

  public static async deleteBlog(id: string): Promise<ResponseResult<boolean>> {
    return request.delete(`/api/blog/${id}`, { withCredentials: true });
  }

  public static async addBlog(blog: IBlog): Promise<ResponseResult<IBlog>> {
    return request.post("/api/blog", blog);
  }

  /**
   * 上传封面
   */
  public static async uploadPoster(form: FormData): Promise<ResponseResult<string>> {
    return request.post("/api/uploads", form);
  }
}