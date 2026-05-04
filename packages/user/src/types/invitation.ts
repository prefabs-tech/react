import { ErrorResponse } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AcceptInvitationResponse = any | ErrorResponse;

export type AddInvitationResponse = ErrorResponse | Invitation;

export type DeleteInvitationResponse = ErrorResponse | Invitation;

export type GetInvitationResponse = ErrorResponse | Invitation;

export interface Invitation {
  acceptedAt: null | number;
  appId: number;
  createdAt: number;
  email: string;
  expiresAt: number;
  id: number;
  invitedById: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  revokedAt: null | number;
  role: string;
  token?: string;
  updatedAt: number;
}

export interface InvitationAppOption {
  id: number;
  label?: string;
  name: string;
  origin: string;
  supportedRoles: InvitationRoleOption[];
}

export interface InvitationExpiryDateField {
  display: boolean;
  mode: "calendar" | "input";
}

export interface InvitationPayload {
  appId?: number;
  email: string;
  role: string;
}

export interface InvitationRoleOption {
  id: number;
  name: string;
}

export type ResendInvitationResponse = ErrorResponse | Invitation;

export type RevokeInvitationResponse = ErrorResponse | Invitation;
