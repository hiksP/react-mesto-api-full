import { useRef } from "react";
import { Link, Navigate } from "react-router-dom";

export function Register({login, onRegister}) {

  // создаем рефы
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
}

    return   login ? (
      <Navigate to="/" />
    ) : (
        <section className="sign">
          <h1 className="sign__title">Регистрация</h1>
          <form onSubmit={handleSubmit} className="sign__form">
            <ul className="sign__list">
              <input className="sign__input" ref={emailRef} defaultValue={''} required type="email" name="signUpEmail" placeholder="Email"></input>
              <input className="sign__input" ref={passwordRef} defaultValue={''} required type="text" name="signUpPassword" placeholder="Пароль"></input>
            </ul>
            <button className="sign__button" type="submit">Зарегистрироваться</button>
            <Link className="sign__reminder" to="/sign-in">Уже зарегистрированы? Войти</Link>
          </form>
        </section>
    )
}