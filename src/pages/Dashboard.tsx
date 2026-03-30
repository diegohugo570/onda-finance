import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthStore } from '@/store/useAuthStore'
import { api } from '@/services/api'
import { Wallet, ArrowUpCircle, ArrowDownCircle, ArrowRightLeft } from 'lucide-react'

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: api.transactions.fetch,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-primary text-primary-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
            <Wallet className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{user ? formatCurrency(user.balance) : 'R$ 0,00'}</div>
            <p className="text-xs opacity-75 mt-1">
              Atualizado em tempo real
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" /> 
            Últimas Transações
          </CardTitle>
          <CardDescription>
            Acompanhe a movimentação da sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : !transactions || transactions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground bg-slate-50 rounded-lg">
              <p>Nenhuma transação encontrada.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full mr-4 \${tx.type === 'IN' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {tx.type === 'IN' ? <ArrowDownCircle /> : <ArrowUpCircle />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(tx.date)}
                    </p>
                  </div>
                  <div className={`font-semibold \${tx.type === 'IN' ? 'text-green-600' : ''}`}>
                    {tx.type === 'IN' ? '+' : '-'} {formatCurrency(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
