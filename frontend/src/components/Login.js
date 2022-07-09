import { useRef } from "react"

export function Login({onLogin}) {

  // создаем рефы
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
}

    return(
        <section className="sign">
          <h1 className="sign__title">Вход</h1>
          <form onSubmit={handleSubmit} className="sign__form">
            <ul className="sign__list">
              <input className="sign__input" ref={emailRef} defaultValue={''} required type="email" name="signInEmail" placeholder="Email"></input>
              <input className="sign__input" ref={passwordRef} defaultValue={''} required type="text" name="signInPassword" placeholder="Пароль"></input>
            </ul>
            <button className="sign__button" type="submit">Войти</button>
          </form>
        </section>
    )
}