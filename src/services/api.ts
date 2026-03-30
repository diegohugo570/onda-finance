import { useTransactionStore } from '@/store/useTransactionStore'

// Mocking API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const MOCK_INITIAL_TRANSACTIONS = [
  {
    id: '1',
    description: 'Pix Recebido - João Silva',
    amount: 1500.00,
    type: 'IN' as const,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: '2',
    description: 'Pagamento Boleto Luz',
    amount: 250.50,
    type: 'OUT' as const,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
  },
  {
    id: '3',
    description: 'Ifood * Restaurante',
    amount: 45.90,
    type: 'OUT' as const,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  }
]

export const api = {
  transactions: {
    fetch: async () => {
      await delay(800)
      const store = useTransactionStore.getState()
      
      // If store is empty (first load), populate it
      if (store.transactions.length === 0) {
        store.setTransactions(MOCK_INITIAL_TRANSACTIONS)
        return MOCK_INITIAL_TRANSACTIONS
      }
      
      return store.transactions
    },
    create: async (data: { amount: number, recipient: string, description: string }) => {
      await delay(1000)
      
      const newTx = {
        amount: data.amount,
        description: data.description,
        recipient: data.recipient,
        type: 'OUT' as const,
      }
      
      useTransactionStore.getState().addTransaction(newTx)
      
      // Return the created transaction
      return newTx
    }
  }
}
