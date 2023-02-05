import { FC } from 'react'
import { Card, Grid, Section } from '../../../atoms'

export interface CalculatePriceSectionProps {}

export const CalculatePriceSection: FC<CalculatePriceSectionProps> = ({}) => (
  <Section id="calculate-price-section">
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

export default CalculatePriceSection
