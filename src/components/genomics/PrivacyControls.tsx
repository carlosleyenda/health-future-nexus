
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, Download, Users, AlertTriangle } from 'lucide-react';
import type { GenomicProfile } from '@/types/genomics';

interface PrivacyControlsProps {
  genomicProfile: GenomicProfile;
}

export default function PrivacyControls({ genomicProfile }: PrivacyControlsProps) {
  const privacySettings = genomicProfile.privacySettings;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Controles de Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Encryption Level */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-blue-800">Nivel de Encriptación</h4>
                  <p className="text-sm text-blue-600">Tus datos están protegidos con encriptación</p>
                </div>
                <Badge variant="outline">{privacySettings?.encryptionLevel || 'High'}</Badge>
              </div>
            </div>

            {/* Access Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Controles de Acceso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Acceso de médicos</p>
                    <p className="text-sm text-gray-600">Permitir a médicos ver datos genómicos</p>
                  </div>
                  <Switch defaultChecked={privacySettings?.accessControls.doctorAccess} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Participación en investigación</p>
                    <p className="text-sm text-gray-600">Contribuir datos a estudios científicos</p>
                  </div>
                  <Switch defaultChecked={privacySettings?.accessControls.researchAccess} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Acceso familiar</p>
                    <p className="text-sm text-gray-600">Compartir información relevante con familia</p>
                  </div>
                  <Switch defaultChecked={privacySettings?.accessControls.familyAccess} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Acceso de emergencia</p>
                    <p className="text-sm text-gray-600">Permitir acceso en situaciones críticas</p>
                  </div>
                  <Switch defaultChecked={privacySettings?.accessControls.emergencyAccess} />
                </div>
              </CardContent>
            </Card>

            {/* Data Portability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Portabilidad de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Último export</span>
                  <span className="font-medium">{privacySettings?.rightToPortability.lastExport || 'Nunca'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Formatos disponibles</span>
                  <div className="flex space-x-1">
                    {privacySettings?.rightToPortability.exportFormats.map((format, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{format}</Badge>
                    )) || []}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar mis datos
                </Button>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cumplimiento Regulatorio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm">GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm">HIPAA Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Retención: {privacySettings?.retentionPolicy.retentionPeriod || 7} años</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
