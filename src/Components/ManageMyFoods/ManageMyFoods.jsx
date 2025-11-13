import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";


const ManageMyFoods = () => {
    const { user } = use(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch all foods and filter by current user
    useEffect(() => {
        const fetchMyFoods = async () => {
            try {
                const response = await fetch('http://localhost:3000/foods');
                const allFoods = await response.json();
                
                // Filter foods by current user's email
                const myFoods = allFoods.filter(food => food.donatorEmail === user?.email);
                setFoods(myFoods);
            } catch (error) {
                console.error('Error fetching foods:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchMyFoods();
        }
    }, [user]);

    // Delete food function
    const handleDelete = async (foodId) => {
        if (window.confirm('Are you sure you want to delete this food?')) {
            try {
                const response = await fetch(`http://localhost:3000/foods/${foodId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    // Remove from local state
                    setFoods(foods.filter(food => food._id !== foodId));
                    // TODO: Add success toast
                }
            } catch (error) {
                console.error('Error deleting food:', error);
                // TODO: Add error toast
            }
        }
    };

    // Open update modal
    const handleUpdate = (food) => {
        setSelectedFood(food);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-[#83b541]"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7fcf5] py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0c2729]">Manage My Foods</h1>
                    <p className="text-gray-600 mt-2">View, update, or delete the foods you've shared</p>
                </div>

                {foods.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-2xl font-bold text-[#0c2729] mb-2">No Foods Shared Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't shared any foods with the community yet.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foods.map(food => (
                            <div key={food._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="p-4">
                                    <img 
                                        src={food.foodImage} 
                                        alt={food.foodName}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#0c2729] mb-2">{food.foodName}</h3>
                                    
                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Quantity:</span> {food.foodQuantity}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Location:</span> {food.pickupLocation}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Expires:</span> {new Date(food.expiredDateTime).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold">Status:</span> 
                                            <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                                                food.foodStatus === 'available' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {food.foodStatus}
                                            </span>
                                        </p>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(food)}
                                            className="flex-1 bg-[#83b541] hover:bg-[#6f9a37] text-white py-2 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Update Modal */}
                {showModal && selectedFood && (
                    <UpdateFoodModal 
                        food={selectedFood}
                        onClose={() => setShowModal(false)}
                        onUpdate={(updatedFood) => {
                            // Update local state
                            setFoods(foods.map(f => 
                                f._id === updatedFood._id ? updatedFood : f
                            ));
                            setShowModal(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

// Update Food Modal Component
const UpdateFoodModal = ({ food, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        foodName: food.foodName,
        foodImage: food.foodImage,
        foodQuantity: food.foodQuantity,
        pickupLocation: food.pickupLocation,
        expiredDateTime: food.expiredDateTime.split('T')[0], // Format for date input
        additionalNotes: food.additionalNotes
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/foods/${food._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                onUpdate({ ...food, ...formData });
                toast.success('Food Info Updated successfully!');
              
            }
        } catch (error) {
            console.error('Error updating food:', error);
            // TODO: Add error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#0c2729]">Update Food</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Food Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Food Name *
                            </label>
                            <input
                                type="text"
                                name="foodName"
                                value={formData.foodName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                            />
                        </div>

                        {/* Food Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Food Image URL *
                            </label>
                            <input
                                type="text"
                                name="foodImage"
                                value={formData.foodImage}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                                placeholder="Paste image URL here"
                            />
                        </div>

                        {/* Food Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Food Quantity *
                            </label>
                            <input
                                type="text"
                                name="foodQuantity"
                                value={formData.foodQuantity}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                                placeholder="e.g., Serves 2 people"
                            />
                        </div>

                        {/* Pickup Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pickup Location *
                            </label>
                            <input
                                type="text"
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                            />
                        </div>

                        {/* Expiry Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date *
                            </label>
                            <input
                                type="date"
                                name="expiredDateTime"
                                value={formData.expiredDateTime}
                                onChange={handleInputChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                            />
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes
                            </label>
                            <textarea
                                name="additionalNotes"
                                value={formData.additionalNotes}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-xl transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-[#83b541] hover:bg-[#6f9a37] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <span className="loading loading-spinner loading-sm mr-2"></span>
                                        Updating...
                                    </span>
                                ) : (
                                    'Update Food'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageMyFoods;