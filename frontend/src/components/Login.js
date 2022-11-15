import React, {useState} from "react";

function Login({onLogin}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt){
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt){
    setPassword(evt.target.value);
  }

  function handleSubmit(evt){
    evt.preventDefault();
    onLogin(email, password);   
  }

  return (
    <div className="auth">
      <h2 className="auth__title ">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Email"
          type="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <input
          className="auth__input"
          placeholder="Пароль"
          type="password"
          name="password"
          minLength="4"
          maxLength="12"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="auth__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
