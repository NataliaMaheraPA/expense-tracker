export default function Footer() {
  return (
    <footer className='py-4'>
      <div className='container flex flex-col items-center justify-between gap-x-3 gap-y-1 text-center text-sm text-muted-foreground sm:flex-row'>
        <p>
          Next shadcn &copy;{new Date().getFullYear()}. All rights reserved.
        </p>
        <p className='text-xs'>
          Developed by <span className='text-primary transition-colors hover:text-accent-foreground'>NM_nice_Dev</span>
        </p>
      </div>
    </footer>
  )
}
