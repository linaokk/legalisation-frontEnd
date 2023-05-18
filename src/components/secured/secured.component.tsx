import { FunctionComponent } from "react";
import { useAuthentication } from "../../hooks/authentication.hook";

interface SecuredComponentProps {
  children: JSX.Element;
  oneRole?: string[];
}

const hasAllRoles = (roles: string[], expectedRoles: string[]) => {
  return expectedRoles.every((e) => roles.includes(e));
};

const hasOneRole = (roles: string[], expectedRoles: string[]) => {
  return expectedRoles.some((e) => roles.includes(e));
};

const satisfiedRoles = (
  roles: string[],
  oneOf: string[] | undefined,
  allOf: string[] | undefined
) => {
  if (!oneOf && !allOf) {
    return true;
  }

  if (oneOf && !allOf) {
    return hasOneRole(roles, oneOf);
  }

  if (!oneOf && allOf) {
    return hasAllRoles(roles, allOf);
  }

  return hasOneRole(roles, oneOf || []) && hasAllRoles(roles, allOf || []);
};

export const SecuredComponent: FunctionComponent<SecuredComponentProps> = ({
  children,
  oneRole,
}) => {
  const { roles } = useAuthentication();

  const roleExpectation = oneRole && hasOneRole(roles, oneRole);
  return <>{satisfiedRoles(roles, oneRole, undefined) && children}</>;
};
