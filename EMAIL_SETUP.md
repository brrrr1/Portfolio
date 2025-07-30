# Configuración del Envío de Emails

Este proyecto incluye un sistema de envío de emails funcional. Tienes varias opciones para configurarlo:

## Opción 1: Formspree (Recomendado - Gratis)

### Paso 1: Crear cuenta en Formspree
1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia el ID del formulario (algo como `xrgjqkzw`)

### Paso 2: Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_FORMSPREE_FORM_ID=tu_form_id_aqui
```

### Paso 3: Probar
El formulario ya debería funcionar. Los emails se enviarán a tu email de Formspree.

## Opción 2: EmailJS (Alternativa)

### Paso 1: Instalar EmailJS
```bash
npm install @emailjs/browser --legacy-peer-deps
```

### Paso 2: Configurar EmailJS
1. Ve a [emailjs.com](https://emailjs.com)
2. Crea una cuenta
3. Configura un servicio de email (Gmail, Outlook, etc.)
4. Crea una plantilla de email
5. Copia las credenciales

### Paso 3: Configurar variables de entorno
```env
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key
```

### Paso 4: Activar EmailJS
Descomenta las líneas en `src/services/emailService.ts` para usar EmailJS.

## Opción 3: Backend Personalizado

Si prefieres un backend personalizado:

1. Crea un servidor Node.js/Express
2. Usa nodemailer para enviar emails
3. Crea un endpoint `/api/send-email`
4. Actualiza `src/services/emailService.ts` para usar tu endpoint

## Configuración Actual

El proyecto está configurado para usar **Formspree** por defecto. Solo necesitas:

1. Crear una cuenta en Formspree
2. Obtener tu Form ID
3. Crear el archivo `.env` con:
   ```
   REACT_APP_FORMSPREE_FORM_ID=tu_form_id
   ```

## Características del Sistema

- ✅ **Validación de formulario**
- ✅ **Mensajes de estado** (éxito/error)
- ✅ **Animaciones** durante el envío
- ✅ **Manejo de errores** robusto
- ✅ **Fallback** a cliente de email
- ✅ **Soporte multiidioma** para mensajes
- ✅ **Modo oscuro** compatible

## Prueba del Sistema

1. Ejecuta `npm start`
2. Ve a la sección Contact
3. Llena el formulario
4. Envía el mensaje
5. Verifica que recibes el email

## Troubleshooting

### Error: "Form ID not found"
- Verifica que el Form ID en `.env` es correcto
- Asegúrate de que el archivo `.env` está en la raíz del proyecto

### Error: "Network error"
- Verifica tu conexión a internet
- Comprueba que Formspree no esté bloqueado

### No recibes emails
- Revisa tu carpeta de spam
- Verifica la configuración de Formspree
- Usa la función de respaldo (abre cliente de email)

## Archivos Importantes

- `src/services/emailService.ts` - Lógica de envío
- `src/config/email.ts` - Configuración
- `src/pages/Contact.tsx` - Formulario de contacto
- `.env` - Variables de entorno (crear)

¡El sistema está listo para usar! 🚀 