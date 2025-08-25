
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_PUSHER_APP_KEY: string
  readonly VITE_PUSHER_APP_CLUSTER: string
  readonly VITE_PUSHER_HOST: string
  readonly VITE_PUSHER_PORT: string
  readonly VITE_PUSHER_SCHEME: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_SUPABASE_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
