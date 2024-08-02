import { environment } from "src/environments/environment";

export const baseUrl = environment.apiUrl;

export namespace ApiPath {
  export const LOGIN = `${baseUrl}/auth/login`;
  export const CREATE_APP = `${baseUrl}/auth/createApp`;
}
