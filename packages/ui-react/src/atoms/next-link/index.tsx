import Link, { LinkProps } from 'next/link'
import { FC } from 'react'

export interface NextLinkProps extends LinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

/**
 * Standard way of using the Next's `Link` tag together with the `a` tag
 */
export const NextLink: FC<NextLinkProps> = ({
  href,
  className,
  children,
  ...rest
}) => (
  <Link href={href} {...rest} className={className}>
    {children}
  </Link>
)

export default NextLink
