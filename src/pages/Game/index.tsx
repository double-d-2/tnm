import { useParams } from "react-router-dom";
import "./styles.css";

const Sport = () => {
  const { id } = useParams();

  return (
    <div className="sport-page">
      <div className="sport-id">{id}</div>
    </div>
  );
};

export default Sport;
