import {
  AcceptInvitationResponse,
  AddInvitationResponse,
  GetInvitationResponse,
  LoginCredentials,
  ResendInvitationResponse,
  RevokeInvitationResponse,
} from "@/types";
import { DeleteInvitationResponse } from "@/types/invitation";

import client from "../axios";

export const addInvitation = async (
  invitationData: Record<string, unknown>,
  apiBaseUrl: string,
): Promise<AddInvitationResponse> => {
  const response = await client(apiBaseUrl).post(
    "/invitations",
    invitationData,
    {
      withCredentials: true,
    },
  );

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};

export const resendInvitation = async (
  id: number,
  apiBaseUrl: string,
): Promise<ResendInvitationResponse> => {
  const response = await client(apiBaseUrl).post(
    `invitations/resend/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};

export const revokeInvitation = async (
  id: number,
  apiBaseUrl: string,
): Promise<RevokeInvitationResponse> => {
  const response = await client(apiBaseUrl).put(
    `invitations/revoke/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};

export const getInvitationByToken = async (
  token: string,
  apiBaseUrl: string,
): Promise<GetInvitationResponse> => {
  const response = await client(apiBaseUrl).get(`invitations/token/${token}`);

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};

export const acceptInvitation = async (
  token: string,
  credential: LoginCredentials,
  apiBaseUrl: string,
): Promise<AcceptInvitationResponse> => {
  const response = await client(apiBaseUrl).post(
    `invitations/token/${token}`,
    credential,
    {
      withCredentials: true,
    },
  );

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};

export const deleteInvitation = async (
  id: number,
  apiBaseUrl: string,
): Promise<DeleteInvitationResponse> => {
  const response = await client(apiBaseUrl).delete(`invitations/${id}`);

  if (response.data.status === "ERROR") {
    throw new Error(response.data.message);
  } else {
    return response.data;
  }
};
