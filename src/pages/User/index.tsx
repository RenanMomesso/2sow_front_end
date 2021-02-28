//pegar o id do usuario pelo params id
//preencher as informações do usuario com este id
//editar qlqr coisa do usuario
//salvar denovo no banco de dados
import React, { useState, useEffect } from "react";
import { FormUserContainer, NewUserFormulary, ButtonSubmit } from "./styles";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { formatCEP, isAuth } from "../../utils";
import {
  CepInterface,
  ValidationError,
  paramsProps,
  UserData,
} from "../../utils/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const params: paramsProps = useParams();

  const history = useHistory();

  const [buttonName, setButtonName] = useState("Editar");
  const [cepResult, setCepResult] = useState<CepInterface>();
  const [name, setName] = useState<string>("");
  const [cpf, setcpf] = useState<number | string>();
  const [email, setemail] = useState<string>("");
  const [cep, setCep] = useState<string>();
  const [bairro, setBairro] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [errors, setErrors] = useState<ValidationError>();
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    setLoading(true);
    const { data } = await axios.get<UserData>(
      `http://localhost:5000/usuarios/${params.id}`
    );
    console.log(data);
    setName(data.data.nome);
    setemail(data.data.email);
    setcpf(data.data.cpf);
    setCep(data.data.endereco.cep);
    setNumero(data.data.endereco.numero);
    setRua(data.data.endereco.rua);
    setBairro(data.data.endereco.bairro);
    setCidade(data.data.endereco.cidade);
    setLoading(false);
  };
  const redirect = () => {
    if (!isAuth()) {
      return history.push("/");
    }
  };
  useEffect(() => {
    getUserData();
    redirect();
  }, []);
  const handleCepUser = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    if (value?.length !== 9) {
      return;
    }
    const { data } = await axios.get<CepInterface>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    setBairro(data.bairro);
    setRua(data.logradouro);
    setCidade(data.localidade);
    setCepResult(data);
    focusRef?.current?.focus();
  };

  const focusRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //pegar todos os dados

    const registerData = {
      nome: name,
      cpf,
      email,
      endereco: {
        cep,
        rua,
        numero,
        bairro,
        cidade,
      },
    };

    if (!validate()) {
      toast.error("Preencha os dados corretamente");
      return null;
    }
    setButtonName("Editando usuario...");
    await axios.put(`http://localhost:5000/usuarios/${params.id}`, {
      data: registerData,
    });
    setButtonName("Editado com sucesso");
    toast.success("Usuario editado com sucesso!");
    setTimeout(() => {
      history.push("/users");
    }, 2000);
  };

  const validate = () => {
    const newErros: ValidationError = {} as ValidationError;

    if (!name)
      newErros.name = "Nome de usuário obrigatório ou maior que 4 caracteres.";
    if (!cpf) newErros.cpf = "Preencha corretamente o cpf do usuário.";
    if (!email || !email.includes("@"))
      newErros.email = "Preencha corretamente o nome email do usuario";
    if (!cep) newErros.cep = "Preencha aqui corretamente o cep do usuario";
    if (!rua)
      newErros.rua = "Preencha aqui corretamente o nome da rua do usuário";
    if (!numero) newErros.numero = "Preencha aqui o numero da casa do usuario";
    if (!bairro) newErros.bairro = "Preencha aqui o bairro da casa do usuario";
    if (!cidade) newErros.cidade = "Preencha aqui a cidade da casa do usuario";

    setErrors(newErros);
    return !(Object.keys(newErros).length > 0);
  };

  console.log(errors);
  if (loading) {
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
        <h1>Carregando dados do usuario, por favor aguarde...</h1>
      </div>
    );
  }

  return (
    <FormUserContainer>
      <ToastContainer />
      <NewUserFormulary>
        <form onSubmit={handleSubmit}>
          <span>USUARIO: {name}</span>
          <div>
            <label>Nome do usuário</label>
            <input
              name="name"
              placeholder="Jão da silva teixeira"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors && <small className="error-warning">{errors.name}</small>}
          </div>
          <div>
            <label>Email do usuário</label>
            <input
              name="email"
              placeholder="Exemplo: joao_silveira@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {errors && <small className="error-warning">{errors.email}</small>}
          </div>
          <div>
            <label>CPF</label>
            <input
              placeholder="Digite o CPF sem pontos, ex: 43441234120"
              value={cpf}
              onChange={(e) => setcpf(e.target.value)}
              maxLength={11}
            />
            {errors && <small className="error-warning">{errors.cpf}</small>}
          </div>

          <div>
            <label>CEP</label>
            <input
              placeholder="Digite o CEP sem pontos. Ex: 08230070"
              value={cep}
              onChange={(e) => setCep(formatCEP(e.target.value))}
              onBlur={handleCepUser}
              maxLength={9}
            />
            {errors && <small className="error-warning">{errors.cep}</small>}
          </div>
          <div>
            <label>Bairro</label>
            <input
              placeholder="Paulista"
              value={cepResult ? cepResult.bairro : bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            {errors && <small className="error-warning">{errors.bairro}</small>}
          </div>

          <div>
            <label>Rua</label>
            <input
              placeholder="Rua"
              value={cepResult ? cepResult.logradouro : rua}
              onChange={(e) => setRua(e.target.value)}
            />
            {errors && <small className="error-warning">{errors.rua}</small>}
          </div>
          <div>
            <label>Numero</label>
            <input
              ref={focusRef}
              placeholder="2446"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            {errors && <small className="error-warning">{errors.numero}</small>}
          </div>
          <div>
            <label>Cidade</label>
            <input
              placeholder="São Paulo"
              value={cepResult ? cepResult.localidade : cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            {errors && <small className="error-warning">{errors.cidade}</small>}
          </div>

          <ButtonSubmit type="submit">
            <div>
              <p>{buttonName}</p>
            </div>
          </ButtonSubmit>
        </form>
      </NewUserFormulary>
    </FormUserContainer>
  );
};

export default EditUser;
