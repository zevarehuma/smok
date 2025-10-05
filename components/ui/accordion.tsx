import * as React from 'react'
export function Accordion({ children }: { children: React.ReactNode }) { return <div className='space-y-3'>{children}</div> }
export function AccordionItem({ children }: { children: React.ReactNode }) { return <details className='glass px-4 py-3 [&_summary]:cursor-pointer'>{children}</details> }
export function AccordionTrigger({ children }: { children: React.ReactNode }) { return <summary className='text-base font-medium'>{children}</summary> }
export function AccordionContent({ children }: { children: React.ReactNode }) { return <div className='mt-2 text-sm text-slate-300'>{children}</div> }
