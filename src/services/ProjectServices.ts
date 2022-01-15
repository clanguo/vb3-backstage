import { ResponseResult } from "./CommonTypes";
import request from "./request";

export enum EventType {
  addBlog = 0,
  removeBlog = 1,
  addTag = 2,
  removeTag = 3,
  startServer = 4
}

export interface IEventLog {
  id: string;
  
  timing: Date;

  target: string;

  targetId?: string;

  type: EventType;
}

export interface ISetting {
  [prop: string]: any;

  projectAddress: string;

  imgProtect: boolean;

  allowOrigin: string[] | boolean;
}

export class ProjectServices {
  public static async getEventLog(): Promise<ResponseResult<IEventLog[]>> {
    return request.get("/api/project/event");
  }

  public static async getSetting(): Promise<ResponseResult<ISetting>> {
    return request.get("/api/project/setting");
  }

  public static async setSetting(setting: ISetting): Promise<ResponseResult<ISetting>> {
    return request.post("/api/project/setting", setting);
  }
}