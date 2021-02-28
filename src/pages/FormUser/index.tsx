import React, { useState, useEffect } from "react";
import { FormUserContainer, NewUserFormulary, ButtonSubmit } from "./styles";
import axios from "axios";
import { useHistory } from "react-router";
import { formatCEP, isAuth } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CepInterface, ValidationError } from "../../utils/interfaces";

const FormUser = () => {
  const history = useHistory();

  const [buttonName, setButtonName] = useState("Submit");
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

  const handleCepUser = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    console.log("VALUE",value)
  
    
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

  const redirect = () => {
    if (!isAuth()) {
      return history.push("/");
    }
  };

  useEffect(() => {
    redirect();
  }, []);

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
    setButtonName("Registrando...");
    await axios.post("http://localhost:5000/usuarios", {
      data: registerData,
    });
    setButtonName("CADASTRADO");

    toast.success("Usuário criado com sucesso");
    setTimeout(() => {
      history.push("/users");
    }, 2000);
  };

  const validate = () => {
    const newErros: ValidationError = {} as ValidationError;
    if (!name)
      newErros.name = "Nome de usuário obrigatório ou maior que 4 caracteres.";
    if (!cpf) newErros.cpf = "Preencha corretamente o cpf do usuário.";
    if (!email)
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

  return (
    <FormUserContainer>
      <ToastContainer />
      <NewUserFormulary>
        <form onSubmit={handleSubmit}>
          <span>Cadastrar novo usuário</span>
          <div>
            <label>Nome do usuário</label>
            <input
              placeholder="Jão da silva teixeira"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors && <small className="error-warning">{errors.name}</small>}
          </div>
          <div>
            <label>Email do usuário</label>
            <input
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
              placeholder="Digite seu cep. Ex: 08230-070"
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

export default FormUser;
