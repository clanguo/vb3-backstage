import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { IEventLog, ProjectServices } from "../../services/ProjectServices";
import { IState } from "../reducers";
import { IProjectState } from "../reducers/ProjectReducer";
import { IAction } from "./CommonAction";

export interface IProject {
  timeLine: IEventLog[];
}

export type SaveTimelineAction = IAction<"save_timeline", IEventLog[]>;

export function saveTimelineAction(timeLine: IEventLog[]): SaveTimelineAction {
  return {
    type: "save_timeline",
    payload: timeLine
  }
}

export function fetchTimeLine(): ThunkAction<Promise<void>, IState, any, ProjectActions> {
  return async (dispatch: Dispatch<SaveTimelineAction>, getState) => {
    const res = await ProjectServices.getEventLog();
    if (!res.err) {
      dispatch(saveTimelineAction(res.data!));
    }
  }
}

export type ProjectActions = SaveTimelineAction;

export default {
  saveTimelineAction,
  fetchTimeLine
}