import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";



const AddFoods = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        foodName: '',
        foodImage: '',
        foodQuantity: '',
        pickupLocation: '',
        expiredDateTime: '',
        additionalNotes: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Prepare the data with auto-filled info
        const foodData = {
            ...formData,
            donatorName: user?.displayName,
            donatorEmail: user?.email,
            donatorImage: user?.photoURL,
            foodStatus: 'available',
            createdAt: new Date()
        };

        // console.log('Sending food data:', foodData);

        // Make API call to save to MongoDB
        const response = await fetch('https://assignment10-plate-share-server.vercel.app/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodData)
        });

        if (!response.ok) {
            throw new Error('Failed to save food');
        }

        const result = await response.json();
        // console.log('Food saved successfully:', result);
                toast.success('Food shared successfully!');
        
        navigate('/availablefoods');
        
    } catch (error) {
        console.error('Error adding food:', error);
        // TODO: Add error toast here
        toast.error('Failed to share food. Please try again.');
    } finally {
        setLoading(false);
    }
};
    return (
       <div className="min-h-screen bg-[#f7fcf5] py-12">
            <div className="max-w-2xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0c2729]">Share Your Food</h1>
                    <p className="text-gray-600 mt-2">Help reduce food waste by sharing your surplus meals</p>
                </div>

                {/* Add Food Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="bg-gray-50 rounded-xl p-4 mb-2">
                            <h3 className="font-semibold text-gray-700 mb-2">Shared by You</h3>
                            <div className="flex items-center gap-3">
                                <img 
                                    src={user?.photoURL} 
                                    alt={user?.displayName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium">{user?.displayName}</p>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                        </div>


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
                                placeholder="e.g., Homemade Pizza, Fresh Salad"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Food Image *
                            </label>
                            <input
                                  name="foodImage"
        value={formData.foodImage}
        onChange={handleInputChange}
         placeholder="Paste image URL here"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
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
        placeholder="e.g., 123 Main St, City, State"/>
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
            placeholder="Any special instructions, ingredients, or notes about the food..."
        /> </div>

                    {/* Submit Button */}
 <button
     type="submit"
     disabled={loading}
     className="w-full bg-[#83b541] hover:bg-[#6f9a37] text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50"
 >
     {loading ? (
         <span className="flex items-center justify-center">
             <span className="loading loading-spinner loading-sm mr-2"></span>
             Sharing Food...
         </span>
     ) : (
         'Share Food'
     )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddFoods;