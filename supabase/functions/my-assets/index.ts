import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts";


serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        // { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // const {
    //   data: { user },
    // } = await supabaseClient.auth.getUser()

    const { data, error } = await supabaseClient.from('assets').select('*')
    if (error) throw error

    return new Response(JSON.stringify({ data }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
