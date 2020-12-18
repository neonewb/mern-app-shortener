import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const NavBar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logOutHandler = (event) => {
    event.preventDefault()
    auth.logOut()
    history.push('/')
  }

  return (
    <div>
      <nav>
        <div className='nav-wrapper teal lighten-1' style={{padding: '0 2rem'}}>
          <span href='/' className='brand-logo'>
            Сокращение ссылок
          </span>
          <ul id='nav-mobile' className='right hide-on-small-only'>
            <li>
              <NavLink to='/create'>Создать</NavLink>
            </li>
            <li>
              <NavLink to='/links'>Ссылки</NavLink>
            </li>
            <li>
              <a href='/' onClick={logOutHandler}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
