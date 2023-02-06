import {
  useIntegrationEmailsCheckIntegration,
  useIntegrationEmailStore,
} from "@acme/state";
import { FC, useState } from "react";
import { VscInfo } from "react-icons/vsc";
import { NextLink, Section } from "../../../../../atoms";
import { Button, IntegrationAddSelectCard } from "../../../../../molecules";

// import slackSVGIcon from '/assets/Slack_icon_2019.svg'

type IntegrationApp = {
  appId: string;
  appName: string;
  appIcon: string;
  appIconAlt: string;
};

const apps: IntegrationApp[] = [
  {
    appIcon: "slackSVGIcon",
    appIconAlt: "Slack SVG Icon",
    appId: "slack",
    appName: "Slack",
  },
  {
    appIcon: "slackSVGIcon",
    appIconAlt: "Discord SVG Icon",
    appId: "discord",
    appName: "Discord",
  },
];

export interface IntegrationAddSelectSectionProps {}

export const IntegrationAddSelectSection: FC<
  IntegrationAddSelectSectionProps
> = ({}) => {
  const { selectedApp, setSelectedApp } = useIntegrationEmailStore((state) => ({
    selectedApp: state.selectedApp,
    setSelectedApp: state.setSelectedApp,
  }));

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const integrationEmailsCheckIntegrationMutation =
    useIntegrationEmailsCheckIntegration({
      onMutate: () => setLoading(true),
      onSuccess: () => {
        setChecked(true);
        setLoading(false);
      },
      onError: () => {
        setChecked(true);
        setLoading(false);
      },
    });

  return (
    <Section id="integration-add-select-section">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        {apps.map((app) => (
          <IntegrationAddSelectCard
            key={app.appId}
            appIcon={app.appIcon}
            appIconAlt={app.appIconAlt}
            appId={app.appId}
            appName={app.appName}
            onClick={setSelectedApp}
          />
        ))}
      </div>
      <div className="">
        {!selectedApp && (
          <div className="">Please select an application to integrate.</div>
        )}
        {selectedApp && (
          <>
            <div className="flex items-center">
              <div className="">Selected App: {selectedApp}</div>
              <div className="ml-2">
                <VscInfo />
              </div>
            </div>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo enim
              voluptates repudiandae consectetur voluptatem recusandae tenetur.
              Impedit quasi dolore atque error, earum esse. Vitae a praesentium
              quaerat illo, temporibus excepturi?
            </p>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo enim
              voluptates repudiandae consectetur voluptatem recusandae tenetur.
              Impedit quasi dolore atque error, earum esse. Vitae a praesentium
              quaerat illo, temporibus excepturi?
            </p>
          </>
        )}
        <div className="flex gap-3">
          <Button
            variant="outlined"
            title="Check Integration"
            disabled={!selectedApp}
            loading={loading}
            onClick={() => {
              if (!selectedApp) return;
              integrationEmailsCheckIntegrationMutation.mutate({
                body: { app: selectedApp },
                params: {},
                query: {},
              });
            }}
          />
          <NextLink href="/integrations/summarize" legacyBehavior>
            <Button
              variant="flat"
              title="Next"
              // disabled={!integrationEmailCheckMutation.isSuccess}
              disabled={!checked}
            />
          </NextLink>
        </div>
      </div>
    </Section>
  );
};

export default IntegrationAddSelectSection;
