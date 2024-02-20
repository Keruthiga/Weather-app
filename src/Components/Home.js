import React, {  useState } from 'react'
import SearchImg from '../Assets/search.png'
import Humidity from '../Assets/humidity.png'
import Wind from '../Assets/wind.png'
import axios from 'axios';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'london',
    humidity: 10,
    speed:2
  })

  const [name, setName] = useState('');
  const [error, setError] = useState('');

   const handleClick = () =>{
    if( name !== ''){
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a97c77ffad2d8b8c96ae9af4e473510d&units=metric` ;
      axios.get(apiURL)
      .then(res =>{
        setData({...data, celcius: res.data.main.temp, name:res.data.name, humidity:res.data.main.humidity, speed:res.data.wind.speed})
        setError('')
      })
      .catch(err => 
        {
          if(err.response.status === 404){
            setError("Invalid city name")
          }else{
            setError('')
          }
          console.log(err);
        });
    }
   }

  
  return (
    <div className='container'>
      <h1 className='heading'>Weather App</h1>
      <div className='weather'>
        <div className='search'>
          <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
          <button><img src={SearchImg} alt='' onClick={handleClick} /></button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        <div className='winfo'>
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src={Humidity} alt=''/>
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
            <img src={Wind} alt=''/>
              <div className='wind'>
                <p>{Math.round(data.speed)}Km/hr</p>
                <p>Wind</p>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Home