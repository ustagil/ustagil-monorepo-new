import React, { FC, FunctionComponentElement } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { NextLink } from '../..'

export interface SidebarItemProps {
  href: string
  title: string
  collapsed: boolean
  Icon: FunctionComponentElement<IconBaseProps>
  selected?: boolean
}

export const SidebarItem: FC<SidebarItemProps> = ({
  href,
  title,
  collapsed,
  Icon,
  selected = false,
}) => (
  <NextLink
    href={href}
    className={`block py-2 hover:bg-primary-500 hover:text-background 
    ${collapsed ? 'px-3' : 'pl-3 pr-14'}
    ${selected ? 'text-primary-400 ' : ''}`}
  >
    <div className="flex items-center">
      {React.cloneElement(Icon, { size: 24 })}
      {!collapsed && <span className="ml-2">{title}</span>}
    </div>
  </NextLink>
)

export default SidebarItem
