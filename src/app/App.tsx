import { AuthProvider } from "providers/AuthProvider";
import { ToastProvider } from "providers/ToastProvider";
import AppRoute from "./view/components/app-route/AppRoute";

import "../styles/globalStyles.scss";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoute />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
