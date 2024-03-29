import { NextLink } from "@ui/atom";
import { FC } from "react";
import { Button } from "../../../common/button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthRegisterRedirectProps {}

export const AuthRegisterRedirect: FC<AuthRegisterRedirectProps> = () => (
  <div className="flex flex-col lg:flex-row lg:justify-end lg:items-center ">
    <div className="mb-3 lg:mr-3 lg:mb-0">
      <span className="text-sm text-gray-500">
        Üyeliğiniz yok mu ? Üyelerimize sağlanan ayrıcalıklardan yararlanmak
        için üye olun.
      </span>
    </div>
    <div className="w-full lg:w-auto">
      <NextLink href="/auth/register" passHref className="focus:outline-none">
        <Button variant="outlined" fullWidth title="Üye Ol" />
      </NextLink>
    </div>
  </div>
);

export default AuthRegisterRedirect;
