import { connectRouter, RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import { ICategory } from "../../services/CategoryServices";
import { ITag } from "../../services/TagServices";
import history from "../history";
import AdminReducers, { IAdminState } from "./AdminReducers";
import BlogReducer, { IBlogState } from "./BlogReducer";
import CategoryReducer from "./CategoryReducer";
import ProjectReducer, { IProjectState } from "./ProjectReducer";
import TagReducers from "./TagReducers";

export interface IState {
  blog: IBlogState;

  admin: IAdminState;

  project: IProjectState;

  tags: ITag[];

  categories: ICategory[];

  router: RouterState;
}

export default combineReducers({
  router: connectRouter(history),
  blog: BlogReducer,
  admin: AdminReducers,
  project: ProjectReducer,
  tags: TagReducers,
  categories: CategoryReducer
});