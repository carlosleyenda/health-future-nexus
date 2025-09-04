import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { APP_CONFIG } from '@/lib/constants';

interface RegionalSettings {
  selectedCountry: string;
  currency: string;
  emergencyNumber: string;
  supportPhone: string;
  setCountry: (country: string) => void;
  getLocalizedPrice: (basePrice: number) => { amount: number; currency: string; symbol: string };
}

const currencyMultipliers = {
  peru: 3.7,      // USD to PEN
  chile: 950,     // USD to CLP  
  colombia: 4100, // USD to COP
  venezuela: 36   // USD to VES (simplified)
};

const currencySymbols = {
  PEN: 'S/',
  CLP: '$',
  COP: '$',
  VES: 'Bs'
};

export const useRegionalSettings = create<RegionalSettings>()(
  persist(
    (set, get) => ({
      selectedCountry: 'peru', // Default
      currency: 'PEN',
      emergencyNumber: '116',
      supportPhone: '+51 (1) 234-5678',
      
      setCountry: (country: string) => {
        const currency = APP_CONFIG.currencies[country as keyof typeof APP_CONFIG.currencies];
        const emergencyNumber = APP_CONFIG.emergency_numbers[country as keyof typeof APP_CONFIG.emergency_numbers];
        const supportPhone = APP_CONFIG.support.phone[country as keyof typeof APP_CONFIG.support.phone];
        
        set({
          selectedCountry: country,
          currency,
          emergencyNumber,
          supportPhone
        });
      },
      
      getLocalizedPrice: (basePrice: number) => {
        const { selectedCountry, currency } = get();
        const multiplier = currencyMultipliers[selectedCountry as keyof typeof currencyMultipliers] || 1;
        const localizedAmount = Math.round(basePrice * multiplier);
        const symbol = currencySymbols[currency as keyof typeof currencySymbols] || currency;
        
        return {
          amount: localizedAmount,
          currency,
          symbol
        };
      }
    }),
    {
      name: 'regional-settings',
    }
  )
);