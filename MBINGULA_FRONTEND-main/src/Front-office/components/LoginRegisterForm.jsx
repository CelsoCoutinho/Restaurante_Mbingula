import React, { useContext, useState, useEffect } from 'react';
import api from '../../service/api';
import { IoClose } from "react-icons/io5";
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginRegisterForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const accessName = "normal";

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const { signIn, signed } = useContext(AuthContext);

  const handleSaveUser = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!name) {
      setErrorName("O nome é obrigatório.");
      hasError = true;
    } else {
      setErrorName("");
    }

    if (!email) {
      setErrorEmail("O email é obrigatório.");
      hasError = true;
    } else if (!email.includes("@")) {
      setErrorEmail("Email inválido.");
      hasError = true;
    } else {
      setErrorEmail("");
    }

    if (!phone) {
      setErrorPhone("O telefone é obrigatório.");
      hasError = true;
    } else if (!phone.startsWith("9") || phone.length !== 9) {
      setErrorPhone("Telefone inválido.");
      hasError = true;
    } else {
      setErrorPhone("");
    }

    if (!password) {
      setErrorPassword("A senha é obrigatória.");
      hasError = true;
    } else {
      setErrorPassword("");
    }

    if (hasError) {
      return;
    }

    const data = {
      name, email, phone, password, accessName
    }

    try {
      await api.post("/user", data);
      setIsCreated(true);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  useEffect(() => {
    if (isCreated) {
      const timer = setTimeout(() => {
        location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCreated]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      phone,
      password,
    };
    await signIn(data);
  };

  if (signed) {
    return <Navigate to="/" />
  } else {
    return (
      <div id='login-register'>
        <div className="div-main">

          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="login">
            <h1>Login</h1>
            <form className="form" onSubmit={handleSignIn}>

              <input
                className="input"
                id="telSign"
                type="tel"
                name="tel"
                placeholder={errorPhone ? errorPhone : "Telefone"}
                style={{ borderColor: errorPhone ? 'red' : '', color: errorPhone ? 'red' : '' }}
                required=""
                autoComplete='off'
                onFocus={() => setErrorPhone("")}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="input"
                id="passwordSign"
                type="password"
                name="password"
                placeholder={errorPassword ? errorPassword : "Password"}
                style={{ borderColor: errorPassword ? 'red' : '', color: errorPassword ? 'red' : '' }}
                required=""
                autoComplete='off'
                onFocus={() => setErrorPassword("")}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type='submit' className='btn-form'>Entrar</button>

              <div className='div-Nconta'>
                <p className='N-conta'>Não tem uma conta?</p>
                <label className="abrir-logout" htmlFor="chk" aria-hidden="true">registra-se</label>
              </div>
            </form>
          </div>

          <div className="register">
            <form className="form1" onSubmit={handleSaveUser}>

              <div className='fechar-registrar'>
                <label className='fechar-registrar1' htmlFor="chk" aria-hidden="true"><i><IoClose /></i></label>
              </div>

              <h1>SignUp</h1>

              <input
                className="input"
                type="text"
                name="txt"
                placeholder={errorName ? errorName : "Nome"}
                style={{ borderColor: errorName ? 'red' : '', color: errorName ? 'red' : '' }}
                autoComplete='off'
                onFocus={() => setErrorName("")}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="input"
                type="email"
                name="email"
                placeholder={errorEmail ? errorEmail : "Email"}
                style={{ borderColor: errorEmail ? 'red' : '', color: errorEmail ? 'red' : '' }}
                autoComplete='off'
                onFocus={() => setErrorEmail("")}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="input"
                type="number"
                name="pswd"
                placeholder={errorPhone ? errorPhone : "Telefone"}
                style={{ borderColor: errorPhone ? 'red' : '', color: errorPhone ? 'red' : '' }}
                autoComplete='off'
                onFocus={() => setErrorPhone("")}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="input"
                type="password"
                name="pswd"
                placeholder={errorPassword ? errorPassword : "Senha"}
                style={{ borderColor: errorPassword ? 'red' : '', color: errorPassword ? 'red' : '' }}
                autoComplete='off'
                onFocus={() => setErrorPassword("")}
                onChange={(e) => setPassword(e.target.value)}
              />

              {isCreated ? (
                <p style={{ color: 'green' }}>Criado com sucesso!</p>
              ) : (
                <button type='submit' className='btn-form'>Registrar</button>
              )}

            </form>
          </div>
        </div>
      </div>

    )
  }
}

export default LoginRegisterForm;
