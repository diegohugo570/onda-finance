import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TransferPage from '@/pages/Transfer'
import { useAuthStore } from '@/store/useAuthStore'
import { useTransactionStore } from '@/store/useTransactionStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('TransferPage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        balance: 1000.00
      },
      isAuthenticated: true
    })
    useTransactionStore.setState({ transactions: [] })
    queryClient.clear()
  })

  it('renders transfer form components correctly', () => {
    renderWithProviders(<TransferPage />)
    
    expect(screen.getByText('Nova Transferência')).toBeInTheDocument()
    expect(screen.getByLabelText(/Nome do Destinatário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Valor da Transferência/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Confirmar Transferência/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    renderWithProviders(<TransferPage />)
    
    const submitButton = screen.getByRole('button', { name: /Confirmar Transferência/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Nome do destinatário deve ter no mínimo 3 caracteres')).toBeInTheDocument()
      expect(screen.getByText('O valor deve ser maior que zero')).toBeInTheDocument()
    })
  })

  it('shows error when transfer amount exceeds balance', async () => {
    renderWithProviders(<TransferPage />)
    
    const recipientInput = screen.getByLabelText(/Nome do Destinatário/i)
    const amountInput = screen.getByLabelText(/Valor da Transferência/i)
    const submitButton = screen.getByRole('button', { name: /Confirmar Transferência/i })

    fireEvent.change(recipientInput, { target: { value: 'João da Silva' } })
    fireEvent.change(amountInput, { target: { value: '2000' } }) // Balance is 1000
    
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Saldo insuficiente')).toBeInTheDocument()
    })
  })

  it('successfully completes a transfer and resets form', async () => {
    renderWithProviders(<TransferPage />)
    
    const recipientInput = screen.getByLabelText(/Nome do Destinatário/i)
    const amountInput = screen.getByLabelText(/Valor da Transferência/i)
    const submitButton = screen.getByRole('button', { name: /Confirmar Transferência/i })

    fireEvent.change(recipientInput, { target: { value: 'João da Silva' } })
    fireEvent.change(amountInput, { target: { value: '500' } })
    
    fireEvent.click(submitButton)

    // Check loading state
    expect(screen.getByText('Processando...')).toBeInTheDocument()

    // Wait for success screen
    await waitFor(() => {
      expect(screen.getByText('Transferência Realizada!')).toBeInTheDocument()
    }, { timeout: 2000 })

    // Check if balance was updated
    expect(useAuthStore.getState().user?.balance).toBe(500)
    
    // Check if transaction was recorded
    expect(useTransactionStore.getState().transactions).toHaveLength(1)
    expect(useTransactionStore.getState().transactions[0].amount).toBe(500)
    expect(useTransactionStore.getState().transactions[0].recipient).toBe('João da Silva')
  })
})
