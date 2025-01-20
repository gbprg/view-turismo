"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./utils/QueryClient"
import { Toaster } from "sonner"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      {children}
    </QueryClientProvider>
  )
}