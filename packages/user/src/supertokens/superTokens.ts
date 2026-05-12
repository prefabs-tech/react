import SuperTokens from "supertokens-web-js";
import EmailVerification from "supertokens-web-js/recipe/emailverification";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { SUPERTOKENS_API_BASE_PATH_DEFAULT } from "@/constants";
import { UserConfig } from "@/types/config";

export const superTokens = (config: UserConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recipeLists: Array<any> = [
    Session.init(config?.supertokens?.sessionConfig),
    ThirdPartyEmailPassword.init(
      config?.supertokens?.thirdPartyEmailPasswordConfig,
    ),
  ];

  if (config.features?.emailVerification) {
    recipeLists.push(EmailVerification.init());
  }

  SuperTokens.init({
    appInfo: {
      apiBasePath:
        config.supertokens.apiBasePath || SUPERTOKENS_API_BASE_PATH_DEFAULT,
      apiDomain: config.supertokens.apiDomain,
      appName: config.supertokens.appName,
    },
    recipeList: recipeLists,
  });
};
