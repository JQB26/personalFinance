import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts";


interface AssetData {
  name: string,
  ticker: string,
  type: string,
  shares: number,
}

interface Asset extends AssetData {
  id: string,
  user_id: string,
  is_favourite: boolean,
}

async function createAsset(supabaseClient: SupabaseClient, assetData: AssetData) {
  const asset: Asset = {
    ...assetData,
    id: self.crypto.randomUUID(),
    user_id: self.crypto.randomUUID(), // TODO: get authenticated userId
    is_favourite: false
  }

  const { error } = await supabaseClient.from('assets').insert(task)
  if (error) throw error

  return new Response(JSON.stringify({ asset }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function getAsset(supabaseClient: SupabaseClient, id: string) {
  const { data: asset, error } = await supabaseClient.from('assets').select('*').eq('id', id)
  if (error) throw error

  return new Response(JSON.stringify({ asset }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function getAllAssets(supabaseClient: SupabaseClient, id: string) {
  const { data: assets, error } = await supabaseClient.from('assets').select('*')
  if (error) throw error

  return new Response(JSON.stringify({ assets }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

serve(async (req: Request) => {
  const { url, method } = req

  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        // { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const myAssetsPattern = new URLPattern({ pathname: '/my-assets/:id' })
    const matchingPath = myAssetsPattern.exec(url)
    const id = matchingPath ? matchingPath.pathname.groups.id : null

    let asset = null
    if (method === 'POST' || method === 'PUT') {
      const body = await req.json()
      asset = body.asset
    }

    switch (true) {
      case id && method === 'GET':
        return getAsset(supabaseClient, id as string)
      case method === 'POST':
        return createAsset(supabaseClient, asset)
      case method === 'GET':
        return getAllAssets(supabaseClient)
      default:
        return getAllAssets(supabaseClient)
    }

    // const {
    //   data: { user },
    // } = await supabaseClient.auth.getUser()

    // const { data, error } = await supabase.from('assets').select('*')
    // if (error) throw error

    // return new Response(JSON.stringify({ data }), {
    //   headers: {...corsHeaders, 'Content-Type': 'application/json' },
    //   status: 200,
    // })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
