
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, AlertCircle, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PharmacyMedicationService } from '@/services/api/pharmacyMedicationService';
import { toast } from 'sonner';
import type { Medication } from '@/types/pharmacy';

interface MedicationSearchProps {
  onAddToCart: (medication: Medication) => void;
}

export default function MedicationSearch({ onAddToCart }: MedicationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications', debouncedQuery, selectedCategory],
    queryFn: () => PharmacyMedicationService.searchMedications(debouncedQuery, selectedCategory),
  });

  const categories = ['Analgésicos', 'Antibióticos', 'Antihistamínicos', 'Vitaminas', 'Dermatológicos'];

  const handleAddToCart = (medication: Medication) => {
    if (!medication.inStock) {
      toast.error('Medicamento agotado');
      return;
    }
    onAddToCart(medication);
    toast.success(`${medication.name} agregado al carrito`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar medicamentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600">Buscando medicamentos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medications?.map((medication) => (
            <Card key={medication.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{medication.name}</h3>
                    <p className="text-sm text-gray-600">{medication.brand}</p>
                    <p className="text-sm text-gray-500">{medication.dosage} - {medication.form}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${medication.price}</p>
                    {medication.requiresPrescription && (
                      <Badge variant="outline" className="text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Receta
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {medication.description}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <Badge variant={medication.inStock ? 'default' : 'destructive'}>
                    <Package className="w-3 h-3 mr-1" />
                    {medication.inStock ? `Stock: ${medication.stockQuantity}` : 'Agotado'}
                  </Badge>
                  <Badge variant="secondary">{medication.category}</Badge>
                </div>

                <Button
                  onClick={() => handleAddToCart(medication)}
                  disabled={!medication.inStock}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {medications && medications.length === 0 && (
        <div className="text-center py-8">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No se encontraron medicamentos</p>
        </div>
      )}
    </div>
  );
}
