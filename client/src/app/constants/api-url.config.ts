import { environment } from "src/environments/environment";


export const baseUrl = environment.apiUrl;


// tslint:disable-next-line:no-namespace
export namespace ApiPath {
  export const LOGIN = `${baseUrl}/login`;
}
