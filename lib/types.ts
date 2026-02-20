export type UserRole = "admin" | "cliente";

export type LicenseType = "mensual" | "anual" | "ilimitada";

export type UserRecord = {
  id: string;
  email: string;
  nombre: string;
  empresa?: string | null;
  telefono?: string | null;
  rol: UserRole;
  estado: "activo" | "inactivo" | "vencido";
  fecha_inicio: string;
  fecha_vencimiento: string;
  meses_contratados: number;
  tipo_licencia: LicenseType;
  limite_dispositivos: number;
  dispositivos_activos: number;
  ultimo_acceso?: string | null;
  created_at?: string;
};

export type LicenseStatus = {
  fechaVencimiento: string;
  diasRestantes: number;
  estado: "activo" | "vencido";
};

export type AuthResponse = {
  token: string;
  user: Pick<UserRecord, "id" | "email" | "nombre" | "rol">;
  licencia: LicenseStatus;
};
