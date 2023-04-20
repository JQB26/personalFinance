import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from "./home/Home";

const supabaseUrl = ''
const supabaseKey = ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const logout = () => {
    supabase.auth.signOut()
  }

  if (!session) {
    return (
        <div style={{width: '100vw', height: '100vh', backgroundColor: '#0c090d'}}>
            <div style={{borderRadius: 10, borderStyle: 'solid', borderColor: '#3fcf8e', borderWidth: 1, maxWidth: 300, height: 410, padding: '2em', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google']}
                theme="dark"
              />
            </div>
        </div>
    )
  }
  else {
    return (
        <div>
          <button onClick={logout}>Logout</button>
          <Home />
        </div>
          )
  }
}