import React from "react";
import { Link } from 'react-router-dom';
import StarRating from "./StarRating";

const Card =({props}) =>
{
    console.log('this is', props)
    return (
        <>
        <div>
      <ul>
        {props.map((hotel) => (
          <li key={hotel.id}>
            <h2>Name:{hotel.name}</h2>
            <p>Price: RS{hotel.price}</p>
            <StarRating rating={hotel.rating} />
            <img src={hotel.img} alt={hotel.name} style={{ width: '200px' }} />
            <p>{hotel.desc}</p>
            <Link to= {`${hotel.id}`}  className="bg-slate-500 w-40 h-20">View Deal</Link>

          </li>
        ))}
      </ul>
    </div>
        </>
    )
}

export default Card;