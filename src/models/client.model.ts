export interface Client {
  active: boolean;
  authorities: string[];
  email: string;
  familialSituation: string;
  firstname: string;
  identityCode: string;
  identityType: string;
  lastname: string;
  phoneNumber: string;
  sexe: string;
  username: string;
  userPicture: string;
}

export interface Administrator {
  active: boolean;
  authorities: string[];
  email: string;
  familialSituation: string;
  firstname: string;
  identityCode: string;
  identityType: string;
  lastname: string;
  phoneNumber: string;
  sexe: string;
  username: string;
  userPicture: string;
}
