
// Tipos para funcionalidades de blockchain y criptomonedas

export interface CryptoPayment {
  id: string;
  userId: string;
  appointmentId?: string;
  amount: number;
  cryptocurrency: 'BTC' | 'ETH' | 'USDC' | 'USDT';
  walletAddress: string;
  transactionHash?: string;
  blockchainNetwork: 'mainnet' | 'testnet';
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  confirmations: number;
  requiredConfirmations: number;
  gasPrice?: string;
  gasFee?: number;
  exchangeRate: number; // Rate to USD at time of transaction
  createdAt: string;
  confirmedAt?: string;
}

export interface SmartContract {
  id: string;
  contractAddress: string;
  network: string;
  type: 'insurance_claim' | 'payment_escrow' | 'medical_record_access' | 'subscription';
  abi: any[];
  deployedAt: string;
  owner: string;
  status: 'active' | 'paused' | 'terminated';
  functions: ContractFunction[];
}

export interface ContractFunction {
  name: string;
  type: 'read' | 'write';
  inputs: ContractParameter[];
  outputs: ContractParameter[];
  gasEstimate?: number;
}

export interface ContractParameter {
  name: string;
  type: string;
  description: string;
}

export interface BlockchainMedicalRecord {
  id: string;
  patientId: string;
  recordHash: string;
  ipfsHash?: string;
  blockchainTxHash: string;
  blockNumber: number;
  timestamp: string;
  accessControlContract: string;
  encryptionKey: string;
  permissions: BlockchainPermission[];
}

export interface BlockchainPermission {
  grantedTo: string;
  role: 'doctor' | 'patient' | 'lab' | 'insurance' | 'researcher';
  permissions: string[];
  expiresAt?: string;
  grantedAt: string;
  revokedAt?: string;
}

export interface CryptoWallet {
  id: string;
  userId: string;
  address: string;
  publicKey: string;
  encryptedPrivateKey: string; // Encrypted and stored securely
  network: string;
  balance: Record<string, number>;
  transactions: CryptoTransaction[];
  isActive: boolean;
  createdAt: string;
}

export interface CryptoTransaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  type: 'payment' | 'refund' | 'fee';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
}
