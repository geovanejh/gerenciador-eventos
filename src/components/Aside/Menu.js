import Item from "./Item";
import { MenuNav } from "./Menu.styled";
import { BiCurrentLocation } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../../store/actions/AuthAction";
import { connect } from "react-redux";

const Menu = ({ dispatch }) => {
  const navigate = useNavigate();
  const { pathname: caminho } = useLocation();

  return (
    <MenuNav>
      <ul>
        <Item
          name="Home"
          url="/dashboard"
          icon={<BiCurrentLocation />}
          active={caminho.includes("/dashboard") ? "active" : ""}
        />
        <Item
          name="Meus ingressos"
          url="/tickets"
          icon={<IoPerson />}
          active={caminho.includes("/tickets") ? "active" : ""}
        />
        <Item
          name="Meus eventos"
          url="/events"
          icon={<IoPerson />}
          active={caminho.includes("/events") ? "active" : ""}
        />
        <li>
          <button onClick={() => handleLogout(dispatch, navigate)}>
            <MdLogout />
            <p>Sair</p>
          </button>
        </li>
      </ul>
    </MenuNav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  loading: state.UtilsReducer.loading,
});
export default connect(mapStateToProps)(Menu);
