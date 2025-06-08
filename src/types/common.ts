
export interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

export interface OrderItem {
  medicationName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  prescriptionId?: string;
}

export type DeliveryMethod = 'pickup' | 'delivery' | 'drone' | 'mail' | 'courier';
export type OrderStatus = 'pending' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
