export interface LinkType {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export interface MetaLinkType {
  active: boolean;
  label: string;
  url: string | null;
}

export interface MetaType {
  curent_page: number;
  from: number;
  last_page: number;
  path: string;
  to: number;
  total: number;
  per_page: number;
  links: Array<MetaLinkType>;
}
