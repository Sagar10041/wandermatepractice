
import React, { useEffect, useState } from 'react';
import Card from './Card';

const HotelList = () => {
  const [hotels, setHotels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('https://8e67-202-63-244-120.ngrok-free.app/api/hotels');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('This is response',response);
        const data = await response.text();
       
        console.log('this is parsed data',data)

        setHotels(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
   {hotels
   }
    {/* <Card props ={hotels}/> */}
    </>
  );
};

export default HotelList;
