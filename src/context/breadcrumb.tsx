import React, { useState } from "react";
import { IBreadcrumbProps } from "../types/breadcrumb";
import { useNavigate } from "react-router-dom";

export const BreadcrumbContext = React.createContext<any>(null);

export const BreadcrumbProvider: React.FunctionComponent<IBreadcrumbProps> = ({
  children,
}: IBreadcrumbProps): JSX.Element => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [showBackIcon, setShowBackIcon] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<boolean>(true);
  const [prevPath, setPrevPath] = useState<string>("/");
  return (
    <BreadcrumbContext.Provider
      value={{
        title,
        setTitle,
        showBackIcon,
        setShowBackIcon,
        showTitle,
        setShowTitle,
        prevPath,
        setPrevPath,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
