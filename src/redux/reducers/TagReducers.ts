import { ITag } from "../../services/TagServices";
import { TTagActions } from "../actions/TagActions";

const defaultState: ITag[] = [];

export default function(state: ITag[] = defaultState, actions: TTagActions): ITag[] {
  switch(actions.type) {
    default:
      return state;
    case "save_tags":
      return actions.payload;
    case "delete_tag":
      return state.filter(tag => tag.id !== actions.payload)
    case "add_tag":
      return [...state, actions.payload];
  }
}