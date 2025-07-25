"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Calendar,
  TrendingUp,
  Clock,
  Users,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Componente ROI Calculator
function ROICalculator() {
  const [formData, setFormData] = React.useState({
    weeklyHours: 15,
    hourlyRate: 75,
    monthlyClients: 20,
  });

  const INITIAL_INVESTMENT = 1800; // €

  const calculateROI = () => {
    // Cálculos automáticos según las fórmulas proporcionadas
    const timeSavedPerMonth = formData.weeklyHours * 4; // h/mes
    const monthlySavings = timeSavedPerMonth * formData.hourlyRate; // €/mes
    const breakEvenDays = Math.ceil((INITIAL_INVESTMENT / monthlySavings) * 30); // días para recuperar inversión
    const annualROI =
      ((monthlySavings * 12 - INITIAL_INVESTMENT) / INITIAL_INVESTMENT) * 100; // ROI a 12 meses

    // Actualizar resultados en el DOM
    if (typeof document !== "undefined") {
      const timeSavingsEl = document.getElementById("time-savings");
      const monthlySavingsEl = document.getElementById("monthly-savings");
      const breakEvenEl = document.getElementById("break-even");
      const totalRoiEl = document.getElementById("total-roi");

      if (timeSavingsEl)
        timeSavingsEl.textContent = `${Math.round(timeSavedPerMonth)}h/mes`;
      if (monthlySavingsEl)
        monthlySavingsEl.textContent = `€${Math.round(
          monthlySavings
        ).toLocaleString()}`;
      if (breakEvenEl) breakEvenEl.textContent = `${breakEvenDays} días`;
      if (totalRoiEl)
        totalRoiEl.textContent = `+${Math.round(annualROI).toLocaleString()}%`;
    }
  };

  React.useEffect(() => {
    calculateROI();
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value) || 0;
    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Horas semanales en tareas repetitivas
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={formData.weeklyHours}
            onChange={(e) => handleInputChange("weeklyHours", e.target.value)}
            className="bg-[#1a1a1a] border-[#808080] text-white h-12 text-base flex-1"
            min="5"
            max="80"
            placeholder="10-40h"
          />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                handleInputChange(
                  "weeklyHours",
                  (formData.weeklyHours + 1).toString()
                )
              }
              className="w-8 h-6 bg-[#c0c0c0] hover:bg-white text-black font-bold rounded-t-md transition-colors flex items-center justify-center text-sm"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() =>
                handleInputChange(
                  "weeklyHours",
                  Math.max(5, formData.weeklyHours - 1).toString()
                )
              }
              className="w-8 h-6 bg-[#808080] hover:bg-[#c0c0c0] text-white font-bold rounded-b-md transition-colors flex items-center justify-center text-sm"
            >
              ▼
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Responder emails, seguimiento, gestión de leads, presupuestos...
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Coste por hora de tu equipo o tu tiempo (€)
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={formData.hourlyRate}
            onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
            className="bg-[#1a1a1a] border-[#808080] text-white h-12 text-base flex-1"
            min="20"
            max="200"
            placeholder="50-75€"
          />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                handleInputChange(
                  "hourlyRate",
                  (formData.hourlyRate + 5).toString()
                )
              }
              className="w-8 h-6 bg-[#c0c0c0] hover:bg-white text-black font-bold rounded-t-md transition-colors flex items-center justify-center text-sm"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() =>
                handleInputChange(
                  "hourlyRate",
                  Math.max(20, formData.hourlyRate - 5).toString()
                )
              }
              className="w-8 h-6 bg-[#808080] hover:bg-[#c0c0c0] text-white font-bold rounded-b-md transition-colors flex items-center justify-center text-sm"
            >
              ▼
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">Default sugerido: 50-75€</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Clientes/proyectos al mes (opcional)
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={formData.monthlyClients}
            onChange={(e) =>
              handleInputChange("monthlyClients", e.target.value)
            }
            className="bg-[#1a1a1a] border-[#808080] text-white h-12 text-base flex-1"
            min="1"
            max="1000"
            placeholder="Opcional pero útil"
          />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                handleInputChange(
                  "monthlyClients",
                  (formData.monthlyClients + 5).toString()
                )
              }
              className="w-8 h-6 bg-[#c0c0c0] hover:bg-white text-black font-bold rounded-t-md transition-colors flex items-center justify-center text-sm"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() =>
                handleInputChange(
                  "monthlyClients",
                  Math.max(1, formData.monthlyClients - 5).toString()
                )
              }
              className="w-8 h-6 bg-[#808080] hover:bg-[#c0c0c0] text-white font-bold rounded-b-md transition-colors flex items-center justify-center text-sm"
            >
              ▼
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Útil para calcular potencial de escala
        </p>
      </div>
    </div>
  );
}

