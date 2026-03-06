import SuperTokens from "supertokens-web-js";
import { PreAndPostAPIHookAction } from "supertokens-web-js/lib/build/recipe/emailpassword/types";
import { CreateRecipeFunction } from "supertokens-web-js/lib/build/types";
import EmailVerification from "supertokens-web-js/recipe/emailverification";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { SUPERTOKENS_API_BASE_PATH_DEFAULT } from "@/constants";
import { UserConfig } from "@/types/config";

export const superTokens = (config: UserConfig) => {
  const recipeLists: Array<unknown> = [
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
      appName: config.supertokens.appName,
      apiDomain: config.supertokens.apiDomain,
      apiBasePath:
        config.supertokens.apiBasePath || SUPERTOKENS_API_BASE_PATH_DEFAULT,
    },
    recipeList: recipeLists as Array<
      CreateRecipeFunction<PreAndPostAPIHookAction>
    >,
  });
};
