import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (err) {
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userID)
      message(data.message)
    } catch (err) {
    }
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Сокращение ссылки</h1>
        <div className='card teal'>
          <div className='card-content white-text'>
            <span className='card-title'>Авторизация</span>

            <div>
              <div className='input-field'>
                <input
                  placeholder='Email'
                  id='email'
                  name='email'
                  type='text'
                  className='white-input'
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Введите email</label>
              </div>
            </div>

            <div>
              <div className='input-field'>
                <input
                  placeholder='Password'
                  id='password'
                  name='password'
                  type='password'
                  className='white-input'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Введите пароль</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn deep-purple lighten-4 black-text'
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}>
              Войти
            </button>
            <button
              className='btn teal lighten-5 black-text'
              onClick={registerHandler}
              disabled={loading}>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
