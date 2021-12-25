import { ThunkAction } from "redux-thunk";
import CategoryServices, { ICategory } from "../../services/CategoryServices";
import { IState } from "../reducers";
import { IAction } from "./CommonAction";

export type SaveCategoryAction = IAction<"save_category", Required<ICategory>[]>;
export function saveCategoryAction(categories: Required<ICategory>[]): SaveCategoryAction {
  return {
    type: "save_category",
    payload: categories
  }
}

export type AddCategoryAction = IAction<"add_category", Required<ICategory>>;
export function addCategoryAction(category: Required<ICategory>): AddCategoryAction {
  return {
    type: "add_category",
    payload: category
  }
}

export type DeleteCategoryAction = IAction<"delete_category", string>;
export function deleteCategoryAction(id: string): DeleteCategoryAction {
  return {
    type: "delete_category",
    payload: id
  }
}

export type TCategoryActions = SaveCategoryAction | AddCategoryAction | DeleteCategoryAction;

export function fetchCategory(): ThunkAction<Promise<void>, IState, any, TCategoryActions> {
  return async (dispatch, getState) => {
    const { err, data } = await CategoryServices.getCategories();
    if (!err) {
      dispatch(saveCategoryAction(data!));
    }
  }
}

export function deleteCategory(id: string): ThunkAction<Promise<void>, IState, any, TCategoryActions> {
  return async (dispatch, getState) => {
    const { err, data } = await CategoryServices.removeCategory(id);
    if (!err) {
      dispatch(deleteCategory(id));
    }
  }
}

export default {
  fetchCategory,
  deleteCategory
}