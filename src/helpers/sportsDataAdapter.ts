import { groupKeys } from "../constants/sportsConstants";
import { nestGroupsBy } from "./utils";

export const adaptSportsData = (sports: {}) => {
  const adaptedData = nestGroupsBy(sports, groupKeys);
  return adaptedData;
};
