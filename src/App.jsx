import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [vat, setVat] = useState(0)
  const [price, setPrice] = useState(0)
  const [grossPrice, setGross] = useState(0)
  const [discount, setDiscount] = useState(0)

  
  function handlePrice(e) {
    let price = e.target.value
    console.log(price)
    setPrice(price)
    updateGross(price, discount)
  }

  function handleDiscount(e) {
    let discount = e.target.value
    console.log(discount)
    setDiscount(discount)
    updateGross(price, discount)
  }

  function updateGross(price, discount) {
    let gross = price - discount
    setGross(gross.toFixed(2))
    let vat = gross * 0.07
    setVat(vat.toFixed(2) )
  }


  return (
    <>
    
    <h2>Price</h2>
    <input type="number" onChange = {handlePrice}
     style={{fontSize: '20pt'}}></input>
     <h2>Discount</h2>
     <input type="number" onChange = {handleDiscount}
     style={{fontSize: '20pt'}}></input>
      
      <p>Gross Price = {grossPrice} </p>
      <p>VAT = {vat}</p>
      
      
    </>
  )
}

export default App
