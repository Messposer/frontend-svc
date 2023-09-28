export interface TemplateServiceType {
  getAllUserTemplates?: any;
  getAUserTemplate?: any;
  getAllTemplate?: any;
  addUserToTemplate?: any;
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
  template_id: string | null;
}
