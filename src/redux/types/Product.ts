export interface CategoryType {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  description: string;
}

export interface ProductType {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  file: string;
  description: string;
  category: CategoryType;
}