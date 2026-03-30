import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'
import { api } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, DollarSign, Send, CheckCircle2 } from 'lucide-react'

// Dynamic schema generation to include current balance check
const getTransferSchema = (balance: number) => z.object({
  recipient: z.string().min(3, 'Nome do destinatário deve ter no mínimo 3 caracteres'),
  amount: z.number({ message: 'Valor inválido' })
    .positive('O valor deve ser maior que zero')
    .max(balance, 'Saldo insuficiente'),
  description: z.string().optional(),
})

type TransferFormInputs = z.infer<ReturnType<typeof getTransferSchema>>

export default function TransferPage() {
  const { user, updateBalance } = useAuthStore()
  const queryClient = useQueryClient()
  const [isSuccess, setIsSuccess] = useState(false)
  const currentBalance = user?.balance ?? 0

  const schema = getTransferSchema(currentBalance)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipient: '',
      description: '',
    }
  })

  const mutation = useMutation({
    mutationFn: api.transactions.create,
    onSuccess: (data) => {
      // Update global balance
      updateBalance(-data.amount)
      // Invalidate and refetch transactions
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setIsSuccess(true)
      reset()
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    },
  })

  const onSubmit = (data: TransferFormInputs) => {
    mutation.mutate({
      amount: data.amount,
      recipient: data.recipient,
      description: data.description || ('Transferência para ' + data.recipient)
    })
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Depósito / Pix</h2>
      </div>

      <Card className="shadow-lg border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Nova Transferência
          </CardTitle>
          <CardDescription>
            Envie dinheiro instantaneamente para qualquer conta
          </CardDescription>
        </CardHeader>
        
        {isSuccess ? (
          <CardContent className="py-10 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-green-600">Transferência Realizada!</h3>
            <p className="text-muted-foreground">O valor foi enviado com sucesso para o destinatário.</p>
            <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
              Fazer nova transferência
            </Button>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between border">
                <span className="text-sm font-medium text-muted-foreground">Saldo Disponível:</span>
                <span className="text-lg font-bold text-primary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentBalance)}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Nome do Destinatário</Label>
                <Input
                  id="recipient"
                  placeholder="Ex: Maria Santos"
                  {...register('recipient')}
                  className={errors.recipient ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.recipient && <p className="text-xs text-destructive">{errors.recipient.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor da Transferência (R$)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register('amount', { valueAsNumber: true })}
                    className={"pl-10 " + (errors.amount ? 'border-destructive focus-visible:ring-destructive' : '')}
                  />
                </div>
                {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Input
                  id="description"
                  placeholder="Mensagem para o destinatário"
                  {...register('description')}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full text-md h-12" 
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Confirmar Transferência'
                )}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
