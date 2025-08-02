export const emailConfig = {
  formspree: {
    formId: process.env.REACT_APP_FORMSPREE_FORM_ID || 'mkgzzjzb',
    endpoint: 'https://formspree.io/f/',
  },
  
  emailjs: {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  },
  
  default: {
    recipientEmail: 'brunodelher@gmail.com',
    recipientName: 'Bruno Delgado',
  }
}; 