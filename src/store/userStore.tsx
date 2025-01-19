"use client";

import { submissions } from "@/components/SetSession";
import { formType } from "@/types/types";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface UserContextType {
  formBuilderData: formType;
  setFormBuilderData: React.Dispatch<SetStateAction<formType>>;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  formSubmission: submissions[];
  setFormSubmission: React.Dispatch<SetStateAction<submissions[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formBuilderData, setFormBuilderData] = React.useState<formType>({
    form_title: "Untitled Form",
    questions: [],
  });
  const [formSubmission, setFormSubmission] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const value = useMemo(
    () => ({
      formSubmission,
      setFormSubmission,
      scrollRef,
      formBuilderData,
      setFormBuilderData,
    }),
    [formBuilderData, formSubmission]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, useUserContext };
