
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';

const Hotel = () => {
    const { id } = useParams();
    const [hotel, setHotels] = useState([]);
 

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`http://localhost:3000/hotels/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('This is response',response);
        console.log('this is json',data)

        setHotels(data);
       
      } catch (error) {
        console.log(error);
       
      }
    };

    fetchHotels();
  }, [id]);


  return (
    <>
            <h2>Name:{hotel.name}</h2>
            <p>Price: RS{hotel.price}</p>
            <StarRating rating={hotel.rating} />
            <img src={hotel.img} alt={hotel.name} style={{ width: '200px' }} />
            <p>{hotel.desc}</p>
    </>
  );
};

export default Hotel;
