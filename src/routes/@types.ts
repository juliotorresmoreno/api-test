

export interface RegisterData {
  name: string
  lastName: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface NewsPOSTData {
  title: string
  content: string
}

export interface NewsGETData {
  title: string;
  content: string;
  userId: string;
  page: string;
  pageSize: string
}

export interface NewsDELETEData {
  postId: string
}

export interface JWTokenPayload {
  id: string;
  email: string;
  iat: number;
  expire: number;
}