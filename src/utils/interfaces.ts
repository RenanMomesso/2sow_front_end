export interface CepInterface {
    logradouro: string;
    bairro: string;
    localidade: string;
}

export interface ValidationError {
    name: string;
    cpf: string;
    email: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
}

export interface CepInterface {
    logradouro: string;
    bairro: string;
    localidade: string;
}

export interface ValidationError {
    name: string;
    cpf: string;
    email: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
}

export interface UserData {
    data: {
        nome: string;
        cpf: string;
        email: string;
        endereco: {
            bairro: string;
            cep: string;
            cidade: string;
            numero: string;
            rua: string;
        };
    };
}

export interface paramsProps {
    id: string;
}

export interface User {
    id: string;
    data: {
      nome: string;
      cpf: number;
      email: string;
      endereco: {
        cep: number;
        bairro: string;
        cidade: string;
        rua: number;
      };
    };
  }