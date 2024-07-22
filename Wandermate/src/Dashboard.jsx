import React from "react";
import { BrowserRouter, Link, Routes , Route} from 'react-router-dom';
import Hotels from './Hotels_details'
import Bookings from './Userbookings'
import Users from './Users'
import TravelPackages from './Travel_dest'


const DashboardHome =() => {
    return(
        <>
        <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4">
    <Paths/>
    </div>
    </div>
    
    </>
    )

}

export default DashboardHome;
const Paths = () =>{

    return(
       
        <Routes>
        <Route path="hotel" element={<Hotels />} />
        <Route path="users" element={<Users />} />
        <Route path="travel-packages" element={<TravelPackages />} />
        <Route path="bookings" element={<Bookings />} />
        </Routes>
       
    )
}

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">
        Travel Dashboard
      </div>
      <nav className="mt-4">
        <ul>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/admin">Dashboard Home</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="hotel">Hotels</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="users">Users</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="travel-packages">Travel Packages</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="bookings">Bookings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}


