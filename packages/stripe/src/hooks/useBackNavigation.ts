import { useNavigate } from "react-router-dom";

export const useBackNavigation = (onBack?: () => void) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    }

    navigate("/");
  };

  return { handleBack };
};
