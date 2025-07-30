// Configuración para el servicio de email
export const emailConfig = {
  // Formspree configuration
  formspree: {
    formId: process.env.REACT_APP_FORMSPREE_FORM_ID || 'mkgzzjzb',
    endpoint: 'https://formspree.io/f/',
  },
  
  // EmailJS configuration (alternativa)
  emailjs: {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  },
  
  // Configuración por defecto
  default: {
    recipientEmail: 'brunodelher@gmail.com',
    recipientName: 'Bruno Delgado',
  }
}; 