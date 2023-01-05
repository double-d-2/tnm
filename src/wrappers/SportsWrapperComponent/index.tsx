import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import AppLoader from "../../components/AppLoader";
import { useSocket } from "../../hooks/useSocket";
import { adaptSportsData } from "../../helpers/sportsDataAdapter";
import {
  pingRequestDelay,
  pingRequestParams,
  socketInitParams,
  sportsDataRequestParams,
} from "../../constants/sportsConstants";
import {
  defaultSportsContextState,
  SportsContextProvider,
  sportsReducer,
} from "../../contexts/sportsContext/sportsContext";
import { SOCKET_URL } from "../../constants/globalConstants";

export interface ISportsContextComponentProps extends PropsWithChildren {}

const SportsContextComponent: React.FunctionComponent<
  ISportsContextComponentProps
> = (props) => {
  const { children } = props;

  const socket = useSocket(SOCKET_URL as string);

  const [sportsState, sportsDispatch] = useReducer(
    sportsReducer,
    defaultSportsContextState
  );
  const [loading, setLoading] = useState(true);

  const startListeners = useCallback(() => {
    socket.onopen = () => {
      setLoading(false);
      socket.send(JSON.stringify(socketInitParams));
      setInterval(() => {
        socket.send(JSON.stringify(pingRequestParams));
      }, pingRequestDelay);

      socket.send(JSON.stringify(sportsDataRequestParams));
    };
    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      if (data.data) {
        const adaptedData = adaptSportsData(data.data);
        sportsDispatch({ type: "SET_SPORTS", payload: adaptedData });
      } else if (Array.isArray(data)) {
        const item = data[0];
        if (item._new) {
          sportsDispatch({ type: "ADD_SPORT", payload: item });
        } else if (item._remove) {
          sportsDispatch({ type: "DELETE_SPORT", payload: item });
        } else {
          sportsDispatch({ type: "UPDATE_SPORTS", payload: item });
        }
      }
    };
    socket.onerror = () => {
      setLoading(false);
    };
    socket.onclose = (e) => {
      console.log(e, "onclose e");
    };
  }, [socket]);

  useEffect(() => {
    startListeners();
  }, [startListeners]);

  if (loading) return <AppLoader />;

  return (
    <SportsContextProvider value={{ sportsState, sportsDispatch }}>
      {children}
    </SportsContextProvider>
  );
};

export default SportsContextComponent;
