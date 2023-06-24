import wretch from 'wretch'
import AbortAddon from 'wretch/addons/abort'

export const api = wretch(import.meta.env.VITE_API_URL).addon(AbortAddon())
