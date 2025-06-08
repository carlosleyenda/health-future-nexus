
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  DollarSign, 
  AlertTriangle, 
  Info, 
  FileText,
  CreditCard,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface ProcedureEstimate {
  cptCode: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  insuranceCoverage: number;
  patientPortion: number;
}

interface EstimateBreakdown {
  subtotal: number;
  insurancePayment: number;
  deductible: number;
  copay: number;
  coinsurance: number;
  patientResponsibility: number;
  outOfPocket: number;
}

export default function PricingEstimator() {
  const [patientId, setPatientId] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [selectedProcedures, setSelectedProcedures] = useState<ProcedureEstimate[]>([]);
  const [estimate, setEstimate] = useState<EstimateBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const commonProcedures = [
    { code: '99213', description: 'Office Visit - Established Patient', price: 120 },
    { code: '99214', description: 'Office Visit - Detailed', price: 180 },
    { code: '99215', description: 'Office Visit - Comprehensive', price: 250 },
    { code: '36415', description: 'Blood Draw', price: 25 },
    { code: '80053', description: 'Comprehensive Metabolic Panel', price: 45 },
    { code: '85025', description: 'Complete Blood Count', price: 35 },
    { code: '93000', description: 'EKG', price: 65 },
    { code: '71020', description: 'Chest X-Ray', price: 95 }
  ];

  const insuranceTypes = [
    { value: 'commercial', label: 'Commercial Insurance' },
    { value: 'medicare', label: 'Medicare' },
    { value: 'medicaid', label: 'Medicaid' },
    { value: 'self_pay', label: 'Self Pay' },
    { value: 'workers_comp', label: 'Workers Compensation' }
  ];

  const addProcedure = (procedure: any) => {
    const newProcedure: ProcedureEstimate = {
      cptCode: procedure.code,
      description: procedure.description,
      quantity: 1,
      unitPrice: procedure.price,
      totalPrice: procedure.price,
      insuranceCoverage: 0,
      patientPortion: procedure.price
    };
    setSelectedProcedures([...selectedProcedures, newProcedure]);
  };

  const removeProcedure = (index: number) => {
    setSelectedProcedures(selectedProcedures.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updated = [...selectedProcedures];
    updated[index].quantity = quantity;
    updated[index].totalPrice = updated[index].unitPrice * quantity;
    setSelectedProcedures(updated);
  };

  const calculateEstimate = async () => {
    if (!insuranceType || selectedProcedures.length === 0) {
      toast.error('Please select insurance type and add procedures');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const subtotal = selectedProcedures.reduce((sum, proc) => sum + proc.totalPrice, 0);
      
      // Mock insurance calculation based on type
      let coverageRate = 0.8; // 80% coverage
      let deductible = 500;
      let copay = 25;
      
      switch (insuranceType) {
        case 'medicare':
          coverageRate = 0.8;
          deductible = 203;
          copay = 20;
          break;
        case 'medicaid':
          coverageRate = 0.9;
          deductible = 0;
          copay = 5;
          break;
        case 'self_pay':
          coverageRate = 0;
          deductible = 0;
          copay = 0;
          break;
      }

      const insurancePayment = subtotal * coverageRate;
      const coinsurance = (subtotal - insurancePayment) * 0.2;
      const patientResponsibility = subtotal - insurancePayment + copay;
      
      const breakdown: EstimateBreakdown = {
        subtotal,
        insurancePayment,
        deductible,
        copay,
        coinsurance,
        patientResponsibility,
        outOfPocket: patientResponsibility
      };

      // Update procedures with insurance coverage
      const updatedProcedures = selectedProcedures.map(proc => ({
        ...proc,
        insuranceCoverage: proc.totalPrice * coverageRate,
        patientPortion: proc.totalPrice - (proc.totalPrice * coverageRate)
      }));

      setSelectedProcedures(updatedProcedures);
      setEstimate(breakdown);
      setIsLoading(false);
      toast.success('Estimate calculated successfully');
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pricing Estimator</h2>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Info className="h-3 w-3" />
          Estimates are not guarantees
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient & Insurance Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="patientId">Patient ID (Optional)</Label>
              <Input
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient ID for accurate benefits"
              />
            </div>
            
            <div>
              <Label htmlFor="insurance">Insurance Type</Label>
              <Select value={insuranceType} onValueChange={setInsuranceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {patientId && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <Info className="h-4 w-4 inline mr-1" />
                  Real-time benefits verification available for registered patients
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Procedure Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Add Procedures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commonProcedures.map((procedure) => (
                <div
                  key={procedure.code}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => addProcedure(procedure)}
                >
                  <div>
                    <p className="font-medium">{procedure.code}</p>
                    <p className="text-sm text-muted-foreground">{procedure.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(procedure.price)}</p>
                    <Button size="sm" variant="outline">Add</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Procedures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Selected Procedures
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedProcedures.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No procedures selected
              </div>
            ) : (
              <div className="space-y-3">
                {selectedProcedures.map((procedure, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{procedure.cptCode}</p>
                        <p className="text-sm text-muted-foreground">{procedure.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeProcedure(index)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label>Qty:</Label>
                      <Input
                        type="number"
                        min="1"
                        value={procedure.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                        className="w-20"
                      />
                      <span className="text-sm font-medium">
                        = {formatCurrency(procedure.totalPrice)}
                      </span>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <Button 
                  onClick={calculateEstimate} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Calculating...' : 'Calculate Estimate'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Estimate Results */}
      {estimate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Estimate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Procedure Breakdown */}
              <div>
                <h4 className="font-medium mb-4">Procedure Breakdown</h4>
                <div className="space-y-3">
                  {selectedProcedures.map((procedure, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{procedure.cptCode}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {procedure.quantity} × {formatCurrency(procedure.unitPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(procedure.totalPrice)}</p>
                        <p className="text-sm text-green-600">
                          Insurance: {formatCurrency(procedure.insuranceCoverage)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Summary */}
              <div>
                <h4 className="font-medium mb-4">Financial Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatCurrency(estimate.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Insurance Payment</span>
                    <span>-{formatCurrency(estimate.insurancePayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Copay</span>
                    <span>{formatCurrency(estimate.copay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductible</span>
                    <span>{formatCurrency(estimate.deductible)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Your Estimated Cost</span>
                    <span className="text-blue-600">{formatCurrency(estimate.patientResponsibility)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium">Important Notes:</p>
                      <ul className="mt-1 space-y-1 list-disc list-inside">
                        <li>Estimates are based on current benefit information</li>
                        <li>Final costs may vary based on actual services provided</li>
                        <li>Prior authorization may be required for some services</li>
                        <li>Out-of-network providers may result in higher costs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Set Up Payment Plan
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Print Estimate
              </Button>
              <Button variant="outline">
                Apply for Financial Assistance
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