export default function PrometeoStudiosLanding() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      empresa: formData.get("empresa"),
      tipoNegocio: formData.get("tipoNegocio"),
    };

    try {
      await fetch(
        "https://n8n.prometeostudios.com/webhook/980897ac-be55-48bb-b0c0-74b9216c2b5c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Redirigir a Cal.com después del envío exitoso
      window.open("https://cal.com/prometeo-studios/consulta", "_blank");
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <Image
              src="/logogris-removebg-preview.png"
              alt="Prometeo Studios Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl md:text-2xl font-bold text-[#c0c0c0]">
              PROMETEO STUDIOS
            </span>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex space-x-6 xl:space-x-8"
          >
            <Link
              href="#servicios"
              className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base"
            >
              Servicios
            </Link>
            <Link
              href="#casos"
              className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base"
            >
              Casos de Éxito
            </Link>
            <Link
              href="#proceso"
              className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base"
            >
              Proceso
            </Link>
            <Link
              href="#contacto"
              className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base"
            >
              Contacto
            </Link>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <Button
              onClick={() =>
                window.open(
                  "https://cal.com/prometeo-studios/consulta",
                  "_blank"
                )
              }
              className="bg-[#c0c0c0] text-black hover:bg-white font-bold text-xs md:text-sm px-3 md:px-4 py-2"
            >
              CONSULTORÍA GRATUITA
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-left lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="bg-[#2d2d2d] text-[#c0c0c0] border-[#808080] mb-6">
                  RESULTADOS GARANTIZADOS EN 30 DÍAS
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-black mb-6 leading-tight"
              >
                MÁS MARGEN.
                <br />
                <span className="text-[#c0c0c0]">MENOS CARGA OPERATIVA.</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-3xl lg:text-4xl font-bold text-[#c0c0c0] mb-8"
              >
                DESDE ESTA SEMANA.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl lg:text-2xl text-gray-300 mb-6 font-medium"
              >
                Cómo{" "}
                <span className="text-[#c0c0c0] font-bold">
                  31 agencias y consultoras
                </span>{" "}
                están aumentando márgenes y entregando más con menos equipo
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-lg text-gray-400 mb-10 max-w-2xl"
              >
                Sistemas de automatización con IA que eliminan tareas
                repetitivas y liberan tiempo de tu equipo sin cambiar tu stack.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col gap-3 sm:gap-4 mb-8"
              >
                <Button
                  size="lg"
                  onClick={() =>
                    window.open(
                      "https://cal.com/prometeo-studios/consulta",
                      "_blank"
                    )
                  }
                  className="bg-[#c0c0c0] text-black hover:bg-white font-bold text-base sm:text-lg px-6 sm:px-8 py-4 h-12 sm:h-auto w-full sm:w-auto"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  AGENDAR CONSULTORÍA GRATUITA
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#808080] text-white hover:bg-[#2d2d2d] font-bold text-base sm:text-lg px-6 sm:px-8 py-4 h-12 sm:h-auto bg-transparent w-full sm:w-auto"
                  onClick={() => (window.location.href = "tel:+34644556479")}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  LLAMAR AHORA
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center gap-4 text-sm text-gray-400"
              >
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Sin permanencia
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Resultados en 30 días
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Soporte 24/7
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-80 h-80 rounded-full bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border-4 border-[#808080] flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src="/mariocamisetanegra.webp"
                    alt="Mario - CEO y Fundador de Prometeo Studios"
                    width={300}
                    height={300}
                    className="rounded-full object-cover w-full h-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-4 -right-4 bg-[#c0c0c0] text-black px-4 py-2 rounded-full font-bold"
                >
                  CEO & Fundador
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-black/30"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={scaleIn}>
              <div className="text-4xl lg:text-5xl font-black text-[#c0c0c0] mb-2">
                40+
              </div>
              <div className="text-gray-400">Empresas Automatizadas</div>
            </motion.div>
            <motion.div variants={scaleIn}>
              <div className="text-4xl lg:text-5xl font-black text-[#c0c0c0] mb-2">
                2,3x
              </div>
              <div className="text-gray-400">
                Aumento del Margen Operativo Promedio
              </div>
            </motion.div>
            <motion.div variants={scaleIn}>
              <div className="text-4xl lg:text-5xl font-black text-[#c0c0c0] mb-2">
                25h
              </div>
              <div className="text-gray-400">
                Horas de gestión ahorradas por semana
              </div>
            </motion.div>
            <motion.div variants={scaleIn}>
              <div className="text-4xl lg:text-5xl font-black text-[#c0c0c0] mb-2">
                0
              </div>
              <div className="text-gray-400">
                Fricción - Integración con tu stack actual
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Servicios Section */}
      <motion.section
        id="servicios"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              AUTOMATIZACIÓN QUE{" "}
              <span className="text-[#c0c0c0]">FUNCIONA</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No más tiempo perdido en tareas repetitivas. Nuestro sistema
              trabaja mientras tú te enfocas en crecer.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-[#2d2d2d] border-[#808080] hover:border-[#c0c0c0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#c0c0c0]/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-12 w-12 text-[#c0c0c0]" />
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Embudo Automático de Captación IA
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Atrae y convierte leads desde anuncios, redes o tu web con
                    mensajes automáticos por WhatsApp o email
                    hiperpersonalizados.
                  </p>
                  <div className="text-[#c0c0c0] font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Hasta 3x más conversiones desde campañas publicitarias
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-[#2d2d2d] border-[#808080] hover:border-[#c0c0c0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#c0c0c0]/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Bot className="h-12 w-12 text-[#c0c0c0]" />
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Chatbot Comercial con IA
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Atiende automáticamente a tus leads, responde dudas
                    frecuentes y guía hasta agendar una cita.
                  </p>
                  <div className="text-[#c0c0c0] font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    90% menos leads perdidos por falta de respuesta
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-[#2d2d2d] border-[#808080] hover:border-[#c0c0c0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#c0c0c0]/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-12 w-12 text-[#c0c0c0]" />
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Lead Scoring Predictivo
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Detecta qué prospectos tienen más probabilidad de comprar y
                    prioriza tu seguimiento comercial.
                  </p>
                  <div className="text-[#c0c0c0] font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    200% más oportunidades calificadas
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-[#2d2d2d] border-[#808080] hover:border-[#c0c0c0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#c0c0c0]/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-12 w-12 text-[#c0c0c0]" />
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Seguimiento Inteligente Multicanal
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Automatiza el contacto con leads que no respondieron, por
                    WhatsApp, email o llamadas IA.
                  </p>
                  <div className="text-[#c0c0c0] font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    80% más de cierre en leads calientes
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-[#2d2d2d] border-[#808080] hover:border-[#c0c0c0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#c0c0c0]/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="h-12 w-12 text-[#c0c0c0]" />
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Mini CRM Comercial + Panel en Tiempo Real
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Visualiza tus leads, estados y métricas clave de forma
                    centralizada y sin complicaciones.
                  </p>
                  <div className="text-[#c0c0c0] font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Decisiones 3x más rápidas en ventas
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-[#2d2d2d] border-[#808080] hover:border-[#c0c0c0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#c0c0c0]/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="h-12 w-12 text-[#c0c0c0]" />
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Agente de Ventas con Voz IA
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Haz llamadas automáticas con voz natural para confirmar
                    citas, hacer seguimiento o filtrar interesados.
                  </p>
                  <div className="text-[#c0c0c0] font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Hasta 70% menos llamadas manuales del equipo
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Calculadora ROI */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d]"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              CALCULA TU <span className="text-[#c0c0c0]">ROI</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Descubre cuánto puedes ahorrar y ganar automatizando tu negocio
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Formulario de Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <Card className="bg-[#2d2d2d] border-[#808080]">
                <CardContent className="p-4 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#c0c0c0]">
                    Datos de tu Negocio
                  </h3>
                  <ROICalculator />
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <p className="text-gray-400 mb-6 text-center">
                  *Cálculos basados en promedios de nuestros clientes actuales
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={() =>
                      window.open(
                        "https://cal.com/prometeo-studios/consulta",
                        "_blank"
                      )
                    }
                    className="bg-[#c0c0c0] text-black hover:bg-white font-bold text-lg px-8 py-4"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    VER MI ROI PERSONALIZADO
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Resultados */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 order-1 lg:order-2"
            >
              <Card className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border-[#c0c0c0]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-8 w-8 text-[#c0c0c0]" />
                    <h4 className="text-xl font-bold">Tiempo Ahorrado</h4>
                  </div>
                  <div
                    id="time-savings"
                    className="text-3xl font-black text-[#c0c0c0] mb-2"
                  >
                    60h/mes
                  </div>
                  <p className="text-gray-400">
                    Horas liberadas para actividades estratégicas
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border-[#c0c0c0]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-8 w-8 text-[#c0c0c0]" />
                    <h4 className="text-xl font-bold">Ahorro Mensual</h4>
                  </div>
                  <div
                    id="monthly-savings"
                    className="text-3xl font-black text-green-500 mb-2"
                  >
                    €4.500
                  </div>
                  <p className="text-gray-400">
                    En costos operativos mensuales
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border-[#c0c0c0]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-8 w-8 text-[#c0c0c0]" />
                    <h4 className="text-xl font-bold">
                      Recuperas la inversión en
                    </h4>
                  </div>
                  <div
                    id="break-even"
                    className="text-3xl font-black text-blue-500 mb-2"
                  >
                    12 días
                  </div>
                  <p className="text-gray-400">
                    Tiempo estimado para break-even
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-400/10 border-green-400 bg-[#1a2e1a]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="h-8 w-8 text-green-400" />
                    <h4 className="text-xl font-bold text-green-300">
                      ROI Estimado en 12 Meses
                    </h4>
                  </div>
                  <div
                    id="total-roi"
                    className="text-4xl font-black text-green-300 mb-2"
                  >
                    +2.900%
                  </div>
                  <p className="text-green-100">
                    Retorno sobre la inversión en 12 meses
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Casos de Éxito */}
      <motion.section
        id="casos"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-black/30"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              CASOS DE <span className="text-[#c0c0c0]">ÉXITO REALES</span>
            </h2>
            <p className="text-xl text-gray-400">
              Resultados verificables de nuestros clientes en los últimos 90
              días
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <Card className="bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] border-[#c0c0c0]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c0c0c0] flex items-center justify-center bg-white p-1">
                          <Image
                            src="/4.9actualizando.png"
                            alt="4.9 Actualizando"
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">
                            4.9 Actualizando
                          </h4>
                          <p className="text-gray-400">A Coruña, España</p>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-[#c0c0c0] mb-2">
                        +40%
                      </div>
                      <p className="text-lg font-semibold mb-2">
                        Demos agendadas en 30 días
                      </p>
                      <p className="text-gray-400">
                        10h semanales ahorradas + mayor porcentaje de conversión
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] border-[#c0c0c0]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c0c0c0]">
                          <Image
                            src="/creative_sparks_agency.png"
                            alt="Creative Sparks Agency"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">
                            Creative Sparks Agency
                          </h4>
                          <p className="text-gray-400">Barcelona, España</p>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-[#c0c0c0] mb-2">
                        x3
                      </div>
                      <p className="text-lg font-semibold mb-2">
                        Más conversiones desde campañas publicitarias
                      </p>
                      <p className="text-gray-400">
                        De un 10% a un 30% de conversión{" "}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <Card className="bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] border-[#c0c0c0]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c0c0c0]">
                          <Image
                            src="/asfigalsl.webp"
                            alt="Asfigal S.L"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">Asfigal S.L</h4>
                          <p className="text-gray-400">A Coruña, España</p>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-[#c0c0c0] mb-2">
                        +200%
                      </div>
                      <p className="text-lg font-semibold mb-2">
                        Leads calificados mensuales
                      </p>
                      <p className="text-gray-400">
                        De 50 a 150 leads de alta calidad por mes
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] border-[#c0c0c0]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c0c0c0]">
                          <Image
                            src="/grupoinmobiliariogeli.webp"
                            alt="Grupo Inmobiliario Sur"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">
                            Grupo Inmobiliario Sur
                          </h4>
                          <p className="text-gray-400">Sevilla, España</p>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-[#c0c0c0] mb-2">
                        +80%
                      </div>
                      <p className="text-lg font-semibold mb-2">
                        De llamadas gestionadas por nuestra IA
                      </p>
                      <p className="text-gray-400">
                        Ahorro de 20h semanales en prospección
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Proceso */}
      <motion.section
        id="proceso"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              PROCESO <span className="text-[#c0c0c0]">SIMPLE</span>
            </h2>
            <p className="text-xl text-gray-400">
              De la llamada a resultados en menos de 7 días
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <motion.div variants={scaleIn} className="text-center">
              <div className="w-20 h-20 bg-[#c0c0c0] text-black rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">ANÁLISIS GRATUITO</h3>
              <p className="text-gray-400">
                Revisamos tu negocio y identificamos oportunidades de
                automatización
              </p>
            </motion.div>

            <motion.div variants={scaleIn} className="text-center">
              <div className="w-20 h-20 bg-[#c0c0c0] text-black rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">CONFIGURACIÓN</h3>
              <p className="text-gray-400">
                Implementamos el sistema personalizado para tu industria
              </p>
            </motion.div>

            <motion.div variants={scaleIn} className="text-center">
              <div className="w-20 h-20 bg-[#c0c0c0] text-black rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">PRUEBAS</h3>
              <p className="text-gray-400">
                Optimizamos y ajustamos hasta lograr los resultados esperados
              </p>
            </motion.div>

            <motion.div variants={scaleIn} className="text-center">
              <div className="w-20 h-20 bg-[#c0c0c0] text-black rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-4">RESULTADOS</h3>
              <p className="text-gray-400">
                Monitoreo continuo y mejoras para maximizar tu ROI
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Final */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a]"
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Badge className="bg-red-600 text-white mb-6 text-lg px-4 py-2">
              ÚLTIMAS 2 PLAZAS DISPONIBLES ESTE MES
            </Badge>

            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              ¿LISTO PARA <span className="text-[#c0c0c0]">AUTOMATIZAR</span>?
            </h2>

            <p className="text-xl text-gray-300 mb-8">
              Únete a las 47 empresas que ya están generando más clientes con
              menos trabajo
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
            >
              <Button
                size="lg"
                onClick={() =>
                  window.open(
                    "https://cal.com/prometeo-studios/consulta",
                    "_blank"
                  )
                }
                className="bg-[#c0c0c0] text-black hover:bg-white font-bold text-xl px-12 py-6"
              >
                <Zap className="mr-2 h-6 w-6" />
                EMPEZAR AHORA
              </Button>
              <div className="text-gray-400">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Garantía de resultados en 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Sin permanencia ni costos ocultos</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contacto */}
      <motion.section
        id="contacto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-20 px-4 bg-black"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
                HABLEMOS <span className="text-[#c0c0c0]">HOY</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8">
                Agenda una demo gratuita de 15 minutos y descubre cómo podemos
                automatizar tu negocio
              </p>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 p-3 bg-[#2d2d2d] rounded-lg">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#c0c0c0] flex-shrink-0" />
                  <a
                    href="tel:+34644556479"
                    className="text-base sm:text-lg hover:text-[#c0c0c0] transition-colors"
                  >
                    +34 644 556 479
                  </a>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 bg-[#2d2d2d] rounded-lg">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#c0c0c0] flex-shrink-0" />
                  <a
                    href="mailto:hola@prometeostudios.com"
                    className="text-base sm:text-lg hover:text-[#c0c0c0] transition-colors"
                  >
                    hola@prometeostudios.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/mario-fernández-974ba6373",
                      "_blank"
                    )
                  }
                  className="border-[#808080] text-white hover:bg-[#2d2d2d] bg-transparent h-12 text-base font-medium"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open("https://wa.me/34644556479", "_blank")
                  }
                  className="border-[#808080] text-white hover:bg-[#2d2d2d] bg-transparent h-12 text-base font-medium"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <Card className="bg-[#2d2d2d] border-[#808080]">
                <CardContent className="p-4 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    Demo Gratuita
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 sm:space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Nombre completo *
                      </label>
                      <Input
                        name="nombre"
                        placeholder="Ej: Juan Pérez"
                        className="bg-[#1a1a1a] border-[#808080] text-white placeholder-gray-400 h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Email empresarial *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Ej: juan@miempresa.com"
                        className="bg-[#1a1a1a] border-[#808080] text-white placeholder-gray-400 h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Teléfono *
                      </label>
                      <Input
                        type="tel"
                        name="telefono"
                        placeholder="Ej: +34 600 123 456"
                        className="bg-[#1a1a1a] border-[#808080] text-white placeholder-gray-400 h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Empresa *
                      </label>
                      <Input
                        name="empresa"
                        placeholder="Ej: Clínica Dental Madrid"
                        className="bg-[#1a1a1a] border-[#808080] text-white placeholder-gray-400 h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Tipo de negocio *
                      </label>
                      <select
                        name="tipoNegocio"
                        className="w-full h-12 p-3 bg-[#1a1a1a] border border-[#808080] rounded-md text-white text-base focus:ring-2 focus:ring-[#c0c0c0] focus:border-[#c0c0c0]"
                        required
                      >
                        <option value="">Selecciona tu sector</option>
                        <option value="clinica">Clínica/Centro Médico</option>
                        <option value="inmobiliaria">Inmobiliaria</option>
                        <option value="otro">Otro sector</option>
                      </select>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#c0c0c0] text-black hover:bg-white font-bold text-base sm:text-lg py-4 h-12 sm:h-auto sm:py-3 mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                          ENVIANDO...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="mr-2 h-5 w-5" />
                          AGENDAR CONSULTORÍA GRATUITA
                        </>
                      )}
                    </Button>
                  </form>
                  <p className="text-xs text-gray-400 mt-3 sm:mt-4 text-center leading-relaxed">
                    Al enviar este formulario aceptas recibir comunicaciones
                    comerciales.
                    <br className="hidden sm:block" />
                    Puedes darte de baja en cualquier momento.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 px-4 border-t border-gray-800"
      >
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold text-[#c0c0c0] mb-4">
            PROMETEO STUDIOS
          </div>
          <p className="text-gray-400 mb-4">
            Automatización inteligente para empresas que quieren crecer
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <Link href="#" className="hover:text-white">
              Términos y Condiciones
            </Link>
            <Link href="#" className="hover:text-white">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-white">
              Cookies
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} Prometeo Studios. Todos los derechos
            reservados.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
