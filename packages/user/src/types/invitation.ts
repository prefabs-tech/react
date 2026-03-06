import { ErrorResponse } from "./types";

export interface InvitationPayload {
  email: string;
  role: string;
  appId?: number;
}

export interface Invitation {
  acceptedAt: number | null;
  appId: number;
  createdAt: number;
  email: string;
  expiresAt: number;
  id: number;
  invitedById: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  revokedAt: number | null;
  role: string;
  token?: string;
  updatedAt: number;
}

export interface InvitationRoleOption {
  name: string;
  id: number;
}

export interface InvitationAppOption {
  id: number;
  name: string;
  origin: string;
  supportedRoles: InvitationRoleOption[];
  label?: string;
}

export interface InvitationExpiryDateField {
  display: boolean;
  mode: "calendar" | "input";
}

export interface InvitationFormInput {
  email: string;
  role: string;
  app?: number;
  expiresAt?: Date | null;
  [key: string]: unknown;
}

export type AddInvitationResponse = Invitation | ErrorResponse;

export type DeleteInvitationResponse = Invitation | ErrorResponse;

export type ResendInvitationResponse = Invitation | ErrorResponse;

export type RevokeInvitationResponse = Invitation | ErrorResponse;

export type GetInvitationResponse = Invitation | ErrorResponse;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AcceptInvitationResponse = any | ErrorResponse;
