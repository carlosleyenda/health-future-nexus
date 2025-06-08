
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bitcoin, 
  Coins, 
  Wallet, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Copy,
  ExternalLink
} from 'lucide-react';
import type { CryptoPayment, CryptoWallet } from '@/types/blockchain';

interface CryptoPayProps {
  amount: number;
  appointmentId?: string;
  onPaymentComplete: (payment: CryptoPayment) => void;
}

export default function CryptoPay({ amount, appointmentId, onPaymentComplete }: CryptoPayProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDC' | 'USDT'>('USDC');
  const [walletAddress, setWalletAddress] = useState('');
  const [currentPayment, setCurrentPayment] = useState<CryptoPayment | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', icon: Bitcoin, rate: 0.000023 },
    { symbol: 'ETH', name: 'Ethereum', icon: Coins, rate: 0.00034 },
    { symbol: 'USDC', name: 'USD Coin', icon: Coins, rate: 1.0 },
    { symbol: 'USDT', name: 'Tether', icon: Coins, rate: 1.0 }
  ];

  const selectedOption = cryptoOptions.find(c => c.symbol === selectedCrypto)!;
  const cryptoAmount = amount * selectedOption.rate;
  const paymentAddress = `0x742d35Cc6AB1C3E9C14aF2Bb55CCDA7E`;

  const initiatePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simular inicio de pago
      const payment: CryptoPayment = {
        id: crypto.randomUUID(),
        userId: 'user-123',
        appointmentId,
        amount: cryptoAmount,
        cryptocurrency: selectedCrypto,
        walletAddress: paymentAddress,
        blockchainNetwork: 'mainnet',
        status: 'pending',
        confirmations: 0,
        requiredConfirmations: selectedCrypto === 'BTC' ? 6 : 12,
        exchangeRate: 1 / selectedOption.rate,
        createdAt: new Date().toISOString()
      };

      setCurrentPayment(payment);

      // Simular confirmaciones de blockchain
      setTimeout(() => {
        setCurrentPayment(prev => prev ? {
          ...prev,
          status: 'confirmed',
          transactionHash: '0x' + Math.random().toString(16).substring(2, 66),
          confirmations: prev.requiredConfirmations,
          confirmedAt: new Date().toISOString()
        } : null);
        
        if (payment) {
          onPaymentComplete({
            ...payment,
            status: 'confirmed',
            transactionHash: '0x' + Math.random().toString(16).substring(2, 66),
            confirmations: payment.requiredConfirmations,
            confirmedAt: new Date().toISOString()
          });
        }
      }, 5000);

    } catch (error) {
      console.error('Error initiating crypto payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(paymentAddress);
  };

  if (currentPayment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <selectedOption.icon className="h-5 w-5 mr-2" />
            Pago con {selectedOption.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            {currentPayment.status === 'pending' ? (
              <div className="space-y-4">
                <Clock className="h-12 w-12 mx-auto text-yellow-500 animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold">Esperando Confirmación</h3>
                  <p className="text-sm text-gray-600">
                    Confirmaciones: {currentPayment.confirmations} / {currentPayment.requiredConfirmations}
                  </p>
                </div>
                <Progress 
                  value={(currentPayment.confirmations / currentPayment.requiredConfirmations) * 100} 
                  className="w-full"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold text-green-600">Pago Confirmado</h3>
                  <p className="text-sm text-gray-600">
                    Tu pago ha sido procesado exitosamente
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Cantidad:</span>
                  <div className="font-semibold">
                    {cryptoAmount.toFixed(8)} {selectedCrypto}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">USD Equivalente:</span>
                  <div className="font-semibold">${amount}</div>
                </div>
                <div>
                  <span className="text-gray-600">Red:</span>
                  <div className="font-semibold">{currentPayment.blockchainNetwork}</div>
                </div>
                <div>
                  <span className="text-gray-600">Estado:</span>
                  <Badge variant={currentPayment.status === 'confirmed' ? 'default' : 'secondary'}>
                    {currentPayment.status}
                  </Badge>
                </div>
              </div>
            </div>

            {currentPayment.transactionHash && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Hash de Transacción:</span>
                  <div className="font-mono text-xs">
                    {currentPayment.transactionHash.substring(0, 20)}...
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Ver en Blockchain
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="h-5 w-5 mr-2" />
          Pago con Criptomonedas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold">${amount}</div>
          <div className="text-sm text-gray-600">Total a pagar</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Selecciona Criptomoneda:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {cryptoOptions.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => setSelectedCrypto(crypto.symbol as any)}
                className={`p-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                  selectedCrypto === crypto.symbol
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <crypto.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{crypto.symbol}</div>
                  <div className="text-xs text-gray-500">{crypto.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Cantidad a enviar:</span>
            <span className="font-semibold">
              {cryptoAmount.toFixed(8)} {selectedCrypto}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tasa de cambio:</span>
            <span className="text-sm">
              1 USD = {selectedOption.rate.toFixed(8)} {selectedCrypto}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Dirección de pago:
          </label>
          <div className="flex items-center space-x-2">
            <Input 
              value={paymentAddress} 
              readOnly 
              className="font-mono text-xs"
            />
            <Button variant="outline" size="sm" onClick={copyAddress}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-2 text-sm">
            <Shield className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Pagos seguros protegidos por blockchain</span>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>Las transacciones de criptomonedas son irreversibles</span>
          </div>
        </div>

        <Button 
          onClick={initiatePayment} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <Clock className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <selectedOption.icon className="h-4 w-4 mr-2" />
          )}
          Procesar Pago
        </Button>
      </CardContent>
    </Card>
  );
}
