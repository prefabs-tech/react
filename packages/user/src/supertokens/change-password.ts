import client from "@/api/axios";

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  apiBaseUrl: string,
) => {
  try {
    const response = await client(apiBaseUrl).post(
      "/change_password",
      { newPassword, oldPassword },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return {
      message: errorMessage,
      status: "ERROR",
    };
  }
};
