
export interface AuthState {
  profile: {
    id: String,
    name: String,
    lastName: String,
    email: String
  },
  logged: Boolean,
  token: string
}

export interface Post {
  _id: string,
  content: string,
  title: string,
  userId: string,
  imageUrl: string
}

export interface NewsState {
  data: Post[]
}

export interface DefaultState {
  auth: AuthState,
  news: NewsState
}

