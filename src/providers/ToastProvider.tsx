import React, { createContext, useState, useCallback } from "react";

import { IToast } from "app/view/components/shared/toast/Toast.types";
import ToastContainer from "app/view/components/shared/toast-container/ToastContainer";

interface IToastProvider {
  children: React.ReactNode;
}

interface IToastContext {
  addToast: (message: IToast) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback(({ id, message, type }: IToast) => {
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
