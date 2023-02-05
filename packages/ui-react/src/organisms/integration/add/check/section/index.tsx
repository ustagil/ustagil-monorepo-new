import {
  useIntegrationEmailsCheck,
  useIntegrationEmailsGetNew,
  useIntegrationEmailStore,
} from '@acme/state'
import { FC, useState } from 'react'
import { NextLink, Section } from '../../../../../atoms'
import { Button } from '../../../../../molecules'

export interface IntegrationAddCheckSectionProps {}

export const IntegrationAddCheckSection: FC<
  IntegrationAddCheckSectionProps
> = ({}) => {
  const { email, setIntegrationEmail } = useIntegrationEmailStore(state => ({
    email: state.integrationEmail,
    setIntegrationEmail: state.setIntegrationEmail,
  }))
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const integrationEmailQuery = useIntegrationEmailsGetNew({
    variables: { body: {}, params: {}, query: {} },
    onSuccess(data) {
      setIntegrationEmail(data.datas)
    },
  })

  const integrationEmailCheckMutation = useIntegrationEmailsCheck({
    onMutate: () => setLoading(true),
    onSuccess: () => {
      setChecked(true)
      setLoading(false)
    },
    onError: () => {
      setChecked(true)
      setLoading(false)
    },
  })

  return (
    <Section id="integration-add-check-section">
      <p>Email: {email}</p>
      <div className="flex gap-3">
        <Button
          variant="outlined"
          title="Check"
          loading={loading}
          onClick={() => {
            if (!email) return
            integrationEmailCheckMutation.mutate({
              body: { email },
              params: {},
              query: {},
            })
          }}
        />
        <NextLink href="/integrations/select" legacyBehavior>
          <Button
            variant="flat"
            title="Next"
            // disabled={!integrationEmailCheckMutation.isSuccess}
            disabled={!checked}
          />
        </NextLink>
      </div>
    </Section>
  )
}

export default IntegrationAddCheckSection
