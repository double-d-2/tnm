export const groupKeys = ["sport", "region", "tournament"];
export const sportsDataRequestParams = {
  cmd: "get",
  params: {
    channel: "active", //"result",
    label: "live games",
    subscribe: true,
    what: {
      game: ["_id", "date", "home", "away", "status", "markets_count"],
      match_info: ["score", "scores", "game_score", "server", "time"],
      region: ["id", "alias", "name", "order"],
      sport: ["id", "alias", "name", "order"],
      tournament: ["id", "alias", "name", "order"],
    },
    where: {
      game: {
        active: true,
        feed: "live",
      },
    },
  },
  rid: "FF32862C-84F7-1276-CC06-dafsdfda",
};

export const socketInitParams = {
  cmd: "init",
  params: {
    device: "desktop",
    language: "en-GB",
  },
  rid: "4E50E253",
};

export const pingRequestParams = {
  cmd: "ping",
  rid: "F46614F4-4AA8-3F42-FEE1-11A7325E21E4",
};

export const pingRequestDelay = 10000;
