import { LinkType, MetaType } from "./common";

export interface PermissionType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PermissionWithPaginationType {
  data: Array<PermissionType>;
  links: LinkType;
  meta: MetaType;
}
