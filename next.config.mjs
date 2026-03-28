/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL:"https://ufzojnpwcchjcoykauup.supabase.co",
NEXT_PUBLIC_SUPABASE_ANON_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmem9qbnB3Y2NoamNveWthdXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTQyNjgsImV4cCI6MjA4OTkzMDI2OH0.pzh10bSRQDv2N_vDHfO2fBsoGLO6JDRfKihtKIYHwp4",
  },

  images:{
    domains:['lh3.googleusercontent.com'],
  },
}

export default nextConfig