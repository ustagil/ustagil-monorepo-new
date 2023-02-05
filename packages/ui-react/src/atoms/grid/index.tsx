import { FC, ReactNode } from 'react'

export interface GridProps {
  children: ReactNode
}

export const Grid: FC<GridProps> = ({ children }) => (
  <div className="grid grid-cols-4 gap-4">{children}</div>
)

export default Grid
