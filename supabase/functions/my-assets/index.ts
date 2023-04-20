import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts";


interface AssetData {
  name: string,
  ticker: string,
  type: string,
  shares: number,
}

interface AssetUpdates extends AssetData {
  is_favourite: boolean,
}

interface Asset extends AssetUpdates {
  id: string,
  user_id: string,
}

async function createAsset(supabaseClient: SupabaseClient, assetData: AssetData) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  const asset: Asset = {
    ...assetData,
    id: self.crypto.randomUUID(),
    user_id: user.id,
    is_favourite: false
  }

  const { error } = await supabaseClient.from('assets').insert(asset)
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

async function getAllAssets(supabaseClient: SupabaseClient) {
  const { data: assets, error } = await supabaseClient.from('assets').select('*')
  if (error) throw error

  return new Response(JSON.stringify({ assets }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function deleteAsset(supabaseClient: SupabaseClient, id: string) {
  const { error } = await supabaseClient.from('assets').delete().eq('id', id)
  if (error) throw error

  return new Response(JSON.stringify({}), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function updateAsset(supabaseClient: SupabaseClient, id: string, assetUpdates: AssetUpdates) {
  const { error } = await supabaseClient.from('assets').update(assetUpdates).eq('id', id)
  if (error) throw error

  return new Response(JSON.stringify({}), {
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
        { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
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
      case id && method === 'PUT':
        return updateAsset(supabaseClient, id as string, asset)
      case id && method === 'DELETE':
        return deleteAsset(supabaseClient, id as string)
      case method === 'POST':
        return createAsset(supabaseClient, asset)
      case method === 'GET':
        return getAllAssets(supabaseClient)
      default:
        return getAllAssets(supabaseClient)
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
