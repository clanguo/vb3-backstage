import { message } from "antd";
import { ThunkAction } from "redux-thunk";
import TagServices, { ITag } from "../../services/TagServices";
import { IState } from "../reducers";
import { DeleteBlogAction, TBlogActions } from "./BlogActions";
import { IAction } from "./CommonAction";

export type SaveTagAction = IAction<"save_tags", ITag[]>;
export function saveTagAction(tags: ITag[]): SaveTagAction {
  return {
    type: "save_tags",
    payload: tags
  }
}

export type DeleteTagAction = IAction<"delete_tag", string>;
export function deleteTagAction(id: string): DeleteTagAction {
  return {
    type: "delete_tag",
    payload: id
  }
}

export type AddTagAction = IAction<'add_tag', ITag>;
export function addTagAction(tag: ITag): AddTagAction {
  return {
    type: "add_tag",
    payload: tag
  }
}

export type TTagActions = SaveTagAction | DeleteTagAction | AddTagAction;

export function fetchTag(): ThunkAction<Promise<void>, IState, any, TTagActions> {
  return async (dispatch, getState) => {
    const res = await TagServices.getTags();
    if (!res.err) {
      dispatch(saveTagAction(res.data!));
    }
  }
}

export function fetchDeleteTag(id: string): ThunkAction<Promise<void>, IState, any, TTagActions> {
  return async (dispatch, getState) => {
    const res = await TagServices.deleteTag(id);
    if (res.err) {
      message.error(res.err);
    } else {
      dispatch(deleteTagAction(id));
      message.success("删除成功");
    }
  }
}

// export function unLinkTagWithBlog(tagId: string, blogId: string): ThunkAction<void, IState, any, TTagActions | TBlogActions> {
//   return (dispatch, getState) => {
    
//   }
// }

export default {
  fetchTag,
  saveTagAction,
  addTagAction,
  fetchDeleteTag
}