import type {
  Education,
  EducationPayload,
  Experience,
  ExperiencePayload,
  Project,
  ProjectPayload,
  CvMetadata,
  BackendLanguage,
} from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080/api';
const PUBLIC_BASE = `${API_BASE_URL}/public`;
const ADMIN_BASE = `${API_BASE_URL}/admin`;
const AUTH_BASE = `${API_BASE_URL}/auth`;

// Log de la URL del backend (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 Backend API URL:', API_BASE_URL);
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    const errorMsg = message || `Error en la comunicación con el servidor (${response.status})`;
    console.error('❌ Error del backend:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      message: errorMsg
    });
    throw new Error(errorMsg);
  }
  if (response.status === 204) {
    return {} as T;
  }
  return response.json() as Promise<T>;
}

export async function fetchEducations(): Promise<Education[]> {
  try {
    const response = await fetch(`${PUBLIC_BASE}/educations`);
    return handleResponse<Education[]>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('❌ Error de conexión:', {
        url: `${PUBLIC_BASE}/educations`,
        message: 'No se pudo conectar con el backend. Verifica que REACT_APP_API_BASE_URL esté configurada correctamente.',
        apiBaseUrl: API_BASE_URL
      });
      throw new Error('No se pudo conectar con el backend. Verifica la configuración de REACT_APP_API_BASE_URL.');
    }
    throw error;
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const response = await fetch(`${PUBLIC_BASE}/experiences`);
    return handleResponse<Experience[]>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('❌ Error de conexión:', {
        url: `${PUBLIC_BASE}/experiences`,
        message: 'No se pudo conectar con el backend. Verifica que REACT_APP_API_BASE_URL esté configurada correctamente.',
        apiBaseUrl: API_BASE_URL
      });
      throw new Error('No se pudo conectar con el backend. Verifica la configuración de REACT_APP_API_BASE_URL.');
    }
    throw error;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${PUBLIC_BASE}/projects`);
    return handleResponse<Project[]>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('❌ Error de conexión:', {
        url: `${PUBLIC_BASE}/projects`,
        message: 'No se pudo conectar con el backend. Verifica que REACT_APP_API_BASE_URL esté configurada correctamente.',
        apiBaseUrl: API_BASE_URL
      });
      throw new Error('No se pudo conectar con el backend. Verifica la configuración de REACT_APP_API_BASE_URL.');
    }
    throw error;
  }
}

export async function fetchCvMetadata(): Promise<CvMetadata[]> {
  try {
    const response = await fetch(`${PUBLIC_BASE}/cv/metadata`);
    return handleResponse<CvMetadata[]>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('❌ Error de conexión:', {
        url: `${PUBLIC_BASE}/cv/metadata`,
        message: 'No se pudo conectar con el backend. Verifica que REACT_APP_API_BASE_URL esté configurada correctamente.',
        apiBaseUrl: API_BASE_URL
      });
      throw new Error('No se pudo conectar con el backend. Verifica la configuración de REACT_APP_API_BASE_URL.');
    }
    throw error;
  }
}

export async function downloadCv(language: 'english' | 'spanish'): Promise<Blob> {
  const endpoint = language === 'english' ? 'english' : 'spanish';
  const response = await fetch(`${PUBLIC_BASE}/cv/${endpoint}`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'No se pudo descargar el CV');
  }
  return response.blob();
}

export async function login(password: string): Promise<string> {
  const response = await fetch(`${AUTH_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  const data = await handleResponse<{ token: string }>(response);
  return data.token;
}

function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function createEducation(payload: EducationPayload, token: string): Promise<Education> {
  const response = await fetch(`${ADMIN_BASE}/educations`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Education>(response);
}

export async function updateEducation(id: number, payload: EducationPayload, token: string): Promise<Education> {
  const response = await fetch(`${ADMIN_BASE}/educations/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Education>(response);
}

export async function deleteEducation(id: number, token: string): Promise<void> {
  const response = await fetch(`${ADMIN_BASE}/educations/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await handleResponse<unknown>(response);
}

export async function createExperience(payload: ExperiencePayload, token: string): Promise<Experience> {
  const response = await fetch(`${ADMIN_BASE}/experiences`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Experience>(response);
}

export async function updateExperience(id: number, payload: ExperiencePayload, token: string): Promise<Experience> {
  const response = await fetch(`${ADMIN_BASE}/experiences/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Experience>(response);
}

export async function deleteExperience(id: number, token: string): Promise<void> {
  const response = await fetch(`${ADMIN_BASE}/experiences/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  await handleResponse<unknown>(response);
}

export async function createProject(payload: ProjectPayload, token: string): Promise<Project> {
  const response = await fetch(`${ADMIN_BASE}/projects`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Project>(response);
}

export async function updateProject(id: number, payload: ProjectPayload, token: string): Promise<Project> {
  const response = await fetch(`${ADMIN_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Project>(response);
}

export async function deleteProject(id: number, token: string): Promise<void> {
  const response = await fetch(`${ADMIN_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  await handleResponse<unknown>(response);
}

export async function uploadCv(language: BackendLanguage, file: File, token: string): Promise<CvMetadata> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${ADMIN_BASE}/cv/${language}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return handleResponse<CvMetadata>(response);
}


