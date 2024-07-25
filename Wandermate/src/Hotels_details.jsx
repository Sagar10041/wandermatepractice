
import React, { useState, useEffect } from 'react';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentHotelIndex, setCurrentHotelIndex] = useState(null);
    const [newHotel, setNewHotel] = useState({
        name: '', 
        price: '', 
        img: '', 
        rating: '', 
        freeCancellation: false, 
        reserveNow: false, 
        desc: ''
    });

    // Function to fetch data from API
    // const fetchHotels = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/hotels');
    //         const data = await response.json();
    //         setHotels(data);
    //     } catch (error) {
    //         console.error('Error fetching hotels:', error);
    //     }
    // };

    const loadHotelsFromLocalStorage = () => {
        const storedHotels = localStorage.getItem('hotels');
        if (storedHotels) {
            setHotels(JSON.parse(storedHotels));
        }
    };

    const saveHotelsToLocalStorage = (hotels) => {
        localStorage.setItem('hotels', JSON.stringify(hotels));
    };

    useEffect(() => {
        // fetchHotels();
        loadHotelsFromLocalStorage();
    }, []);

    const handleAddHotel = () => {
        setShowForm(true);
        setEditMode(false);
        setNewHotel({
            name: '', 
            price: '', 
            img: '', 
            rating: '', 
            freeCancellation: false, 
            reserveNow: false, 
            desc: ''
        });
    };
 
    const handleCancel = () => {
        setShowForm(false);
    };

    const handleSaveHotel = () => {
        let updatedHotels;
        if (editMode) {
            updatedHotels = hotels.map((hotel, index) => 
                index === currentHotelIndex ? newHotel : hotel
            );
        } else {
            updatedHotels = [...hotels, newHotel];
        }
        setHotels(updatedHotels);
        saveHotelsToLocalStorage(updatedHotels);
        setShowForm(false);
        setNewHotel({
            name: '', 
            price: '', 
            img: '', 
            rating: '', 
            freeCancellation: false, 
            reserveNow: false, 
            desc: ''
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewHotel(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEditHotel = (index) => {
        setCurrentHotelIndex(index);
        setNewHotel(hotels[index]);
        setShowForm(true);
        setEditMode(true);
    };

    const handleDeleteHotel = (index) => {
        const updatedHotels = [...hotels]; 
        updatedHotels.splice(index,1); 
        setHotels(updatedHotels);
        saveHotelsToLocalStorage(updatedHotels);
    };
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Hotels</h1>
            <button 
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddHotel}
            >
                Add Hotel
            </button>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Image</th>
                        <th className="py-2 px-4 border">Rating</th>
                        <th className="py-2 px-4 border">Free Cancellation</th>
                        <th className="py-2 px-4 border">Reserve Now</th>
                        <th className="py-2 px-4 border">Description</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border">{hotel.name}</td>
                            <td className="py-2 px-4 border">{hotel.price}</td>
                            <td className="py-2 px-4 border"><img src={hotel.img} alt={hotel.name} className="w-16 h-16 object-cover" /></td>
                            <td className="py-2 px-4 border">{hotel.rating}</td>
                            <td className="py-2 px-4 border">{hotel.freeCancellation ? 'Yes' : 'No'}</td>
                            <td className="py-2 px-4 border">{hotel.reserveNow ? 'Yes' : 'No'}</td>
                            <td className="py-2 px-4 border">{hotel.desc}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => handleEditHotel(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDeleteHotel(index)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">{editMode ? 'Edit Hotel' : 'Add New Hotel'}</h2>
                    <form className="space-y-2">
                        <div>
                            <label className="block">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newHotel.name}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label className="block">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={newHotel.price}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label className="block">Image URL</label>
                            <input
                                type="text"
                                name="img"
                                value={newHotel.img}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label className="block">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                value={newHotel.rating}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <div>
                            <label className="block">Free Cancellation</label>
                            <input
                                type="checkbox"
                                name="freeCancellation"
                                checked={newHotel.freeCancellation}
                                onChange={handleChange}
                                className="border px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block">Reserve Now</label>
                            <input
                                type="checkbox"
                                name="reserveNow"
                                checked={newHotel.reserveNow}
                                onChange={handleChange}
                                className="border px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block">Description</label>
                            <textarea
                                name="desc"
                                value={newHotel.desc}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleSaveHotel}
                        >
                            {editMode ? 'Update Hotel' : 'Save Hotel'}
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Hotels;
