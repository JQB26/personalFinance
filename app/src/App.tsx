import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('', '')

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
        <div style={{backgroundColor: 'darkgray', width: '50vw', height: '60vh', padding: '2em', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook']}
            theme="dark"
          />
        </div>
    )
  }
  else {
    return (<button onClick={logout}>Logout</button> )
  }
}