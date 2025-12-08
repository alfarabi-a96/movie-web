/* eslint-disable react-refresh/only-export-components */

import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { MemoryRouterProps } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { I18nextProvider } from 'react-i18next'
import { FavoritesProvider } from './context/FavoritesProvider'
import { ThemeProvider } from './context/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import i18n from './locales/i18n'

/**
 * Options for custom render function
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Initial routes for MemoryRouter */
  initialEntries?: MemoryRouterProps['initialEntries']
}

/**
 * Creates a QueryClient with testing defaults (no retries)
 */
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

/**
 * Wrapper with all required providers for testing:
 * i18n, React Query, Router, Theme, Auth, Favorites
 */
const AllTheProviders = ({
  children,
  initialEntries
}: {
  children: ReactNode
  initialEntries?: MemoryRouterProps['initialEntries']
}) => {
  const queryClient = createQueryClient()

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <ThemeProvider>
            <AuthProvider>
              <FavoritesProvider>{children}</FavoritesProvider>
            </AuthProvider>
          </ThemeProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </I18nextProvider>
  )
}

/**
 * Custom render function that wraps components with all providers
 * @param ui - React component to render
 * @param options.initialEntries - Initial routes (e.g., ['/movie/550'])
 *
 * @example
 * render(<LoginPage />)
 * render(<MoviePage />, { initialEntries: ['/movie/550'] })
 */
export const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const { initialEntries, ...renderOptions } = options || {}

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialEntries={initialEntries}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions
  })
}

/**
 * Re-export all React Testing Library utilities
 */
export * from '@testing-library/react'

/**
 * Export custom render function as 'render' to replace default
 */
export { customRender as render }
