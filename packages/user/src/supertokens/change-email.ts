import client from "@/api/axios";

export const changeEmail = async (email: string, apiBaseUrl: string) => {
  try {
    const response = await client(apiBaseUrl).post(
      "/change-email",
      { email },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      error.response
    ) {
      const { data } = error.response as { data: Record<string, string> };

      return { status: data.status, message: data.message };
    }

    return { status: "ERROR", message: "Oops! Something went wrong" };
  }
};
