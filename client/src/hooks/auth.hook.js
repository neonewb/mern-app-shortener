import { useCallback, useEffect, useState } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState(null)
  const [userID, setUserID] = useState(null)

  const login = useCallback((jwtToken, ID) => {
    setToken(jwtToken)
    setUserID(ID)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userID: ID,
        token: jwtToken,
      })
    )
  }, [])

  const logOut = useCallback(() => {
    setToken(null)
    setUserID(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userID)
    }
    setReady(true)
  }, [login])

  return { login, logOut, token, userID, ready }
}
