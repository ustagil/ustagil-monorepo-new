import { FC } from "react";
import { Section } from "../../../../atoms/section";
import { AuthVerifyEmailForm } from "../../../../molecules/auth/verify-email/form";

export interface AuthVerifyEmailSectionProps {}

export const AuthVerifyEmailSection: FC<AuthVerifyEmailSectionProps> = () => {
  return (
    <Section id="auth-verify-email-section">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-xl ">
          <div className="p-4 rounded shadow bg-gray-50">
            <AuthVerifyEmailForm key="VerifyEmailForm" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AuthVerifyEmailSection;
