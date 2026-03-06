import { SessionClaim } from "supertokens-web-js/lib/build/recipe/session";

interface Response {
  gracePeriodEndsAt?: number;
  isVerified: boolean;
}

export class ProfileValidationClaim implements SessionClaim<Response> {
  public static defaultMaxAgeInSeconds: number | undefined = undefined;
  public static id = "profileValidation";

  constructor() {
    /* empty */
  }

  getLastFetchedTime(): number | undefined {
    return undefined;
  }

  getValueFromPayload(
    payload: Record<string, Record<string, unknown>>,
  ): Response | undefined {
    return payload[ProfileValidationClaim.id] !== undefined
      ? (payload[ProfileValidationClaim.id]?.v as Response)
      : undefined;
  }

  async refresh(): Promise<void> {
    /* empty */
  }
}
