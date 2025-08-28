
import ModernIndex from "@/pages/ModernIndex";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Video, 
  Calendar, 
  Shield, 
  Users, 
  Clock, 
  ArrowRight,
  Star,
  CheckCircle,
  Stethoscope,
  Activity,
  Brain,
  Smartphone,
  Globe,
  Award,
  TrendingUp,
  MessageCircle,
  FileText,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const Index = () => {
  return <ModernIndex />;
};

export default Index;
