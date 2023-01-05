import { useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import sportsContext, {
  ISportsContextState,
} from "../../contexts/sportsContext/sportsContext";
import "./styles.css";
const Sports = () => {
  const { sportsState } = useContext(sportsContext);
  const { sports } = sportsState;

  const renderNestedSports = (data: ISportsContextState | null) => {
    if (!data) {
      return null;
    }

    const entries = Object.entries(data);
    return entries.map(([key, value]: [string, any]) => {
      return (
        <Dropdown
          buttonText={`${value.name} (${value.dataCount})`}
          key={key}
          content={
            !Array.isArray(value.data)
              ? renderNestedSports(value.data)
              : value.data.map((item: any) => {
                  const { match_info, away, home, markets_count } = item;
                  return (
                    <Link
                      key={item._id}
                      to={`/${item._id}`}
                      className="game-link"
                    >
                      {home.name} VS {away.name} MC- {markets_count} Score-{" "}
                      {match_info.score}
                    </Link>
                  );
                })
          }
        />
      );
    });
  };
  return <div className="sports-page">{renderNestedSports(sports)}</div>;
};

export default Sports;
