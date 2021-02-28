import { Link, useHistory } from "react-router-dom";
import { ContainerDiv, NavBar } from "./styles";
import { isAuth } from "../../utils";

const Container: React.FC = (props) => {
  const history = useHistory();

  return (
    <ContainerDiv>
      {isAuth() && (
        <NavBar>
          <Link to="/users">ListDev's</Link>
          <Link to="/formulary">Criar novo</Link>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/");
              localStorage.removeItem("email");
              window.location.reload();
            }}
          >
            {" "}
            Logout
          </span>
        </NavBar>
      )}
    </ContainerDiv>
  );
};

export default Container;
