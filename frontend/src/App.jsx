import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import dnaBg from './assets/dna-bg.png'

function App() {
  const [DNAtext, setDNAtext] = useState("")

  return (
    <div 
      className='min-h-screen w-screen flex flex-col items-center justify-center p-4 bg-[#CCE0FF]'
      style={{ backgroundImage: `url(${dnaBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className='bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 md:p-12 max-w-2xl w-full border border-white/50 relative overflow-hidden'>        
        
        {/* Subtle top border accent */}
        <div className='absolute top-0 left-0 right-0 h-1 bg-[#0052CC]'></div>

        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-[#000E24] tracking-tight mb-4'>
            Finding Promoters
          </h1>
          <p className='text-[#001433] text-lg opacity-80'>
            Determines if a sequence of DNA is a promoter or non-promoter.
          </p>
        </div>

        <div className='mb-8'>
          <label className='block text-xs font-bold text-[#001433] mb-2 uppercase tracking-widest opacity-80 pl-1'>
            Sequence Input
          </label>
          <textarea 
            className='bg-white text-[#001433] border-2 border-[#CCE0FF] rounded-xl p-4 w-full h-40 resize-none focus:outline-none focus:ring-4 focus:ring-[#0052CC]/20 focus:border-[#0052CC] transition-all shadow-inner font-mono text-sm leading-relaxed placeholder-[#CCE0FF]' 
            value={DNAtext} 
            onChange={(e) => setDNAtext(e.target.value)}
            placeholder='Paste the DNA sequence here...'
          ></textarea>
        </div>

        <button
          onClick={() => {
            console.log(DNAtext)
          }}
          className='w-full bg-[#0052CC] hover:bg-[#003D99] text-[#E5F0FF] font-bold py-4 rounded-xl shadow-lg hover:shadow-[#0052CC]/30 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg'
        >
          Classify Sequence
        </button>
 
        <div className='mt-10 p-5 bg-[#CCE0FF]/30 rounded-xl border border-[#CCE0FF]'>
          <h3 className='text-xs font-bold text-[#0052CC] mb-3 uppercase tracking-wider'>Examples</h3>
          <ul className='text-[#001433] text-sm font-mono space-y-2 opacity-90 break-words'>
            <li className='bg-white/50 p-2 rounded'><strong>1.</strong> TTGACA</li>
            <li className='bg-white/50 p-2 rounded'><strong>2.</strong> TAATACGACTCACTATAGGGAGA</li>
            <li className='bg-white/50 p-2 rounded'><strong>3.</strong> GTTGACATTGATTATTGACTAGTTATTAATAGTAATCAATTACGGGGTCATTAGTTCATAGCCCATATATGGAGTTCCGCGTTACATAACTTACGGTAAAT</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
