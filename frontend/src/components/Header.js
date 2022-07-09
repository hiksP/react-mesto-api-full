import { Link, Route, Routes } from "react-router-dom";
import headerLogo from "../images/headerLogo.svg";

export function Header({email, onCLick}) {

    return(
        <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип Mesto"/>
        <Routes>
          <Route path="/"
          element={
          <div className="header__text-box">
            <p className="header__text">{email}</p>
            <p onClick={onCLick} className="header__text header__text_button">Выйти</p>
          </div> } />
          <Route path="/sign-up"
          element={
            <div className="header__text-box">
              <Link className="header__text header__text_button" to="/sign-in">Войти</Link>
            </div>  
          }/>
          <Route path="/sign-in"
          element={
          <div className="header__text-box">
            <Link className="header__text header__text_button" to="/sign-up">Зарегистрироваться</Link>
          </div>  
          } />
        </Routes>
      </header>
    );
};
