import { Section } from "@@/atom";
import { AuthLoginRedirect, AuthRegisterForm } from "@@/molecule";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
