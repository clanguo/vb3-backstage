import { message } from "antd";
import { ThunkAction } from "redux-thunk";
import BlogServices, { IBlog } from "../../services/BlogServices";
import { IState } from "../reducers";
import { IBlogState, ISearchCondition } from "../reducers/BlogReducer";
import { IAction } from "./CommonAction";

export type SaveBlogAction = IAction<"save_blogs", { blogs: IBlog[], count: number }>;
export function saveBlogAction(blogs: IBlog[], count: number): SaveBlogAction {
  return {
    type: "save_blogs",
    payload: {
      blogs,
      count
    }
  }
}

export type AddBlogAction = IAction<"add_blog", IBlog>;
export function addBlogAction(blog: IBlog): AddBlogAction {
  return {
    type: "add_blog",
    payload: blog
  }
}

export type SetLoaingAction = IAction<"set_loading", boolean>;
export function setLoadingAction(isLoading: boolean): SetLoaingAction {
  return {
    type: "set_loading",
    payload: isLoading
  }
}

export type EditBlogAction = IAction<"edit_blog", {id: string, blog: Omit<IBlog, "id">}>;
export function editBlog(id: string, blog: Omit<IBlog, "id">): EditBlogAction {
  return {
    type: "edit_blog",
    payload: {
      id,
      blog
    }
  }
}

export type SetConditionAction = IAction<"set_condition", Partial<ISearchCondition>>;
export function setConditionAction(condition: Partial<ISearchCondition>): SetConditionAction {
  return {
    type: "set_condition",
    payload: condition
  }
}

export type DeleteBlogAction = IAction<"delete_blog", string>;
export function deleteBlogAction(id: string): DeleteBlogAction {
  return {
    type: "delete_blog",
    payload: id
  }
}

export type TBlogActions = SaveBlogAction | AddBlogAction | SetLoaingAction | EditBlogAction | SetConditionAction | DeleteBlogAction;


export function fetchBlogs(condition: Partial<ISearchCondition>): ThunkAction<Promise<void>, IState, any, TBlogActions> {
  return async (dispatch, getState) => {
    dispatch(setLoadingAction(true));

    const searchCondition = {
      ...getState().blog.condition,
      ...condition
    }
    const res = await BlogServices.getBlogs(searchCondition);
    if (!res.err) {
      dispatch(saveBlogAction(res.data!, res.count));
    }

    dispatch(setLoadingAction(false));
  }
}

export default {
  saveBlogAction,
  addBlogAction,
  setLoadingAction,
  setConditionAction,
  deleteBlogAction,
  editBlog,
  fetchBlogs,
}