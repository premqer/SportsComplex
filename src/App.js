import React, { useDebugValue, useEffect, useState } from 'react'
import { supabase } from './helper/supabaseClient'

export default function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user)
  }, [])
  
  // find out why user not passing auth (possible: state issues or smth)
  const login = async() => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const logout = async() => {
    await supabase.auth.signOut();
  };


  return (
    <div>
      {user ? (
        <div>
      <h1>Authenticated</h1>
      <button onClick={logout}>Logout</button>
      </div>
    ):(
      <button onClick={login}>Login with GitHub</button> //this nigga just not working
      )}
      
    </div>
  )
}
