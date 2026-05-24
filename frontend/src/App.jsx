import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [DNAtext, setDNAtext] = useState(0)

  return (
    <>
      <h1>Finding Promoters</h1>

      <p> Determines if a sequence of DNA is a promoter or non-promoter.</p>
      
      <textarea> </textarea>

      <p>Examples: TTGACA, TAATACGACTCACTATAGGGAGA, GTTGACATTGATTATTGACTAGTTATTAATAGTAATCAATTACGGGGTCATTAGTTCATAGCCCATATATGGAGTTCCGCGTTACATAACTTACGGTAAAT</p>
    </>
  )
}

export default App
