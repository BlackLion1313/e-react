interface User {
  userName: string;
  email: string;
  avatar: string;
}
type Token = string | null;
interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

interface FetchFileUploadResult {
  avatar: string;
}

// interface FetchRegisterResult {

// }

interface LoginCredentials {
  email: string;
  password: string;
}

interface FetchLoginResult {
  msg: string;
  user: User;
  token: Token;
}

interface FetchError {
  error: string;
}

type ResponseError = string | null;

interface FetchProfileResult {
  user: User;
}
interface Exercise {
  _id: string;
  exerciseId: number;
  title: string;
  description: string;
  code: string;
  missingWords: string[];
  difficulty: string;
  hints: string[];
  solution: string;
}
