import { IProject, ProjectActions } from "../actions/ProjectActions";

export interface IProjectState extends IProject {
}

const defaultState: IProjectState = {
  timeLine: []
};

export default function(state: IProjectState = defaultState, action: ProjectActions): IProjectState {
  console.log(state)

  switch(action.type) {
    default:
      return state;
    case "save_timeline":
      return {
        ...state,
        timeLine: action.payload
      }
  }
}