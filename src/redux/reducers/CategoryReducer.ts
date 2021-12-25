import { IState } from ".";
import { ICategory } from "../../services/CategoryServices";
import { TCategoryActions } from "../actions/CategoryActions";

const initialState: ICategory[] = [];

export default function (state: ICategory[] = initialState, action: TCategoryActions): ICategory[] {
  switch (action.type) {
    default:
      return state;
    case "save_category":
      return action.payload;
    case "add_category":
      return [...state, action.payload];
    case "delete_category":
      return state.filter(category => category.id !== action.payload);
  }
}