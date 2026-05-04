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
    /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    if (err.response) {
      const { data } = err.response;

      return { message: data.message, status: data.status };
    }

    return { message: "Oops! Something went wrong", status: "ERROR" };
  }
};
