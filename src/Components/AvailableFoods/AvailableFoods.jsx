import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const AvailableFoods = () => {

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    // Handle View Details click
    const handleViewDetails = (foodId) => {
        if (user) {
            // Logged in user - go to food details
            navigate(`/foods/${foodId}`);
        } else {
            // Not logged in - go to registration
            navigate('/register');
        }
          };

    useEffect(() => {
        const fetchAvailableFoods = async () => {
            try {
                const response = await fetch('http://localhost:3000/foods');
                const allFoods = await response.json();
                
                // Filter only available foods
                const availableFoods = allFoods.filter(food => food.foodStatus === 'available');
                setFoods(availableFoods);
            } catch (error) {
                console.error('Error fetching available foods:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableFoods();
    }, []);


   return (
      <div className="min-h-screen bg-[#f7fcf5] py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#0c2729] mb-4">Available Foods</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover fresh meals shared by our community. Help reduce food waste while enjoying delicious food.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="loading loading-spinner loading-lg text-[#83b541]"></span>
                    </div>
                ) : foods.length > 0 ? (
                    <>
                        {/* Foods Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {foods.map(food => (
                                <div key={food._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                   <div className="p-4"> {/* Added padding container for image */}
                <img 
                    src={food.foodImage} 
                    alt={food.foodName}
                    className="w-full h-48 object-cover rounded-xl" /* Added rounded corners */
                />
            </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-[#0c2729] mb-2">{food.foodName}</h3>
                                        
                                        {/* Donator Info */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#83b541]">
                                                <img 
                                                    src={food.donatorImage} 
                                                    alt={food.donatorName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600">{food.donatorName}</span>
                                        </div>
                                        
                                        {/* Food Details */}
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
                                        </div>
                                        
                                        {/* View Details Button */}
                         <button
    onClick={() => handleViewDetails(food._id)}
    className="block w-full bg-[#83b541] hover:bg-[#6f9a37] text-white text-center py-2 rounded-xl font-semibold transition-all duration-300"
>
    View Details
</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Results Count */}
                        <div className="text-center text-gray-600 mb-8">
                            <p>Showing {foods.length} available food items</p>
                        </div>
                    </>
                ) : (
                    /* No Foods Available */
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-2xl font-bold text-[#0c2729] mb-2">No Available Foods</h3>
                            <p className="text-gray-600 mb-6">There are currently no available foods in your area.</p>
                            <Link 
                                to="/addfoods" 
                                className="inline-block bg-[#83b541] hover:bg-[#6f9a37] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                            >
                                Be the First to Share Food
                            </Link>
                        </div>
                    </div>
                )}

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        to="/" 
                        className="inline-block bg-[#0c2729] hover:bg-[#184c4f] text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
   )
}

export default AvailableFoods;