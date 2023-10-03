export interface TemplateServiceType {
  getAllUserTemplates?: any;
  getAUserTemplate?: any;
  getAllTemplate?: any;
  addUserToTemplate?: any;
  saveUserTemplate?: any;
}

export interface UserTemplateType {
  id: number;
  template_body: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  template: TemplateType;
}

export interface TemplateType {
  id: number;
  title: string;
  template_body: string;
  created_at: string | null;
  updated_at: string;
  deleted_at: string | null;
}

export interface AddUserToTemplateType {
  template_id: number | null;
}

export interface SaveUserToTemplateType {
  template_id: number | undefined;
  template_body: string;
}
