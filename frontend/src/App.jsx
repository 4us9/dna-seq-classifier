import { useState } from 'react'
import dnaBg from './assets/dna-bg.png'


function App() {
  const [DNAtext, setDNAtext] = useState("")
  const [result, setResult] = useState(null)
  const [isClassifying, setIsClassifying] = useState(false)

  const fetchDNAtext = async () => {
    if (!DNAtext.trim()) return;
    setIsClassifying(true);

    fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sequence: DNAtext }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        if (data.detail && Array.isArray(data.detail)) {
          throw new Error(data.detail[0].msg.replace("Value error, ", ""));
        }
        throw new Error("Server error");
      }
      return data;
    }).then((data) => {
      console.log(data)
      setResult(data.prediction)
      setIsClassifying(false)
    }).catch((err) => {
      console.error(err);
      setResult(err.message === "Failed to fetch" ? "Error connecting to server" : "Error: " + err.message);
      setIsClassifying(false)
    })
  }
  
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
            Determines if a 50+ base pair sequence of DNA is a promoter or non-promoter.
          </p>
        </div>

        <div className='mb-8'>
          <div className='flex justify-between items-end mb-2 pl-1 pr-1'>
            <label className='block text-xs font-bold text-[#001433] uppercase tracking-widest opacity-80'>
              Sequence Input
            </label>
            <span className='text-[10px] text-[#0052CC] font-semibold uppercase tracking-wider'>
              Min 50 Base Pairs
            </span>
          </div>
          <textarea 
            className='bg-white text-[#001433] border-2 border-[#CCE0FF] rounded-xl p-4 w-full h-40 resize-none focus:outline-none focus:ring-4 focus:ring-[#0052CC]/20 focus:border-[#0052CC] transition-all shadow-inner font-mono text-sm leading-relaxed placeholder-[#CCE0FF]' 
            value={DNAtext} 
            onChange={(e) => setDNAtext(e.target.value)}
            placeholder='Paste a DNA sequence (minimum 50 base pairs) here...'
          ></textarea>
        </div>

        <button
          onClick={fetchDNAtext}
          disabled={!DNAtext.trim() || isClassifying}
          className={`w-full bg-[#0052CC] hover:bg-[#003D99] disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[#0052CC] text-[#E5F0FF] font-bold py-4 rounded-xl shadow-lg hover:shadow-[#0052CC]/30 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg`}
        >
          {isClassifying ? 'Analyzing Sequence...' : 'Classify Sequence'}
        </button>
 
        <div className='mt-10 p-5 bg-[#CCE0FF]/30 rounded-xl border border-[#CCE0FF]'>
          <h3 className='text-xs font-bold text-[#0052CC] mb-3 uppercase tracking-wider'>Example</h3>
          <ul className='text-[#001433] text-sm font-mono space-y-3 opacity-90 break-words'>
            <li className='bg-white/60 p-3 rounded shadow-sm border border-white/50'>
              <div className='flex justify-between items-center mb-1'>
                <strong className='font-sans text-xs uppercase tracking-wide'>E. Coli Promoter (Full length)</strong>
                <a href='https://en.wikipedia.org/wiki/Promoter_(genetics)' target='_blank' rel='noreferrer' className='text-xs text-[#0052CC] hover:underline font-sans'>Wiki ↗</a>
              </div>
              GTTGACATTGATTATTGACTAGTTATTAATAGTAATCAATTACGGGGTCATTAGTTCATAGCCCATATATGGAGTTCCGCGTTACATAACTTACGGTAAAT
            </li>
          </ul>
        </div>

        {/* Result Area */}
        {result && (
          <div className={`mt-8 p-6 rounded-xl border-2 text-center transform transition-all duration-300 ${isClassifying ? 'opacity-40 scale-95' : 'opacity-100 scale-100'} ${
            result.includes('Promoter (+)') 
              ? 'bg-[#E5F0FF] border-[#0052CC] text-[#001433]' 
              : result.includes('Error')
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'bg-slate-100 border-slate-300 text-slate-700'
          }`}>
            <h3 className='text-xs font-bold uppercase tracking-widest mb-1 opacity-70'>Classification Result</h3>
            <p className='text-2xl font-black tracking-tight'>{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
