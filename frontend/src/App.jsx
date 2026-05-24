import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


function App() {
  const [DNAtext, setDNAtext] = useState("")


  return (
    <div className='h-screen w-screen bg-[#CCE0FF]'>
      <h1 className='text-6xl font-bold text-[#000E24]'>Finding Promoters</h1>

      <p className='text-[#001433]'> Determines if a sequence of DNA is a promoter or non-promoter.</p>

      <div>
        <textarea className='bg-white text-[#001433] border border-[#001433] rounded-md p-2 w-96 h-48 resize-none' value={DNAtext} onChange={(e) => setDNAtext(e.target.value)}></textarea>
      </div>
      <button
      onClick={() => {
        console.log(DNAtext)
      }}
      className='bg-[#0052CC] text-[#E5F0FF] font-bold py-2 px-4 rounded'
      >

        Predict
      </button>
 
      <p className='text-[#001433]'>Examples: TTGACA, TAATACGACTCACTATAGGGAGA, GTTGACATTGATTATTGACTAGTTATTAATAGTAATCAATTACGGGGTCATTAGTTCATAGCCCATATATGGAGTTCCGCGTTACATAACTTACGGTAAAT</p>
    </div>
  )
}

export default App
