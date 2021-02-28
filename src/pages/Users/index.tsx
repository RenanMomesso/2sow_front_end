import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  ContainerTable,
  ContainerUserTable,
  ContainerAllUsers,
} from "./styles";
import axios from "axios";
import { isAuth } from "../../utils";
import { User } from "../../utils/interfaces";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserDetails = (id: string): void => {
    history.push(`/user/${id}`);
  };

  const loadAllUsers = async () => {
    setLoading(true);
    const { data } = await axios.get("http://localhost:5000/usuarios");
    setLoading(false);
    setUsers(data);
  };
  const redirect = () => {
    if (!isAuth()) {
      return history.push("/");
    }
  };
  useEffect(() => {
    redirect();
    loadAllUsers();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#62a16f",
          height: "100vh",
        }}
      >
        <h1>Carregando dados dos usuario, por favor aguarde...</h1>
      </div>
    );
  return (
    <ContainerAllUsers>
      <ContainerTable>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>E-MAIL</th>
          <th>CIDADE</th>
        </tr>
        {users &&
          users.map((user: User) => (
            <ContainerUserTable onClick={() => handleUserDetails(user.id)}>
              <td>{user.data.nome.toUpperCase()}</td>
              <td>{user.data.cpf}</td>
              <td>{user.data.email}</td>
              <td>{user.data.endereco.cidade.toUpperCase()}</td>
            </ContainerUserTable>
          ))}
      </ContainerTable>
    </ContainerAllUsers>
  );
};

export default Users;
