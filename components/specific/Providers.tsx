'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import React from 'react'


const Providers = ({ children, session }: { children: React.ReactNode, session: any }) => {
  const queryClient = new QueryClient()

  return (
    <NextThemesProvider>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </NextThemesProvider>
  )
}

export default Providers