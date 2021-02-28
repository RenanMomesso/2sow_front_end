export const setLocalStorage = (key: string, value: string) => {
  if (window != undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const isAuth = () => {
  if (window !== undefined) {
    if (localStorage.getItem("email")) {
      return JSON.parse(localStorage.getItem("email") || '{}');
    } else {
      return false;
    }
  }
};

export const signout = (next:any) => {
  localStorage.removeItem("email")
  next();
}

export const numberPattern = /\d+/g;
export const formatCEP = (value:string) => {
  const auxCep = (value || "").match(numberPattern);
  const _cep = (auxCep || []).join('');
  return _cep.length > 5 ? _cep.slice(0,5)+'-'+_cep.slice(5,8) : _cep;
};