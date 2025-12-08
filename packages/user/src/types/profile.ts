import { UserType } from "./types";

export interface UpdateProfileInput {
  email: string;
  givenName: string;
  surname: string;
}

export type UpdateProfileResponse = { data: UserType };
