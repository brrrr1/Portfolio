# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar correctamente tu portfolio en Vercel y solucionar el error "No se pudo cargar la información desde el backend".

## ⚠️ Problema Común

Si ves el mensaje **"No se pudo cargar la información desde el backend"** en producción, significa que la aplicación no puede conectarse con tu backend. Esto generalmente se debe a:

1. **Variable de entorno faltante**: `REACT_APP_API_BASE_URL` no está configurada
2. **URL incorrecta**: La URL del backend no es correcta o no está accesible
3. **CORS no configurado**: El backend no permite peticiones desde el dominio de Vercel

## ✅ Solución Paso a Paso

### 1. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Añade las siguientes variables:

#### Variable Obligatoria:
- **Nombre**: `REACT_APP_API_BASE_URL`
- **Valor**: La URL completa de tu backend (ej: `https://tu-backend.herokuapp.com/api` o `https://api.tudominio.com/api`)
- **Entornos**: Selecciona **Production**, **Preview** y **Development** (o al menos Production)

#### Variable Opcional (si usas Formspree):
- **Nombre**: `REACT_APP_FORMSPREE_FORM_ID`
- **Valor**: Tu Form ID de Formspree
- **Entornos**: Production, Preview, Development

### 2. Verificar la URL del Backend

Asegúrate de que:
- ✅ El backend esté desplegado y funcionando
- ✅ La URL sea accesible públicamente (no `localhost`)
- ✅ La URL incluya el protocolo `https://` (o `http://` si no tienes SSL)
- ✅ La URL termine con `/api` si tu backend está configurado así

**Ejemplos de URLs correctas:**
```
✅ https://mi-backend.herokuapp.com/api
✅ https://api.midominio.com/api
✅ https://backend-railway.app/api
```

**Ejemplos de URLs incorrectas:**
```
❌ http://localhost:8080/api (no funciona en producción)
❌ https://mi-backend.herokuapp.com (falta /api)
❌ mi-backend.herokuapp.com/api (falta https://)
```

### 3. Configurar CORS en el Backend

Si tu backend está en un dominio diferente, asegúrate de que permita peticiones desde Vercel:

**En Spring Boot**, añade esto a tu `SecurityConfig.java`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "https://tu-proyecto.vercel.app",
        "https://www.tudominio.com" // Si tienes dominio personalizado
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### 4. Hacer un Nuevo Deploy

**⚠️ IMPORTANTE**: Después de añadir o modificar variables de entorno, debes hacer un nuevo deploy:

1. Opción 1: Hacer un nuevo commit y push (Vercel desplegará automáticamente)
2. Opción 2: Ir a **Deployments** → Seleccionar el último deploy → **Redeploy**

### 5. Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Console**
3. Deberías ver: `🔗 Backend API URL: https://tu-backend.com/api`
4. Si hay errores, verás mensajes detallados que te ayudarán a diagnosticar el problema

## 🔍 Diagnóstico de Problemas

### Error: "No se pudo conectar con el backend"

**Causas posibles:**
- La variable `REACT_APP_API_BASE_URL` no está configurada
- La URL del backend es incorrecta
- El backend no está accesible

**Solución:**
1. Verifica las variables de entorno en Vercel
2. Prueba la URL del backend directamente en el navegador
3. Revisa los logs del backend para ver si recibe las peticiones

### Error: CORS Policy

**Causa:**
- El backend no permite peticiones desde el dominio de Vercel

**Solución:**
- Configura CORS en el backend (ver paso 3)

### Error: 404 Not Found

**Causa:**
- La URL del backend no incluye `/api` o la ruta es incorrecta

**Solución:**
- Verifica que la URL termine con `/api` si tu backend está configurado así
- Prueba las rutas del backend directamente

## 📝 Checklist de Despliegue

Antes de desplegar, verifica:

- [ ] Backend desplegado y funcionando
- [ ] Variable `REACT_APP_API_BASE_URL` configurada en Vercel
- [ ] URL del backend es correcta y accesible
- [ ] CORS configurado en el backend
- [ ] Nuevo deploy realizado después de configurar variables
- [ ] Consola del navegador sin errores de conexión

## 🆘 ¿Necesitas Ayuda?

Si después de seguir estos pasos sigues teniendo problemas:

1. Revisa la consola del navegador para ver los errores específicos
2. Verifica los logs de Vercel en el dashboard
3. Prueba las rutas del backend directamente con Postman o curl
4. Asegúrate de que el backend esté funcionando correctamente

---

**Nota**: Las variables de entorno en React deben empezar con `REACT_APP_` para que sean accesibles en el código del frontend.

