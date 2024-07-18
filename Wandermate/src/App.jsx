import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Landing'
import Signup from './Signup'
import Signin from './Signin'
import HotelList from './Hotels'
import CounterUse from './Demo'
import Counter from './Counter'
import Hotel from './Hotel'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Landing/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/signin' element ={<Signin/>}/>
      <Route path='/hotels' element ={<HotelList/>}/>
      <Route path='/counteruse' element ={<CounterUse/>}/>
      <Route path='/counter' element ={<Counter/>}/>
      <Route path='/hotels/:id' element ={<Hotel/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


