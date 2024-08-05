import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: [''],
        description: '',
        rating: '',
        freeCancellation: false,
        reserveNow: false
    });

    const fetchHotels = async () => {
        try {
            const response = await axios.get("http://localhost:5236/api/hotels");
            setHotels(response.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.image];
        newImages[index] = value;
        setFormData(prevData => ({
            ...prevData,
            image: newImages
        }));
    };

    const handleSave = async () => {
        try {
            if (formData.id) {
                // Update existing hotel
                await axios.put(`http://localhost:5236/api/hotels/${formData.id}`, formData);
            } else {
                // Add new hotel
                await axios.post("http://localhost:5236/api/hotels", formData);
            }
            resetForm();
            fetchHotels();
        } catch (error) {
            console.error("Error saving hotel:", error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (hotel) => {
        setFormData(hotel);
        setShowForm(true);
    };

    const handleAddHotel = () => {
        resetForm();
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5236/api/hotels/${id}`);
            fetchHotels();
        } catch (error) {
            console.error("Error deleting hotel:", error);
        }
    };

    const truncateDescription = (text, length = 45) => {
        return text.length > length ? `${text.slice(0, length)}...` : text;
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            image: [''],
            description: '',
            rating: '',
            freeCancellation: false,
            reserveNow: false
        });
        setShowForm(false);
    };

    return (
        <>
            <button
                onClick={handleAddHotel}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Add New Hotel
            </button>

            <table className="min-w-full bg-white border border-gray-200 shadow-md">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Images</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Rating</th>
                        <th className="py-3 px-6 text-left">Free Cancellation</th>
                        <th className="py-3 px-6 text-left">Reserve Now</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel) => (
                        <tr key={hotel.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{hotel.name}</td>
                            <td className="py-2 px-4">{hotel.price}</td>
                            <td className="py-2 px-4">
                                {hotel.image.filter(img => img).map((img, index) => (
                                    <div key={index} className="mb-1">{img}</div>
                                ))}
                            </td>
                            <td className="py-2 px-4">
                                {truncateDescription(hotel.description)}
                            </td>
                            <td className="py-2 px-4">{hotel.rating}</td>
                            <td className="py-2 px-4">
                                {hotel.freeCancellation ? "Yes" : "No"}
                            </td>
                            <td className="py-2 px-4">
                                {hotel.reserveNow ? "Yes" : "No"}
                            </td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleEdit(hotel)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(hotel.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <div className="mt-8 p-6 bg-gray-100 border border-gray-300 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">{formData.id ? 'Edit Hotel' : 'Add Hotel'}</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        {formData.image.map((img, index) => (
                            <div className="mb-4" key={index}>
                                <label className="block text-gray-700">Image {index + 1}</label>
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData(prevData => ({
                                ...prevData,
                                image: [...prevData.image, '']
                            }))}
                            className="text-blue-500 underline mb-4"
                        >
                            Add Another Image
                        </button>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                name="freeCancellation"
                                checked={formData.freeCancellation}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label className="text-gray-700">Free Cancellation</label>
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                name="reserveNow"
                                checked={formData.reserveNow}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label className="text-gray-700">Reserve Now</label>
                        </div>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Hotels;
