import { InputField, NextLink } from "@ui/atom";
import { Button } from "@ui/molecule";
import { WEB_APP_DOMAINS } from "@ustagil/constant";
import Image from "next/image";
import { FC } from "react";
import { useForm } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CommonFooterProps {}

type IFormValues = {
  email: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
  });

  return (
    <div>
      <span className="block font-semibold">Bültenimize Kayıt Ol</span>
      <span className="block">Ratione et omnis autem occaecati et.</span>
      <form onSubmit={onSubmit}>
        <InputField
          {...register("email")}
          id="subscribe-email"
          label="E-Posta"
          placeholder=""
          type="email"
          autoComplete="email"
        />
        <Button variant="contained" fullWidth title="Abone Ol" />
      </form>
      <span className="mr-4 font-semibold">Takip Et:</span>
      <div className="flex">Social Icons</div>
    </div>
  );
};

const CopyRight: FC = () => (
  <div className="flex items-center justify-between">
    <span className="">Bu website EsLab Coop&apos;a aittir.</span>
    <NextLink href="/" className="focus:outline-none">
      <Image
        src="https://via.placeholder.com/200x50.webp?text=Logo+EsLab+Coop"
        width={200}
        height={50}
        alt="Logo EsLab Coop"
      />
    </NextLink>
  </div>
);

const LinksList: FC<{
  title: string;
  links: { label: string; href: string }[];
}> = ({ title, links }) => (
  <div className="">
    <span className="block px-1 mb-6 text-lg font-semibold">{title}</span>
    {links.map(({ href, label }) => (
      <NextLink
        key={`label-${label}`}
        href={href}
        className="block px-1 py-2 text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75"
      >
        {label}
      </NextLink>
    ))}
  </div>
);

const Links: FC = () => (
  <div className="grid w-full grid-cols-2 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
    <LinksList
      title="Kurumsal"
      links={[
        { label: "Hakkımızda", href: "/company/about-us" },
        { label: "İnsan Kaynakları", href: "/company/human-resources" },
        { label: "İletişim", href: "/company/contact" },
      ]}
    />
    <LinksList
      title="Ustagil Products"
      links={[
        { label: "Account", href: WEB_APP_DOMAINS.account },
        { label: "Accounting", href: WEB_APP_DOMAINS.accounting },
        { label: "Blog", href: WEB_APP_DOMAINS.blog },
        { label: "Call Center", href: WEB_APP_DOMAINS.callcenter },
        { label: "Cargo Manager", href: WEB_APP_DOMAINS.cargomanager },
        { label: "Documentations", href: WEB_APP_DOMAINS.docs },
        { label: "Next App", href: WEB_APP_DOMAINS.nextapp },
        { label: "School Manager", href: WEB_APP_DOMAINS.schoolmanager },
        { label: "Storage Manager", href: WEB_APP_DOMAINS.storagemanager },
        { label: "Task Manager", href: WEB_APP_DOMAINS.taskmanager },
      ]}
    />
  </div>
);

export const CommonFooter: FC<CommonFooterProps> = () => (
  <footer className="pb-[72px] lg:pb-0 prose dark:prose-invert max-w-none prose-a:no-underline">
    <div className="border-t border-gray-300">
      <div className="container flex px-8 py-6 mx-auto">
        <div className="xl:w-8/12 md:w-12/12 sm:w-12/12 w-12/12">
          <Links />
        </div>
        <div className="xl:w-4/12 md:w-12/12 sm:w-12/12 w-12/12">
          <Contact />
        </div>
      </div>
    </div>
    <div className="border-t border-gray-300">
      <div className="container px-8 py-6 mx-auto">
        <CopyRight />
      </div>
    </div>
  </footer>
);

export default CommonFooter;
