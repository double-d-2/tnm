import produce from "immer";
import { createContext } from "react";
import { REACT_APP_ENV } from "../../constants/globalConstants";

export type TSportsContextActions =
  | "SET_SPORTS"
  | "UPDATE_SPORTS"
  | "ADD_SPORT"
  | "DELETE_SPORT";

export type TSportsContextPayload = any;

export interface ISportsContextState {
  [key: string]: {
    data: ISportsContextState;
    dataCount: number;
    name: string;
  };
}

export interface ISportsContextActions {
  type: TSportsContextActions;
  payload: TSportsContextPayload;
}

export interface IDefaultState {
  sports: ISportsContextState | null;
}

export const defaultSportsContextState: IDefaultState = {
  sports: null,
};
export const sportsReducer = (
  state: IDefaultState,
  action: ISportsContextActions
) => {
  const { type, payload } = action;

  if (REACT_APP_ENV === "dev") {
    console.log("Message received - Action: " + type + " - Payload: ", payload);
  }

  switch (type) {
    //TODO: Can be some helper function to access nested data
    case "SET_SPORTS":
      return produce(state, (draft) => {
        draft.sports = payload;
      });
    case "UPDATE_SPORTS":
      return produce(state, (draft) => {
        const { sport, tournament, region, markets_count, match_info, _id } =
          payload;

        const path = draft.sports?.[sport.id].data[region.id].data[
          tournament.id
        ].data as any;

        const foundedItem = path
          ? path.find((item: any) => item._id === _id)
          : null;
        if (foundedItem) {
          if (match_info) {
            foundedItem.match_info = {
              ...foundedItem.match_info,
              ...match_info,
            };
          }
          if (markets_count) {
            foundedItem.markets_count = markets_count;
          }
        }
      });
    case "ADD_SPORT":
      return produce(state, (draft) => {
        const { sport, tournament, region } = payload;
        const path = draft.sports?.[sport.id]?.data[region.id].data[
          tournament.id
        ].data as any;

        path && path.push(payload);
      });
    case "DELETE_SPORT":
      return produce(state, (draft) => {
        const { sport, tournament, region, _id } = payload;
        const pathToSport = draft.sports && (draft.sports[sport.id] as any);
        const pathToRegion = pathToSport.data[region.id] as any;
        const pathToTournament = pathToRegion.data[tournament.id] as any;

        if (draft.sports) {
          if (pathToSport.dataCount === 1) {
            delete draft.sports[sport.id];
          } else if (pathToRegion.dataCount === 1) {
            delete pathToSport.data[region.id];
          } else if (pathToTournament.dataCount === 1) {
            delete pathToRegion.data[tournament.id];
          } else {
            pathToTournament.data = pathToTournament.data.filter(
              (item: any) => item._id === _id
            );
          }
        }
      });
    default:
      return state;
  }
};

interface ISportsContextProps {
  sportsState: IDefaultState;
  sportsDispatch: React.Dispatch<ISportsContextActions>;
}

const sportsContext = createContext<ISportsContextProps>({
  sportsState: defaultSportsContextState,
  sportsDispatch: () => {},
});

export const SportsContextProvider = sportsContext.Provider;

export default sportsContext;
