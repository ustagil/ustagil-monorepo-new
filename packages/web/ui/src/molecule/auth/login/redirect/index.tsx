import { NextLink } from "@ui/atom";
import { FC } from "react";
import { Button } from "../../../common/button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthLoginRedirectProps {}

export const AuthLoginRedirect: FC<AuthLoginRedirectProps> = () => (
  <div className="flex flex-col lg:flex-row lg:justify-end lg:items-center">
    <div className="mb-3 lg:mr-3 lg:mb-0">
      <span className="text-sm text-gray-500">
        Halihazırda üyeliğiniz var mı ? Ayrıcalığınıza erişmek için giriş yapın.
      </span>
    </div>
    <div className="w-full lg:w-auto">
      <NextLink href="/" passHref className="focus:outline-none">
        <Button variant="outlined" fullWidth title="Giriş Yap" />
      </NextLink>
    </div>
  </div>
);

export default AuthLoginRedirect;
