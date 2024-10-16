import { SiHotelsdotcom } from 'react-icons/si'
import './App.css'

function App() {
  return (
    <div className='flex flex-col gap-10'>
      <SiHotelsdotcom size={150} className='text-red-500 animate-spin' />
      <p className='text-6xl font-bold animate-spin'>Hotel</p>
    </div>
  )
}

export default App
