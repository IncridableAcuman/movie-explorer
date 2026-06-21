export interface UserDto {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  accessToken: string;
  refreshToken?: string;
  user: {
    accessToken:string;
    dto: UserDto;
  };
}