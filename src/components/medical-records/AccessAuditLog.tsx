
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  Download, 
  Share2, 
  Edit, 
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { usePatientDocuments } from '@/hooks/useMedicalRecords';

interface AccessAuditLogProps {
  patientId: string;
}

export default function AccessAuditLog({ patientId }: AccessAuditLogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('all');

  const { data: documents } = usePatientDocuments(patientId);

  // Flatten all access records from all documents
  const allAccessRecords = documents?.flatMap(doc => 
    doc.accessHistory.map(record => ({
      ...record,
      documentId: doc.id,
      documentTitle: doc.title,
      documentCategory: doc.category
    }))
  ) || [];

  // Sort by most recent first
  const sortedRecords = allAccessRecords.sort((a, b) => 
    new Date(b.accessedAt).getTime() - new Date(a.accessedAt).getTime()
  );

  // Apply filters
  const filteredRecords = sortedRecords.filter(record => {
    const matchesSearch = !searchTerm || 
      record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.documentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = selectedAction === 'all' || record.action === selectedAction;
    
    // Date filter logic
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const recordDate = new Date(record.accessedAt);
      const now = new Date();
      const diffTime = now.getTime() - recordDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case 'today':
          matchesDate = diffDays <= 1;
          break;
        case 'week':
          matchesDate = diffDays <= 7;
          break;
        case 'month':
          matchesDate = diffDays <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesAction && matchesDate;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return <Eye className="h-4 w-4" />;
      case 'download': return <Download className="h-4 w-4" />;
      case 'share': return <Share2 className="h-4 w-4" />;
      case 'edit': return <Edit className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view': return 'bg-blue-100 text-blue-800';
      case 'download': return 'bg-green-100 text-green-800';
      case 'share': return 'bg-purple-100 text-purple-800';
      case 'edit': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'specialist': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const actionCounts = {
    all: allAccessRecords.length,
    view: allAccessRecords.filter(r => r.action === 'view').length,
    download: allAccessRecords.filter(r => r.action === 'download').length,
    share: allAccessRecords.filter(r => r.action === 'share').length,
    edit: allAccessRecords.filter(r => r.action === 'edit').length
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{actionCounts.all}</div>
              <div className="text-sm text-gray-500">Total de Accesos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{actionCounts.view}</div>
              <div className="text-sm text-gray-500">Visualizaciones</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{actionCounts.download}</div>
              <div className="text-sm text-gray-500">Descargas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{actionCounts.share}</div>
              <div className="text-sm text-gray-500">Compartidos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{actionCounts.edit}</div>
              <div className="text-sm text-gray-500">Ediciones</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Registro de Auditoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por usuario o documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todas las acciones</option>
                <option value="view">Visualizar</option>
                <option value="download">Descargar</option>
                <option value="share">Compartir</option>
                <option value="edit">Editar</option>
              </select>
              
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todas las fechas</option>
                <option value="today">Hoy</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardContent className="pt-6">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No se encontraron registros
              </h3>
              <p className="text-gray-500">
                No hay registros de auditoría que coincidan con los filtros seleccionados
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecords.map((record, index) => (
                <div
                  key={`${record.documentId}-${record.userId}-${index}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getActionColor(record.action)}`}>
                      {getActionIcon(record.action)}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {record.userName}
                        </span>
                        <Badge variant="outline" className={getRoleColor(record.userRole)}>
                          {record.userRole === 'doctor' && 'Doctor'}
                          {record.userRole === 'patient' && 'Paciente'}
                          {record.userRole === 'admin' && 'Admin'}
                          {record.userRole === 'specialist' && 'Especialista'}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="capitalize">{record.action === 'view' ? 'vio' : record.action === 'download' ? 'descargó' : record.action === 'share' ? 'compartió' : 'editó'}</span>
                        {' '}<strong>{record.documentTitle}</strong>
                      </div>
                      
                      {record.ipAddress && (
                        <div className="text-xs text-gray-500">
                          IP: {record.ipAddress}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(record.accessedAt).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {record.action === 'view' && 'Visualización'}
                      {record.action === 'download' && 'Descarga'}
                      {record.action === 'share' && 'Compartido'}
                      {record.action === 'edit' && 'Edición'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
