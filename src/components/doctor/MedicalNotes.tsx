
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Save, Plus, Search, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface MedicalNotesProps {
  patientId?: string;
  sessionId?: string;
}

export default function MedicalNotes({ patientId, sessionId }: MedicalNotesProps) {
  const [noteType, setNoteType] = useState('consultation');
  const [noteContent, setNoteContent] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');

  const handleSaveNote = () => {
    if (!noteContent.trim()) {
      toast.error('Por favor escriba el contenido de la nota');
      return;
    }

    // Simular guardado de nota
    toast.success('Nota médica guardada correctamente');
    setNoteContent('');
    setDiagnosis('');
    setTreatment('');
  };

  const handleSavePrescription = () => {
    if (!medicationName.trim() || !dosage.trim()) {
      toast.error('Por favor complete todos los campos de la receta');
      return;
    }

    toast.success('Receta médica creada correctamente');
    setMedicationName('');
    setDosage('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notas Médicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Nota</label>
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consulta</SelectItem>
                  <SelectItem value="diagnosis">Diagnóstico</SelectItem>
                  <SelectItem value="treatment">Tratamiento</SelectItem>
                  <SelectItem value="followup">Seguimiento</SelectItem>
                  <SelectItem value="emergency">Emergencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fecha</label>
              <Input 
                type="datetime-local" 
                defaultValue={new Date().toISOString().slice(0, 16)} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contenido de la Nota</label>
            <Textarea
              placeholder="Describa la consulta, síntomas, observaciones..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Diagnóstico</label>
              <Input
                placeholder="Diagnóstico principal"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Plan de Tratamiento</label>
              <Input
                placeholder="Tratamiento recomendado"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleSaveNote} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Guardar Nota
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prescripción Médica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Medicamento</label>
              <Input
                placeholder="Nombre del medicamento"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Dosis</label>
              <Input
                placeholder="ej: 500mg cada 8 horas"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleSavePrescription} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Receta
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge>Consulta</Badge>
                <span className="text-sm text-gray-500">Hace 2 horas</span>
              </div>
              <p className="text-sm">Paciente presenta dolor de cabeza recurrente. Se recomienda análisis neurológico.</p>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">Seguimiento</Badge>
                <span className="text-sm text-gray-500">Ayer</span>
              </div>
              <p className="text-sm">Control post-operatorio satisfactorio. Continuar con medicación.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
