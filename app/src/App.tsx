import './index.css'
import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from "./home/Home";
import {QueryClient, QueryClientProvider} from "react-query";
import {Colors} from "./shared/colors";

const supabaseUrl = ''
const supabaseKey = ''

export const supabase = createClient(supabaseUrl, supabaseKey)

const queryClient = new QueryClient()

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

  if (!session) {
    return (
        <div style={{width: '100vw', height: '100vh', backgroundColor: Colors.BG}}>
            <div style={{borderRadius: 10, borderStyle: 'solid', borderColor: Colors.Accent, borderWidth: 1, maxWidth: 300, height: 410, padding: '2em', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
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
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    )
  }
}