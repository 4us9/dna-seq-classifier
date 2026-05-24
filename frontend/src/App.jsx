import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


function App() {
  const [DNAtext, setDNAtext] = useState("")


  return (
    <>
      <h1>Finding Promoters</h1>

      <p> Determines if a sequence of DNA is a promoter or non-promoter.</p>

      <div>
        <textarea className='bg-black'></textarea>
      </div>
      <button
      onClick={() => {
        console.log(DNAtext)
      }}>

        Predict
      </button>
 
      <p>Examples: TTGACA, TAATACGACTCACTATAGGGAGA, GTTGACATTGATTATTGACTAGTTATTAATAGTAATCAATTACGGGGTCATTAGTTCATAGCCCATATATGGAGTTCCGCGTTACATAACTTACGGTAAAT</p>
    </>
  )
}

export default App
