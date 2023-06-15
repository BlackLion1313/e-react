interface User {
  userName: string;
  email: string;
  avatar: string;
}
 

interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}
interface LoginCredentials {

  email: string;
  password: string;

}interface FetchLoginResult {
  msg: string;
  user: User;
  token: string;
}
interface FetchError {
  error: string;
}

type ResponseError = string | null;

