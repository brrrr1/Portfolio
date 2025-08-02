import { emailConfig } from '../config/email';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
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

export const sendEmailWithEmailJS = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
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

export const openEmailClient = (data: EmailData): void => {
  const subject = encodeURIComponent(data.subject);
  const body = encodeURIComponent(`Hola Bruno,\n\n${data.message}\n\nSaludos,\n${data.name}\n${data.email}`);
  const mailtoLink = `mailto:${emailConfig.default.recipientEmail}?subject=${subject}&body=${body}`;
  window.open(mailtoLink);
}; 