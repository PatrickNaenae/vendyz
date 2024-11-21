"use client";

import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Template({ children }: LayoutProps) {
  return <StoreProvider>{children}</StoreProvider>;
}
