import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MedicalDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploaded_at: string;
  patient_id: string;
  doctor_id?: string;
  category: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class DocumentService {
  // Upload medical document
  async uploadMedicalDocument(
    file: File,
    category: string = 'general',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<MedicalDocument> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Validate file type
      this.validateFile(file);

      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('medical-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('medical-documents')
        .getPublicUrl(fileName);

      toast.success('Documento subido exitosamente');
      return {
        id: fileName,
        name: file.name,
        type: file.type,
        size: file.size,
        url: publicUrl,
        uploaded_at: new Date().toISOString(),
        patient_id: user.id,
        category
      };
    } catch (error) {
      console.error('Error in uploadMedicalDocument:', error);
      toast.error('Error al subir el documento');
      throw error;
    }
  }

  // Upload prescription document (for doctors)
  async uploadPrescription(
    file: File,
    patientId: string
  ): Promise<MedicalDocument> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Validate file type
      this.validateFile(file);

      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${patientId}/prescriptions/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('prescriptions')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading prescription:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('prescriptions')
        .getPublicUrl(fileName);

      toast.success('Receta subida exitosamente');
      return {
        id: fileName,
        name: file.name,
        type: file.type,
        size: file.size,
        url: publicUrl,
        uploaded_at: new Date().toISOString(),
        patient_id: patientId,
        doctor_id: user.id,
        category: 'prescription'
      };
    } catch (error) {
      console.error('Error in uploadPrescription:', error);
      toast.error('Error al subir la receta');
      throw error;
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<string> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Validate image file
      if (!file.type.startsWith('image/')) {
        throw new Error('Solo se permiten archivos de imagen');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('El archivo es demasiado grande (máximo 5MB)');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading profile picture:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      // Update user profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        throw updateError;
      }

      toast.success('Foto de perfil actualizada');
      return publicUrl;
    } catch (error) {
      console.error('Error in uploadProfilePicture:', error);
      toast.error('Error al subir la foto de perfil');
      throw error;
    }
  }

  // Get user documents
  async getUserDocuments(userId: string): Promise<MedicalDocument[]> {
    try {
      const { data: files, error } = await supabase.storage
        .from('medical-documents')
        .list(userId);

      if (error) {
        console.error('Error fetching documents:', error);
        return [];
      }

      const documents: MedicalDocument[] = [];
      
      for (const file of files || []) {
        const { data: { publicUrl } } = supabase.storage
          .from('medical-documents')
          .getPublicUrl(`${userId}/${file.name}`);

        documents.push({
          id: file.name,
          name: file.name,
          type: 'application/pdf',
          size: file.metadata?.size || 0,
          url: publicUrl,
          uploaded_at: file.created_at || file.updated_at || new Date().toISOString(),
          patient_id: userId,
          category: 'general'
        });
      }

      return documents;
    } catch (error) {
      console.error('Error in getUserDocuments:', error);
      return [];
    }
  }

  // Get patient prescriptions
  async getPatientPrescriptions(patientId: string): Promise<MedicalDocument[]> {
    try {
      const { data: files, error } = await supabase.storage
        .from('prescriptions')
        .list(`${patientId}/prescriptions`);

      if (error) {
        console.error('Error fetching prescriptions:', error);
        throw error;
      }

      const prescriptions: MedicalDocument[] = [];
      
      for (const file of files || []) {
        const { data: { publicUrl } } = supabase.storage
          .from('prescriptions')
          .getPublicUrl(`${patientId}/prescriptions/${file.name}`);

        prescriptions.push({
          id: file.id || file.name,
          name: file.name,
          type: 'application/pdf',
          size: file.metadata?.size || 0,
          url: publicUrl,
          uploaded_at: file.created_at || file.updated_at || new Date().toISOString(),
          patient_id: patientId,
          category: 'prescription'
        });
      }

      return prescriptions;
    } catch (error) {
      console.error('Error in getPatientPrescriptions:', error);
      return [];
    }
  }

  // Delete document
  async deleteDocument(documentId: string, storagePath: string, bucket: string = 'medical-documents'): Promise<void> {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([storagePath]);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
      }

      // No database metadata to delete for now

      toast.success('Documento eliminado exitosamente');
    } catch (error) {
      console.error('Error in deleteDocument:', error);
      toast.error('Error al eliminar el documento');
      throw error;
    }
  }

  // Validate file before upload
  private validateFile(file: File): void {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
      throw new Error('El archivo es demasiado grande (máximo 10MB)');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Tipo de archivo no permitido');
    }
  }

  // Generate document preview URL
  generatePreviewUrl(url: string): string {
    if (url.includes('.pdf')) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    }
    return url;
  }
}

export const documentService = new DocumentService();