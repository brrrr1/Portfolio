# Portfolio Personal - Bruno Delgado

Un portfolio moderno y profesional desarrollado con React, TypeScript, Tailwind CSS y Framer Motion.

## ✨ Características

### 🌍 **Multiidioma**
- Soporte para Español, Inglés y Alemán
- Selector de idioma con banderas
- Persistencia del idioma seleccionado

### 🌙 **Modo Oscuro/Claro**
- Toggle de tema con iconos sol/luna
- Detección automática del tema del sistema
- Transiciones suaves entre modos
- Persistencia del tema seleccionado

### 📧 **Sistema de Contacto Funcional**
- Formulario de contacto con envío real de emails
- Integración con Formspree (gratis)
- Mensajes de estado (éxito/error)
- Validación de formulario
- Animaciones durante el envío

### 🎨 **Diseño Moderno**
- Interfaz limpia y profesional
- Animaciones fluidas con Framer Motion
- Diseño responsivo para todos los dispositivos
- Tipografía optimizada con Inter font

### 📱 **Navegación SPA**
- Navegación de página única con scroll suave
- Secciones bien organizadas
- Controles responsivos para móvil y desktop

### 🔐 **Panel de administración**
- Acceso seguro desde el footer con contraseña cifrada
- CRUD completo de educación, experiencia y proyectos
- Subida de CVs en español e inglés
- Datos persistidos en base de datos PostgreSQL

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Animaciones
- **React Router** - Navegación (convertido a SPA)
- **Heroicons** - Iconos SVG
- **Formspree** - Envío de emails
- **Spring Boot 3** - Backend REST
- **PostgreSQL** - Base de datos relacional
- **Spring Security + JWT** - Autenticación del panel

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx      # Barra de navegación
│   └── Footer.tsx      # Pie de página
├── contexts/           # Contextos de React
│   ├── ThemeContext.tsx    # Contexto del tema
│   └── LanguageContext.tsx # Contexto del idioma
├── hooks/              # Hooks personalizados
│   └── useTranslation.ts   # Hook para traducciones
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página de inicio
│   ├── About.tsx       # Sobre mí
│   ├── Projects.tsx    # Proyectos
│   └── Contact.tsx     # Contacto
├── services/           # Servicios
│   └── emailService.ts # Servicio de email
├── config/             # Configuraciones
│   └── email.ts        # Configuración de email
├── translations/       # Traducciones
│   └── index.ts        # Archivo de traducciones
└── App.tsx            # Componente principal
```

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd portfolio
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura la API**  
   - Ajusta el backend en `backend/src/main/resources/application.properties` o mediante variables de entorno (ver sección PostgreSQL).
   - Define la URL de la API para el frontend: crea un archivo `.env` (añádelo al `.gitignore` si subes credenciales) con:
     ```env
     REACT_APP_API_BASE_URL=http://localhost:8080/api
     ```

4. **Configura el envío de emails** (Opcional)
   - Crea una cuenta en [Formspree](https://formspree.io)
   - Obtén tu Form ID
   - Añade la variable a tu `.env` (o `.env.local`):
     ```env
     REACT_APP_FORMSPREE_FORM_ID=tu_form_id_aqui
     ```

5. **Ejecuta el frontend**
   ```bash
   npm start
   ```

6. **Levanta el backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run   # En Windows usar .\mvnw.cmd spring-boot:run
   ```

El frontend espera el backend en `http://localhost:8080/api`. Ajusta `REACT_APP_API_BASE_URL` si despliegas en otra URL.

## 🗄️ Backend con Spring Boot (PostgreSQL)

- API REST `/api/public` para educación, experiencia, proyectos y CVs.
- Panel protegido `/api/admin` autenticado mediante JWT (contraseña `3443pf`, almacenada cifrada).
- Seeding automático con el contenido existente del portfolio.
- Gestor de CVs con almacenamiento en base de datos.
- Documentación OpenAPI disponible en `/swagger-ui.html`.
- Base de datos: PostgreSQL (driver incluido, H2 no se utiliza en producción).

### Variables de entorno necesarias

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `DATABASE_URL` | JDBC URL de PostgreSQL | `jdbc:postgresql://localhost:5432/portfolio_db` |
| `DATABASE_USERNAME` | Usuario de la BD | `postgres` |
| `DATABASE_PASSWORD` | Contraseña de la BD | `postgres` |

En Windows ya se dejaron configuradas con valores genéricos mediante `setx`. Puedes cambiarlas con:

```powershell
setx DATABASE_URL "jdbc:postgresql://<host>:<puerto>/<db>"
setx DATABASE_USERNAME "<usuario>"
setx DATABASE_PASSWORD "<contraseña>"
```

### Ejecutar backend

```bash
cd backend
./mvnw clean package   # construye el jar
./mvnw spring-boot:run # levanta el servidor usando las variables anteriores
```

> Nota: si todavía no tienes un servidor de PostgreSQL disponible, crea la base `portfolio_db` y un usuario con permisos antes de arrancar la API.

## 📧 Configuración del Sistema de Emails

El proyecto incluye un sistema de envío de emails completamente funcional. Ver [EMAIL_SETUP.md](./EMAIL_SETUP.md) para instrucciones detalladas.

### Opciones disponibles:
- **Formspree** (Recomendado - Gratis)
- **EmailJS** (Alternativa)
- **Backend personalizado**

## 🎨 Personalización

### Cambiar Colores
Edita `tailwind.config.js` para modificar la paleta de colores:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... más colores
  },
}
```

### Añadir Idiomas
1. Añade las traducciones en `src/translations/index.ts`
2. Actualiza el selector de idiomas en `src/components/Navbar.tsx`

### Modificar Contenido
- **Información personal**: `src/pages/About.tsx`
- **Proyectos**: `src/pages/Projects.tsx`
- **Contacto**: `src/pages/Contact.tsx`
- **Navegación**: `src/components/Navbar.tsx`

## 📱 Responsive Design

El portfolio está optimizado para:
- 📱 **Móviles** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Pantallas grandes** (1280px+)

## 🚀 Despliegue

### Netlify (Recomendado)
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. ¡Listo!

### Vercel
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Configura las variables de entorno

### GitHub Pages
1. Instala: `npm install --save-dev gh-pages`
2. Añade al package.json:
   ```json
   "homepage": "https://tu-usuario.github.io/tu-repo",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Ejecuta: `npm run deploy`

## 🔧 Scripts Disponibles

- `npm start` - Ejecuta en modo desarrollo
- `npm run build` - Construye para producción
- `npm test` - Ejecuta tests
- `npm run eject` - Ejecta configuración (irreversible)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Contacto

- **Email**: brunodelher@gmail.com
- **LinkedIn**: [Bruno Delgado](https://www.linkedin.com/in/bruno-delgado-herrero-37872a298)
- **GitHub**: [brrrr1](https://github.com/brrrr1)

---

¡Gracias por visitar mi portfolio! 🚀
