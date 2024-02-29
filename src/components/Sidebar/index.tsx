'use client'
import {
  Home,
  Menu,
} from 'lucide-react'
import Link from 'next/link';

import { NavItem } from './NavItem'
import { Logo } from './Logo'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Button } from '../Button'
import { twMerge } from 'tailwind-merge'

export function Sidebar() {
  return (
    <Collapsible.Root
      className={twMerge(
        'fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 border-b border-zinc-200 bg-white p-4',
        'data-[state=open]:bottom-0',
        'lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:bottom-0',
        'dark:border-zinc-800 dark:bg-zinc-900',
      )}
    >
      <div className="flex items-center justify-between">
        <Logo />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-1 animate-slideDownAndFade flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >

        <nav className="space-y-0.5">
        <Link href="/">
          <NavItem title="Home" icon={Home} />
        </Link>
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
