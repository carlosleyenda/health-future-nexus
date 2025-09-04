import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { APP_CONFIG } from '@/lib/constants';

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  emergencyNumber: string;
}

const countries: Country[] = [
  {
    code: 'peru',
    name: 'Perú',
    flag: '🇵🇪',
    currency: 'PEN',
    emergencyNumber: '116'
  },
  {
    code: 'chile', 
    name: 'Chile',
    flag: '🇨🇱',
    currency: 'CLP',
    emergencyNumber: '131'
  },
  {
    code: 'colombia',
    name: 'Colombia', 
    flag: '🇨🇴',
    currency: 'COP',
    emergencyNumber: '123'
  },
  {
    code: 'venezuela',
    name: 'Venezuela',
    flag: '🇻🇪', 
    currency: 'VES',
    emergencyNumber: '911'
  }
];

interface CountrySelectorProps {
  selectedCountry?: string;
  onCountryChange: (country: string) => void;
  showEmergencyInfo?: boolean;
}

export default function CountrySelector({ 
  selectedCountry, 
  onCountryChange, 
  showEmergencyInfo = false 
}: CountrySelectorProps) {
  const selected = countries.find(c => c.code === selectedCountry);

  return (
    <div className="space-y-3">
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona tu país">
            {selected && (
              <span className="flex items-center gap-2">
                <span className="text-lg">{selected.flag}</span>
                {selected.name}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className="flex items-center gap-2">
                <span className="text-lg">{country.flag}</span>
                {country.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showEmergencyInfo && selected && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
          <div className="flex items-center gap-2 text-red-700 font-medium">
            🚨 Emergencias en {selected.name}
          </div>
          <div className="text-red-600 mt-1">
            Llamar al: <span className="font-mono font-bold">{selected.emergencyNumber}</span>
          </div>
        </div>
      )}
    </div>
  );
}