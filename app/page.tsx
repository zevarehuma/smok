'use client'
import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Car, CreditCard, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [plate, setPlate] = useState('')
  const [vClass, setVClass] = useState('class1')
  const [section, setSection] = useState('north')
  const baseByClass: Record<string, number> = { class1: 3.1, class2: 4.7, class3: 6.1 }
  const mulBySection: Record<string, number> = { north: 1.0, west: 1.15, south: 1.25 }
  const amount = useMemo(() => ((baseByClass[vClass] ?? 3.1) * (mulBySection[section] ?? 1)).toFixed(2), [vClass, section])

  const [axles, setAxles] = useState<number | ''>(2)
  const [distance, setDistance] = useState<number | ''>(10)
  const total = useMemo(() => {
    const base = 3.1
    const a = typeof axles === 'number' ? axles : 2
    const d = typeof distance === 'number' ? distance : 10
    return (base + (a - 2) * 0.9 + Math.max(0, d - 10) * 0.08).toFixed(2)
  }, [axles, distance])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className='min-h-screen'>
      <header className='sticky top-0 z-50 border-b border-teal-300/20 bg-[#0b1221]/70 backdrop-blur'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
          <div className='flex items-center gap-3'>
            <div className='grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-teal-300 text-slate-900 font-extrabold'>M</div>
            <div className='text-lg font-bold tracking-wide'>M50 Dublin</div>
          </div>
          <nav className='hidden items-center gap-6 text-slate-200/90 lg:flex'>
            <a href='#tariffs' className='hover:text-white'>Tariffs</a>
            <a href='#how' className='hover:text-white'>How it works</a>
            <a href='#faq' className='hover:text-white'>FAQ</a>
            <a href='#contact' className='hover:text-white'>Contact</a>
            <Button>Pay toll</Button>
          </nav>
          <Button variant='outline' className='lg:hidden' onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X className='h-5 w-5'/> : <Menu className='h-5 w-5'/>}</Button>
        </div>
        {menuOpen && (
          <div className='mx-auto max-w-6xl px-4 pb-4 lg:hidden'>
            <Card>
              <CardContent className='flex flex-col gap-3 pt-4'>
                <a href='#tariffs' onClick={() => setMenuOpen(false)}>Tariffs</a>
                <a href='#how' onClick={() => setMenuOpen(false)}>How it works</a>
                <a href='#faq' onClick={() => setMenuOpen(false)}>FAQ</a>
                <a href='#contact' onClick={() => setMenuOpen(false)}>Contact</a>
                <Button onClick={() => setMenuOpen(false)}>Pay toll</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </header>

      <section className='relative overflow-hidden'>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-12 lg:grid-cols-2'>
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className='inline-flex items-center gap-2 rounded-full border border-teal-300/30 px-3 py-1 text-sm text-slate-300'>
                <Car className='h-4 w-4'/> Online payment · 24/7
              </span>
              <h1 className='mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl font-extrabold'>
                Barrier‑free toll road — fast, convenient, transparent
              </h1>
              <p className='mt-3 max-w-prose text-slate-300'>
                Pay your trip online by license plate. Check your trip history and current tariffs.
              </p>
              <div className='mt-5 flex flex-wrap gap-3'>
                <Button onClick={() => document.getElementById('pay')?.scrollIntoView({ behavior: 'smooth'})}>Pay now</Button>
                <Button variant='outline' onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth'})}>How it works</Button>
              </div>
              <div className='mt-6 grid grid-cols-3 gap-3'>
                {[
                  { v: '2 min', l: 'avg. payment time' },
                  { v: '0', l: 'queues & barriers' },
                  { v: '24/7', l: 'support' },
                ].map((k, i) => (
                  <Card key={i} className='text-center'>
                    <CardContent className='pt-6'>
                      <div className='text-2xl font-extrabold'>{k.v}</div>
                      <div className='text-slate-300'>{k.l}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle id='pay'>Quick payment</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div>
                  <label className='text-sm text-slate-300'>License plate</label>
                  <Input placeholder='AA1234BB' value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} />
                </div>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  <div>
                    <label className='text-sm text-slate-300'>Vehicle class</label>
                    <Select
                      value={vClass}
                      onChange={(v) => setVClass(v)}
                      options={[
                        { value: 'class1', label: 'Passenger car' },
                        { value: 'class2', label: 'SUV / minivan' },
                        { value: 'class3', label: 'Truck' },
                      ]}
                    />
                  </div>
                  <div>
                    <label className='text-sm text-slate-300'>Section</label>
                    <Select
                      value={section}
                      onChange={(v) => setSection(v)}
                      options={[
                        { value: 'north', label: 'North' },
                        { value: 'west', label: 'West' },
                        { value: 'south', label: 'South' },
                      ]}
                    />
                  </div>
                </div>
                <div className='flex items-end gap-3'>
                  <div className='text-4xl font-extrabold'>€{amount}</div>
                  <div className='text-slate-300'>estimated price</div>
                </div>
                <Button onClick={() => alert('Stripe checkout goes here (placeholder).')}>
                  <CreditCard className='mr-2 h-5 w-5'/> Proceed to payment
                </Button>
                <p className='text-xs text-slate-400'>Payment is simulated for this demo. Connect Stripe Checkout or your PSP.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id='tariffs' className='mx-auto max-w-6xl px-4 py-10'>
        <h3 className='mb-4 text-2xl font-semibold'>Tariffs</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {[
            { title: 'Passenger cars', note: '06:00–22:00', price: '€3.10' },
            { title: 'Commercial (≤3.5t)', note: '', price: '€4.70' },
            { title: 'Trucks (>3.5t)', note: '', price: '€6.10' },
          ].map((t) => (
            <Card key={t.title}>
              <CardContent className='pt-6'>
                <div className='text-lg font-semibold'>{t.title}</div>
                <div className='text-slate-300'>{t.note}</div>
                <div className='mt-2 flex items-end gap-2'><span className='text-4xl font-extrabold'>{t.price}</span><span className='text-slate-300'>per trip</span></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='mt-4 rounded-xl border border-teal-300/30 bg-teal-400/10 p-4 text-sm text-slate-200'>
          All prices are placeholders. Replace with your official tariffs and legal information.
        </div>
      </section>

      <section id='how' className='mx-auto max-w-6xl px-4 py-10'>
        <h3 className='mb-4 text-2xl font-semibold'>How it works</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {[
            { n: 1, t: 'Cameras read plates', d: 'Automatic recognition at entries. No stopping.' },
            { n: 2, t: 'Pay online', d: 'Enter plate and pay with card or Apple/Google Pay.' },
            { n: 3, t: 'Trip confirmed', d: 'Receipt via email/SMS. History in your account.' },
          ].map((s) => (
            <Card key={s.n}>
              <CardContent className='pt-6'>
                <div className='text-sm text-slate-300'>Step {s.n}</div>
                <div className='text-lg font-semibold'>{s.t}</div>
                <div className='text-slate-300'>{s.d}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-10'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Card>
            <CardHeader><CardTitle>Cost calculator</CardTitle></CardHeader>
            <CardContent className='space-y-3'>
              <p className='text-slate-300'>Rough estimate; final cost depends on class and section.</p>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div>
                  <label className='text-sm text-slate-300'>Axles</label>
                  <Input type='number' min={2} value={axles} onChange={(e) => setAxles(e.target.value === '' ? '' : Number(e.target.value))} placeholder='e.g. 2'/>
                </div>
                <div>
                  <label className='text-sm text-slate-300'>Distance (km)</label>
                  <Input type='number' min={0} value={distance} onChange={(e) => setDistance(e.target.value === '' ? '' : Number(e.target.value))} placeholder='e.g. 12'/>
                </div>
              </div>
              <div className='rounded-xl border border-white/10 bg-white/5 p-3 text-sm'>
                <div className='flex flex-wrap gap-3'>
                  <span className='inline-flex items-center gap-2 rounded-lg border border-dashed border-teal-300/50 px-3 py-2'>Base: <strong>€3.10</strong></span>
                  <span className='inline-flex items-center gap-2 rounded-lg border border-dashed border-teal-300/50 px-3 py-2'>Total: <strong>€{total}</strong></span>
                </div>
              </div>
              <Button variant='outline'>Recalculate</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>{/* Map */}
<Card>
  <CardHeader><CardTitle>Map</CardTitle></CardHeader>
  <CardContent>
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10" style={{paddingTop:'56.25%'}}>
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.02033952494!2d-6.387264385889454!3d53.324443038602116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e0ddf2fc5b5%3A0x2600c7a819b62b0!2sDublin%2C%20Ireland!5e0!3m2!1sen!2sie!4v1738770000000!5m2!1sen!2sie"
        width="600"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map of Dublin, Ireland"
      />
    </div>
    <p className="mt-3 text-sm text-slate-400">
   
    </p>
  </CardContent>
</Card>
</CardTitle></CardHeader>
            
          </Card>
        </div>
      </section>

      <section id='faq' className='mx-auto max-w-6xl px-4 py-10'>
        <h3 className='mb-4 text-2xl font-semibold'>FAQ</h3>
        <Accordion>
          <AccordionItem>
            <AccordionTrigger>What happens if I miss payment?</AccordionTrigger>
            <AccordionContent>Add your official rules and time limits for late payment.</AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>How do I dispute a penalty?</AccordionTrigger>
            <AccordionContent>Describe the process, contacts, and required documents.</AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Which payment methods are supported?</AccordionTrigger>
            <AccordionContent>Cards, Apple/Google Pay, and local methods via your PSP.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section id='contact' className='mx-auto max-w-6xl px-4 py-10'>
        <h3 className='mb-4 text-2xl font-semibold'>Contact</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Card><CardContent className='pt-6'><div className='font-semibold'>Support</div><div className='text-slate-300'>support@m50-dublin.com</div></CardContent></Card>
          <Card><CardContent className='pt-6'><div className='font-semibold'>Phone</div><div className='text-slate-300'>+353 1 234 5678</div></CardContent></Card>
          <Card><CardContent className='pt-6'><div className='font-semibold'>Address</div><div className='text-slate-300'>Provide your legal address here.</div></CardContent></Card>
        </div>
      </section>

      <footer className='border-t border-white/10 py-6 text-sm text-slate-300'>
        <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4'>
          <div>© {new Date().getFullYear()} M50 Dublin. All rights reserved.</div>
          <a className='opacity-80 hover:opacity-100' href='#'>Privacy policy</a>
        </div>
      </footer>
    </div>
  )
}
