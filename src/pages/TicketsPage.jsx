import React from "react";
import { ListPage } from "../components/ListPages/ListPage";
import ListPageHeader from "../components/ListPages/ListPageHeader/ListPageHeader";
import { ListPageContainer } from "../components/ListPages/ListPageContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PeopleListItem from "../components/PeopleListItem/PeopleListItem";
import { useEffect } from "react";
import SearchField from "../components/Form/SearchField/SearchField";
import { connect } from "react-redux";
import { api } from "../api";
import Loading from "../components/Loading/Loading";

const TicketsPage = ({ auth }) => {
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const navigate = useNavigate();

  const setup = async () => {
    getData();
  };

  const getData = async () => {
    console.log(auth);
    setLoading(true);
    try {
      const { data } = await api.get(`/api/ingressos/owner/${auth.user_id}`);
      setFilteredTickets(data);
      console.log("Ingressos do user: ", data);
    } catch (error) {
      //toast.error("Um erro aconteceu, tente novamente.");
    }
    setLoading(false);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <ListPage>
        <ListPageHeader title="Meus ingressos" user="Geovane Hartmann" />
        <ListPageContainer layout="1fr 1.5fr 1fr 0.5fr">
          <div>
            <SearchField
              value={searchField}
              placeholder="Pesquisar"
              onChange={(e) => {
                setSearchField(e.target.value);
              }}
            />
          </div>
          {filteredTickets.length < 1 ? (
            <div>Nenhum ingresso encontrado.</div>
          ) : (
            <ul>
              <li>
                <h3>Pedido</h3>
                <h3>Compra</h3>
                <h3>Valor total</h3>
              </li>
              {filteredTickets.map((e, index) => (
                <PeopleListItem key={index} event={e} />
              ))}
            </ul>
          )}
        </ListPageContainer>
      </ListPage>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.AuthReducer,
});

export default connect(mapStateToProps)(TicketsPage);
