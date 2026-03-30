import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TransactionType = 'IN' | 'OUT'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  date: string
  description: string
  recipient?: string
}

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void
  setTransactions: (txs: Transaction[]) => void
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (tx) => 
        set((state) => ({
          transactions: [
            {
              ...tx,
              id: crypto.randomUUID(),
              date: new Date().toISOString()
            },
            ...state.transactions
          ]
        })),
      setTransactions: (transactions) => set({ transactions })
    }),
    {
      name: 'onda-transactions-storage'
    }
  )
)
