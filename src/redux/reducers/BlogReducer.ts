import { IBlog } from "../../services/BlogServices";
import { TBlogActions } from "../actions/BlogActions";
import { IAction } from "../actions/CommonAction";

export interface ISearchCondition {
  limit: number;
  key: string;
  page: number;
}

export interface IBlogState {
  blogs: IBlog[];

  isLoading: boolean;

  condition: ISearchCondition;

  count: number;
}

const defaultState: IBlogState = {
  blogs: [],
  isLoading: false,
  count: 0,
  condition: {
    limit: 10,
    key: "",
    page: 1
  }
}

export default function(state = defaultState, action: TBlogActions): IBlogState {
  switch (action.type) {
    default:
      return state;
    case "add_blog":
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        count: state.count + 1
      };
    case "edit_blog":
      const blogs = state.blogs.map(blog => {
        if (blog.id === action.payload.id) {
          return {
            ...blog,
            ...action.payload.blog
          }
        } else {
          return blog;
        }
      });
      return {
        ...state,
        blogs
      }

    case "save_blogs":
      return {
        ...state,
        blogs: action.payload.blogs,
        count: action.payload.count
      }

    case "set_loading": 
      return {
        ...state,
        isLoading: action.payload
      };
    case "set_condition":
      return {
        ...state,
        condition: {
          ...state.condition,
          ...action.payload
        }
      };
    case "delete_blog":
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog.id !== action.payload)
      }
  }
}