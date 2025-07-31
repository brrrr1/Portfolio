import { emailConfig } from '../config/email';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Usando Formspree con el Form ID del usuario
    const formId = process.env.REACT_APP_FORMSPREE_FORM_ID || 'mkgzzjzb';
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        _replyto: data.email,
        _subject: `Nuevo mensaje de ${data.name}: ${data.subject}`,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: '¡Mensaje enviado con éxito! Te responderé pronto.'
      };
    } else {
      const errorData = await response.json();
      console.error('Formspree error:', errorData);
      throw new Error('Error al enviar el email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Error al enviar el email. Por favor, inténtalo de nuevo o contacta directamente a brunodelher@gmail.com'
    };
  }
};

// Función alternativa usando EmailJS (requiere configuración adicional)
export const sendEmailWithEmailJS = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Esta función requiere que instales @emailjs/browser
    // y configures las credenciales en emailConfig
    // const templateParams = {
    //   from_name: data.name,
    //   from_email: data.email,
    //   subject: data.subject,
    //   message: data.message,
    //   to_name: emailConfig.default.recipientName,
    //   to_email: emailConfig.default.recipientEmail,
    // };

    // Descomenta las siguientes líneas cuando tengas EmailJS configurado
    // import emailjs from '@emailjs/browser';
    // const response = await emailjs.send(
    //   emailConfig.emailjs.serviceId,
    //   emailConfig.emailjs.templateId,
    //   templateParams,
    //   emailConfig.emailjs.publicKey
    // );

    // Por ahora, simulamos el envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: '¡Mensaje enviado con éxito! Te responderé pronto.'
    };
  } catch (error) {
    console.error('Error sending email with EmailJS:', error);
    return {
      success: false,
      message: 'Error al enviar el email. Por favor, inténtalo de nuevo.'
    };
  }
};

// Función de respaldo que abre el cliente de email del usuario
export const openEmailClient = (data: EmailData): void => {
  const subject = encodeURIComponent(data.subject);
  const body = encodeURIComponent(`Hola Bruno,\n\n${data.message}\n\nSaludos,\n${data.name}\n${data.email}`);
  const mailtoLink = `mailto:${emailConfig.default.recipientEmail}?subject=${subject}&body=${body}`;
  window.open(mailtoLink);
}; 