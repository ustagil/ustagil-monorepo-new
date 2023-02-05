import { FC } from 'react'
import { Card, Grid, Section } from '../../../atoms'

export interface UserSettingSectionProps {}

export const UserSettingSection: FC<UserSettingSectionProps> = ({}) => (
  <Section id="user-setting-section">
    <Grid>
      <Card>
        <div className="">
          <span>Lorem</span>
        </div>
        <div className="">
          <span>132135132</span>
        </div>
      </Card>
    </Grid>
  </Section>
)

export default UserSettingSection
