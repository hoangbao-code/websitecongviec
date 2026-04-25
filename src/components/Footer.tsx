import { Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center py-4 px-6 glass rounded-2xl">
        <div className="text-[11px] text-stone-500 text-center sm:text-left">
          Support:{' '}
          <a href="tel:+18001234567" className="font-bold text-rose-900 font-mono hover:underline">
            +1 (800) 123-4567
          </a>
        </div>
        <div className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Nailed Artistry Global
        </div>
        <div className="flex justify-center sm:justify-end gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-900 hover:text-rose-700 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-900 hover:text-rose-700 transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
