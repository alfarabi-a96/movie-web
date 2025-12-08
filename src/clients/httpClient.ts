import { API_BASE_URL, API_TOKEN } from './endpoint'

type optionsType = {
  method?: string
  headers?: Record<string, string>
  body?: string
  params?: string | Record<string, string> | string[][] | URLSearchParams
}

export const apiFetch = async (
  endpoint: string,
  options = {} as optionsType
) => {
  const query = new URLSearchParams(options.params)
  console.log('aaaa', query.toString())
  const res = await fetch(`${API_BASE_URL}${endpoint}?${query}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
      ...(options.headers || {})
    }
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`API Error ${res.status}: ${res.statusText} - ${errorBody}`)
  }

  return res.json()
}
