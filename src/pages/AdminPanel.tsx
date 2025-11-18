import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  createEducation,
  createExperience,
  createProject,
  deleteEducation,
  deleteExperience,
  deleteProject,
  fetchCvMetadata,
  fetchEducations,
  fetchExperiences,
  fetchProjects,
  login,
  updateEducation,
  updateExperience,
  updateProject,
  uploadCv,
} from '../services/api';
import type {
  BackendLanguage,
  CvMetadata,
  Education,
  EducationPayload,
  Experience,
  ExperiencePayload,
  LocalizedText,
  Project,
  ProjectPayload,
} from '../types/api';

const localeOptions: { code: keyof LocalizedText; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

const createEmptyLocalized = (): LocalizedText => ({
  es: '',
  en: '',
  de: '',
});

const createEmptyEducationForm = (): EducationPayload => ({
  institution: '',
  logoUrl: '',
  yearRange: '',
  degree: createEmptyLocalized(),
  description: createEmptyLocalized(),
  orderIndex: 0,
});

const createEmptyExperienceForm = (): ExperiencePayload => ({
  company: '',
  companyUrl: '',
  logoUrl: '',
  role: createEmptyLocalized(),
  description: createEmptyLocalized(),
  location: createEmptyLocalized(),
  dateRange: createEmptyLocalized(),
  workMode: createEmptyLocalized(),
  orderIndex: 0,
});

const createEmptyProjectForm = (): ProjectPayload => ({
  slug: '',
  category: 'web',
  featured: false,
  coverImageUrl: '',
  liveUrl: '',
  githubUrl: '',
  githubUrlFront: '',
  githubUrlBack: '',
  orderIndex: 0,
  technologies: [],
  galleryImages: ['', '', ''],
  title: createEmptyLocalized(),
  shortDescription: createEmptyLocalized(),
  detailedDescription: createEmptyLocalized(),
});

interface LocalizedFieldProps {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  textarea?: boolean;
}

const LocalizedFields: React.FC<LocalizedFieldProps> = ({
  label,
  value,
  onChange,
  textarea = false,
}) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {localeOptions.map((locale) => (
        <div key={locale.code} className="space-y-1">
          <label className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {locale.label}
          </label>
          {textarea ? (
            <textarea
              rows={3}
              value={value[locale.code]}
              onChange={(event) =>
                onChange({ ...value, [locale.code]: event.target.value })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          ) : (
            <input
              type="text"
              value={value[locale.code]}
              onChange={(event) =>
                onChange({ ...value, [locale.code]: event.target.value })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

const AdminPanel: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [educations, setEducations] = useState<Education[]>([]);
  const [educationForm, setEducationForm] = useState<EducationPayload>(createEmptyEducationForm());
  const [editingEducationId, setEditingEducationId] = useState<number | null>(null);
  const [showEducationForm, setShowEducationForm] = useState(false);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [experienceForm, setExperienceForm] = useState<ExperiencePayload>(createEmptyExperienceForm());
  const [editingExperienceId, setEditingExperienceId] = useState<number | null>(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState<ProjectPayload>(createEmptyProjectForm());
  const [projectTechInput, setProjectTechInput] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [cvMetadata, setCvMetadata] = useState<CvMetadata[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvLanguage, setCvLanguage] = useState<BackendLanguage>('ES');

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [isSyncing, setIsSyncing] = useState(false);

  const isAuthenticated = Boolean(token);

  const showStatus = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage(message);
    setStatusType(type);
    setTimeout(() => setStatusMessage(null), 4000);
  }, []);

  const renderEducationFields = () => (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Institución</label>
          <input
            type="text"
            value={educationForm.institution}
            onChange={(event) => setEducationForm({ ...educationForm, institution: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Logo (URL)</label>
          <input
            type="text"
            value={educationForm.logoUrl}
            onChange={(event) => setEducationForm({ ...educationForm, logoUrl: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Periodo</label>
          <input
            type="text"
            value={educationForm.yearRange}
            onChange={(event) => setEducationForm({ ...educationForm, yearRange: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Orden</label>
          <input
            type="number"
            value={educationForm.orderIndex}
            onChange={(event) => setEducationForm({ ...educationForm, orderIndex: Number(event.target.value) })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            min={0}
            required
          />
        </div>
      </div>
      <LocalizedFields
        label="Título"
        value={educationForm.degree}
        onChange={(value) => setEducationForm({ ...educationForm, degree: value })}
      />
      <LocalizedFields
        label="Descripción"
        value={educationForm.description}
        onChange={(value) => setEducationForm({ ...educationForm, description: value })}
        textarea
      />
    </>
  );

  const renderExperienceFields = () => (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Empresa</label>
          <input
            type="text"
            value={experienceForm.company}
            onChange={(event) => setExperienceForm({ ...experienceForm, company: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Website</label>
          <input
            type="text"
            value={experienceForm.companyUrl}
            onChange={(event) => setExperienceForm({ ...experienceForm, companyUrl: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Logo (URL)</label>
          <input
            type="text"
            value={experienceForm.logoUrl}
            onChange={(event) => setExperienceForm({ ...experienceForm, logoUrl: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Orden</label>
          <input
            type="number"
            value={experienceForm.orderIndex}
            onChange={(event) => setExperienceForm({ ...experienceForm, orderIndex: Number(event.target.value) })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            min={0}
            required
          />
        </div>
      </div>
      <LocalizedFields
        label="Rol"
        value={experienceForm.role}
        onChange={(value) => setExperienceForm({ ...experienceForm, role: value })}
      />
      <LocalizedFields
        label="Descripción"
        value={experienceForm.description}
        onChange={(value) => setExperienceForm({ ...experienceForm, description: value })}
        textarea
      />
      <LocalizedFields
        label="Ubicación"
        value={experienceForm.location}
        onChange={(value) => setExperienceForm({ ...experienceForm, location: value })}
      />
      <LocalizedFields
        label="Periodo"
        value={experienceForm.dateRange}
        onChange={(value) => setExperienceForm({ ...experienceForm, dateRange: value })}
      />
      <LocalizedFields
        label="Modalidad"
        value={experienceForm.workMode}
        onChange={(value) => setExperienceForm({ ...experienceForm, workMode: value })}
      />
    </>
  );

  const renderProjectFields = () => (
    <>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Slug</label>
          <input
            type="text"
            value={projectForm.slug}
            onChange={(event) => setProjectForm({ ...projectForm, slug: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Categoría</label>
          <input
            type="text"
            value={projectForm.category}
            onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Orden</label>
          <input
            type="number"
            value={projectForm.orderIndex}
            onChange={(event) => setProjectForm({ ...projectForm, orderIndex: Number(event.target.value) })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            min={0}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={projectForm.featured}
            onChange={(event) => setProjectForm({ ...projectForm, featured: event.target.checked })}
            className="h-5 w-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Destacado
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Portada (URL)</label>
          <input
            type="text"
            value={projectForm.coverImageUrl}
            onChange={(event) => setProjectForm({ ...projectForm, coverImageUrl: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Demo</label>
          <input
            type="text"
            value={projectForm.liveUrl ?? ''}
            onChange={(event) => setProjectForm({ ...projectForm, liveUrl: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">GitHub</label>
          <input
            type="text"
            value={projectForm.githubUrl ?? ''}
            onChange={(event) => setProjectForm({ ...projectForm, githubUrl: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">GitHub Backend</label>
          <input
            type="text"
            value={projectForm.githubUrlBack ?? ''}
            onChange={(event) => setProjectForm({ ...projectForm, githubUrlBack: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">GitHub Frontend</label>
          <input
            type="text"
            value={projectForm.githubUrlFront ?? ''}
            onChange={(event) => setProjectForm({ ...projectForm, githubUrlFront: event.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Tecnologías (separadas por comas)</label>
        <input
          type="text"
          value={projectTechInput}
          onChange={(event) => setProjectTechInput(event.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="React, Java/Spring, PostgreSQL..."
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Capturas (3 URLs)</label>
        <div className="grid md:grid-cols-3 gap-3">
          {projectForm.galleryImages.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(event) => {
                const updated = [...projectForm.galleryImages];
                updated[index] = event.target.value;
                setProjectForm({ ...projectForm, galleryImages: updated });
              }}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={`Captura ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <LocalizedFields
        label="Título"
        value={projectForm.title}
        onChange={(value) => setProjectForm({ ...projectForm, title: value })}
      />
      <LocalizedFields
        label="Descripción corta"
        value={projectForm.shortDescription}
        onChange={(value) => setProjectForm({ ...projectForm, shortDescription: value })}
        textarea
      />
      <LocalizedFields
        label="Descripción detallada"
        value={projectForm.detailedDescription}
        onChange={(value) => setProjectForm({ ...projectForm, detailedDescription: value })}
        textarea
      />
    </>
  );

  const resetEducationForm = () => {
    setEducationForm(createEmptyEducationForm());
    setEditingEducationId(null);
    setShowEducationForm(false);
  };

  const resetExperienceForm = () => {
    setExperienceForm(createEmptyExperienceForm());
    setEditingExperienceId(null);
    setShowExperienceForm(false);
  };

  const resetProjectForm = () => {
    setProjectForm(createEmptyProjectForm());
    setProjectTechInput('');
    setEditingProjectId(null);
    setShowProjectForm(false);
  };

  const syncData = useCallback(async () => {
    try {
      setIsSyncing(true);
      const [educationResponse, experienceResponse, projectResponse, cvResponse] = await Promise.all([
        fetchEducations(),
        fetchExperiences(),
        fetchProjects(),
        fetchCvMetadata(),
      ]);
      setEducations(educationResponse);
      setExperiences(experienceResponse);
      setProjects(projectResponse);
      setCvMetadata(cvResponse);
    } catch (error) {
      console.error(error);
      showStatus('No se pudo sincronizar con el backend.', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, [showStatus]);

  useEffect(() => {
    localStorage.removeItem('adminToken');
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      syncData();
    }
  }, [isAuthenticated, syncData]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoggingIn(true);
      setLoginError(null);
      const authToken = await login(loginPassword);
      setToken(authToken);
      setLoginPassword('');
      showStatus('Autenticación correcta.');
    } catch (error) {
      console.error(error);
      setLoginError('Contraseña incorrecta.');
      showStatus('No se pudo iniciar sesión.', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const ensureToken = () => {
    if (!token) {
      showStatus('Debes iniciar sesión para realizar esta acción.', 'error');
      return false;
    }
    return true;
  };

  const handleEducationSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ensureToken()) return;
    try {
      const payload: EducationPayload = {
        ...educationForm,
        logoUrl: educationForm.logoUrl?.trim() || undefined,
        yearRange: educationForm.yearRange.trim(),
        institution: educationForm.institution.trim(),
      };
      if (editingEducationId) {
        await updateEducation(editingEducationId, payload, token!);
        showStatus('Educación actualizada correctamente.');
      } else {
        await createEducation(payload, token!);
        showStatus('Educación creada correctamente.');
      }
      await syncData();
      resetEducationForm();
      setShowEducationForm(false);
    } catch (error) {
      console.error(error);
      showStatus('No se pudo guardar la educación.', 'error');
    }
  };

  const handleExperienceSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ensureToken()) return;
    try {
      const payload: ExperiencePayload = {
        ...experienceForm,
        company: experienceForm.company.trim(),
        companyUrl: experienceForm.companyUrl?.trim() || undefined,
        logoUrl: experienceForm.logoUrl?.trim() || undefined,
      };
      if (editingExperienceId) {
        await updateExperience(editingExperienceId, payload, token!);
        showStatus('Experiencia actualizada correctamente.');
      } else {
        await createExperience(payload, token!);
        showStatus('Experiencia creada correctamente.');
      }
      await syncData();
      resetExperienceForm();
      setShowExperienceForm(false);
    } catch (error) {
      console.error(error);
      showStatus('No se pudo guardar la experiencia.', 'error');
    }
  };

  const handleProjectSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ensureToken()) return;
    const technologies = projectTechInput
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean);
    const galleryImages = projectForm.galleryImages.map((img) => img.trim());

    if (galleryImages.some((img) => !img)) {
      showStatus('Debes proporcionar las tres capturas de proyecto.', 'error');
      return;
    }

    if (!technologies.length) {
      showStatus('Incluye al menos una tecnología.', 'error');
      return;
    }

    try {
      const payload: ProjectPayload = {
        ...projectForm,
        slug: projectForm.slug.trim().toLowerCase(),
        coverImageUrl: projectForm.coverImageUrl.trim(),
        liveUrl: projectForm.liveUrl?.trim() || undefined,
        githubUrl: projectForm.githubUrl?.trim() || undefined,
        githubUrlFront: projectForm.githubUrlFront?.trim() || undefined,
        githubUrlBack: projectForm.githubUrlBack?.trim() || undefined,
        technologies,
        galleryImages,
      };

      if (editingProjectId) {
        await updateProject(editingProjectId, payload, token!);
        showStatus('Proyecto actualizado correctamente.');
      } else {
        await createProject(payload, token!);
        showStatus('Proyecto creado correctamente.');
      }
      await syncData();
      resetProjectForm();
      setShowProjectForm(false);
    } catch (error) {
      console.error(error);
      showStatus('No se pudo guardar el proyecto.', 'error');
    }
  };

  const handleEducationDelete = async (id: number) => {
    if (!ensureToken()) return;
    if (!window.confirm('¿Eliminar este registro de educación?')) return;
    try {
      await deleteEducation(id, token!);
      showStatus('Educación eliminada.');
      await syncData();
    } catch (error) {
      console.error(error);
      showStatus('No se pudo eliminar la educación.', 'error');
    }
  };

  const handleExperienceDelete = async (id: number) => {
    if (!ensureToken()) return;
    if (!window.confirm('¿Eliminar esta experiencia?')) return;
    try {
      await deleteExperience(id, token!);
      showStatus('Experiencia eliminada.');
      await syncData();
    } catch (error) {
      console.error(error);
      showStatus('No se pudo eliminar la experiencia.', 'error');
    }
  };

  const handleProjectDelete = async (id: number) => {
    if (!ensureToken()) return;
    if (!window.confirm('¿Eliminar este proyecto?')) return;
    try {
      await deleteProject(id, token!);
      showStatus('Proyecto eliminado.');
      await syncData();
    } catch (error) {
      console.error(error);
      showStatus('No se pudo eliminar el proyecto.', 'error');
    }
  };

  const handleCvUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ensureToken()) return;
    if (!cvFile) {
      showStatus('Selecciona un archivo PDF.', 'error');
      return;
    }

    try {
      await uploadCv(cvLanguage, cvFile, token!);
      showStatus('CV actualizado correctamente.');
      setCvFile(null);
      await syncData();
    } catch (error) {
      console.error(error);
      showStatus('No se pudo subir el CV.', 'error');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setLoginPassword('');
    resetEducationForm();
    resetExperienceForm();
    resetProjectForm();
    showStatus('Sesión cerrada.');
  };

  const formatDate = useCallback((isoDate?: string) => {
    if (!isoDate) return '—';
    return new Date(isoDate).toLocaleString();
  }, []);

  const cvMap = useMemo(() => {
    return cvMetadata.reduce<Record<BackendLanguage, CvMetadata | null>>((map, item) => {
      map[item.language] = item;
      return map;
    }, { ES: null, EN: null, DE: null });
  }, [cvMetadata]);

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-16 px-4">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Panel de administración</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Introduce la contraseña para acceder.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Contraseña</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoggingIn || !loginPassword}
            className="w-full btn-primary justify-center disabled:opacity-60"
          >
            {isLoggingIn ? 'Validando...' : 'Entrar'}
          </button>
        </motion.form>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container-custom space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de administración</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={syncData}
              disabled={isSyncing}
              className="btn-secondary disabled:opacity-50"
            >
              {isSyncing ? 'Sincronizando...' : 'Refrescar datos'}
            </button>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`rounded-lg px-4 py-3 text-sm ${
              statusType === 'success'
                ? 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100'
                : 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100'
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* Education */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Educación</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (editingEducationId) {
                    resetEducationForm();
                  }
                  setShowEducationForm((prev) => !prev);
                }}
                className="btn-secondary"
              >
                {showEducationForm ? 'Ocultar formulario' : 'Añadir nuevo'}
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {educations.map((edu) => {
              const isEditing = editingEducationId === edu.id;
              const formId = `education-edit-${edu.id}`;
              return (
                <div
                  key={edu.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-primary-600 dark:text-primary-300 font-semibold">{edu.yearRange}</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {edu.degree.es}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={resetEducationForm}
                            className="btn-secondary"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            form={formId}
                            className="btn-primary"
                          >
                            Actualizar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEducationForm({
                                institution: edu.institution,
                                logoUrl: edu.logoUrl ?? '',
                                yearRange: edu.yearRange,
                                degree: { ...edu.degree },
                                description: { ...edu.description },
                                orderIndex: edu.orderIndex,
                              });
                              setShowEducationForm(false);
                              setEditingEducationId(edu.id);
                            }}
                            className="btn-secondary"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleEducationDelete(edu.id)}
                            className="btn-secondary bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <form id={formId} onSubmit={handleEducationSubmit} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      {renderEducationFields()}
                    </form>
                  )}
                </div>
              );
            })}
          </div>

          {showEducationForm && (
          <form onSubmit={handleEducationSubmit} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
            {renderEducationFields()}
            <div className="flex gap-2">
              <button type="button" onClick={resetEducationForm} className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Añadir educación
              </button>
            </div>
          </form>
          )}
        </div>

        {/* Experience */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Experiencia</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (editingExperienceId) {
                    resetExperienceForm();
                  }
                  setShowExperienceForm((prev) => !prev);
                }}
                className="btn-secondary"
              >
                {showExperienceForm ? 'Ocultar formulario' : 'Añadir nuevo'}
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {experiences.map((exp) => {
              const isEditing = editingExperienceId === exp.id;
              const formId = `experience-edit-${exp.id}`;
              return (
                <div
                  key={exp.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-primary-600 dark:text-primary-300 font-semibold">
                        {exp.company}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {exp.role.es}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {exp.dateRange.es}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <button type="button" onClick={resetExperienceForm} className="btn-secondary">
                            Cancelar
                          </button>
                          <button type="submit" form={formId} className="btn-primary">
                            Actualizar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setExperienceForm({
                                company: exp.company,
                                companyUrl: exp.companyUrl ?? '',
                                logoUrl: exp.logoUrl ?? '',
                                role: { ...exp.role },
                                description: { ...exp.description },
                                location: { ...exp.location },
                                dateRange: { ...exp.dateRange },
                                workMode: { ...exp.workMode },
                                orderIndex: exp.orderIndex,
                              });
                              setEditingExperienceId(exp.id);
                              setShowExperienceForm(false);
                            }}
                            className="btn-secondary"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleExperienceDelete(exp.id)}
                            className="btn-secondary bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <form id={formId} onSubmit={handleExperienceSubmit} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      {renderExperienceFields()}
                    </form>
                  )}
                </div>
              );
            })}
          </div>

          {showExperienceForm && (
          <form onSubmit={handleExperienceSubmit} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
            {renderExperienceFields()}
            <div className="flex gap-2">
              <button type="button" onClick={resetExperienceForm} className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Añadir experiencia
              </button>
            </div>
          </form>
          )}
        </div>

        {/* Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Proyectos</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (editingProjectId) {
                    resetProjectForm();
                  }
                  setShowProjectForm((prev) => !prev);
                }}
                className="btn-secondary"
              >
                {showProjectForm ? 'Ocultar formulario' : 'Añadir nuevo'}
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {projects.map((project) => {
              const isEditing = editingProjectId === project.id;
              const formId = `project-edit-${project.id}`;
              return (
                <div
                  key={project.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-primary-600 dark:text-primary-300 font-semibold uppercase">
                        {project.slug}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.title.es}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {project.galleryImages.join(', ')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <button type="button" onClick={resetProjectForm} className="btn-secondary">
                            Cancelar
                          </button>
                          <button type="submit" form={formId} className="btn-primary">
                            Actualizar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setProjectForm({
                                slug: project.slug,
                                category: project.category,
                                featured: project.featured,
                                coverImageUrl: project.coverImageUrl,
                                liveUrl: project.liveUrl ?? '',
                                githubUrl: project.githubUrl ?? '',
                                githubUrlFront: project.githubUrlFront ?? '',
                                githubUrlBack: project.githubUrlBack ?? '',
                                orderIndex: project.orderIndex,
                                technologies: [...project.technologies],
                                galleryImages: [...project.galleryImages],
                                title: { ...project.title },
                                shortDescription: { ...project.shortDescription },
                                detailedDescription: { ...project.detailedDescription },
                              });
                              setProjectTechInput(project.technologies.join(', '));
                              setEditingProjectId(project.id);
                              setShowProjectForm(false);
                            }}
                            className="btn-secondary"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleProjectDelete(project.id)}
                            className="btn-secondary bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <form id={formId} onSubmit={handleProjectSubmit} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      {renderProjectFields()}
                    </form>
                  )}
                </div>
              );
            })}
          </div>

          {showProjectForm && (
          <form onSubmit={handleProjectSubmit} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
            {renderProjectFields()}
            <div className="flex gap-2">
              <button type="button" onClick={resetProjectForm} className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Añadir proyecto
              </button>
            </div>
          </form>
          )}
        </div>

        {/* CV */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Currículums</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(['ES', 'EN'] as BackendLanguage[]).map((lang) => (
              <div key={lang} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-500 uppercase">{lang}</p>
                <p className="text-gray-900 dark:text-white">
                  {cvMap[lang]?.fileName ?? 'Sin archivo'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Última actualización: {formatDate(cvMap[lang]?.updatedAt)}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleCvUpload} className="grid md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Idioma</label>
              <select
                value={cvLanguage}
                onChange={(event) => setCvLanguage(event.target.value as BackendLanguage)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
              >
                <option value="ES">Español</option>
                <option value="EN">Inglés</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Archivo PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
                className="w-full text-sm text-gray-600 dark:text-gray-300"
              />
            </div>
            <button type="submit" className="btn-primary md:col-span-2">
              Subir CV
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;


