import "../css/Homepage.css";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="button-group">
      <Link to="/billing" className="button">
        Billing
      </Link>
      <Link to="/credit" className="button">
        Credit
      </Link>
      <Link to="/stock" className="button">
        Stock
      </Link>
    </div>
  );
};

export default Homepage;
