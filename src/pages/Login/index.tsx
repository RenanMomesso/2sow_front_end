import React, { useState, useEffect } from "react";
import sad from "../../assets/2sow.png";
import { MainDiv, Formulary, ButtonSend } from "./styles";
import { useHistory } from "react-router-dom";
import { isAuth, setLocalStorage } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const redirect = () => {
    return isAuth() ? history.push("/users") : null;
  };
  useEffect(() => {
    redirect();
  }, []);

  const handleFormulary = (e: React.FormEvent): void => {
    e.preventDefault();
    setLocalStorage("email", email);
    if (
      email.trim().length > 0 &&
      email.includes("@") &&
      password.trim().length > 4
    ) {
      toast.success("Login com successo, você será redirecionado.");
      setTimeout(() => {
        history.push("/users");
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Algo deu errado! tente novamente");
    }
  };

  return (
    <MainDiv>
      <ToastContainer />
      <Formulary onSubmit={handleFormulary}>
        <img src={sad} width={250} height={100} alt="2SOW" />
        <div>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={4}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            minLength={4}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ButtonSend type="submit">ENTRAR</ButtonSend>
      </Formulary>
    </MainDiv>
  );
};

export default Login;
