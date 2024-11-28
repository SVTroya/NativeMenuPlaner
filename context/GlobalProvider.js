import {createContext, useContext, useEffect, useState} from 'react'
import {getCurrentUser} from '../lib/arrwrite'

const GlobalContext = createContext()

export function useGlobalContext() {
  return useContext(GlobalContext)
}

export function GlobalProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true)
          setUser(user)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider