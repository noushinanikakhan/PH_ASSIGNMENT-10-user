import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';



const FoodDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = use(AuthContext);

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/foods/${id}`);
                const foodData = await response.json();
                setFood(foodData);
            } catch (error) {
                console.error('Error fetching food details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-[#83b541]"></span>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="min-h-screen bg-[#f7fcf5] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#0c2729] mb-4">Food Not Found</h2>
                    <Link to="/availablefoods" className="text-[#83b541] hover:text-[#0c2729] font-semibold">
                        Back to Available Foods
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7fcf5] py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        to="/availablefoods" 
                        className="inline-flex items-center gap-2 text-[#83b541] hover:text-[#0c2729] font-semibold"
                    >
                        ← Back to Available Foods
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Food Image */}
                    <div className="p-6">
                        <img 
                            src={food.foodImage} 
                            alt={food.foodName}
                            className="w-full h-96 object-cover rounded-2xl"
                        />
                    </div>

                    <div className="p-8">
                        {/* Food Title */}
                        <h1 className="text-3xl font-bold text-[#0c2729] mb-4">{food.foodName}</h1>

                        {/* Food Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Quantity</h3>
                                    <p className="text-lg">{food.foodQuantity}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Pickup Location</h3>
                                    <p className="text-lg">{food.pickupLocation}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Expiry Date</h3>
                                    <p className="text-lg">{new Date(food.expiredDateTime).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Donator Info */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-700 mb-4">Shared By</h3>
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={food.donatorImage} 
                                        alt={food.donatorName}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-[#83b541]"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-lg">{food.donatorName}</h4>
                                        <p className="text-gray-600">{food.donatorEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        {food.additionalNotes && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-700 mb-3">Additional Notes</h3>
                                <p className="text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                                    {food.additionalNotes}
                                </p>
                            </div>
                        )}

                        {/* Request Food Button */}
                        <div className="text-center">
                            <button className="bg-[#83b541] hover:bg-[#6f9a37] text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                                Request Food
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;