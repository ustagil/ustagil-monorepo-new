import { FC } from "react";
import { Section } from "../../../../atoms/section";
import { AuthLoginRedirect } from "../../../../molecules/auth/login/redirect";
import { AuthRegisterForm } from "../../../../molecules/auth/register/form";

export interface AuthRegisterSectionProps {}

export const AuthRegisterSection: FC<AuthRegisterSectionProps> = () => {
  return (
    <Section id="auth-register-section">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-xl ">
          <div className="p-4 rounded shadow bg-gray-50">
            <AuthRegisterForm key="RegisterForm" />
          </div>
          <div className="p-4 mt-5 rounded shadow bg-gray-50">
            <AuthLoginRedirect />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AuthRegisterSection;
