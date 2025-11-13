import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";

const MyFoodRequests = () => {
    const { user } = use(AuthContext);
    const [foodRequests, setFoodRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user's food requests
    useEffect(() => {
        const fetchMyFoodRequests = async () => {
            try {
                const response = await fetch(`http://localhost:3000/my-food-requests/${user.email}`);
                const requests = await response.json();
                setFoodRequests(requests);
            } catch (error) {
                console.error('Error fetching my food requests:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchMyFoodRequests();
        }
    }, [user]);

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
                    <h1 className="text-3xl font-bold text-[#0c2729]">My Food Requests</h1>
                    <p className="text-gray-600 mt-2">Track all the food requests you've submitted</p>
                </div>

                {foodRequests.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-2xl font-bold text-[#0c2729] mb-2">No Requests Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't requested any food items yet.</p>
                            <Link 
                                to="/availablefoods" 
                                className="inline-block bg-[#83b541] hover:bg-[#6f9a37] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                            >
                                Browse Available Foods
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Food Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Pickup Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Request Reason
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Requested Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {foodRequests.map((request) => (
                                        <MyFoodRequestRow key={request._id} request={request} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Individual Request Row Component
const MyFoodRequestRow = ({ request }) => {
    const [foodDetails, setFoodDetails] = useState(null);
    const [loadingFood, setLoadingFood] = useState(true);

    // Fetch food details for this request
    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/foods/${request.foodId}`);
                const foodData = await response.json();
                setFoodDetails(foodData);
            } catch (error) {
                console.error('Error fetching food details:', error);
            } finally {
                setLoadingFood(false);
            }
        };

        fetchFoodDetails();
    }, [request.foodId]);

    return (
        <tr>
            {/* Food Details */}
            <td className="px-6 py-4 whitespace-nowrap">
                {loadingFood ? (
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse mr-3"></div>
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </div>
                    </div>
                ) : foodDetails ? (
                    <div className="flex items-center">
                        <img 
                            src={foodDetails.foodImage} 
                            alt={foodDetails.foodName}
                            className="w-12 h-12 object-cover rounded-lg mr-3"
                        />
                        <div>
                            <div className="text-sm font-medium text-gray-900">
                                {foodDetails.foodName}
                            </div>
                            <div className="text-sm text-gray-500">
                                by {foodDetails.donatorName}
                            </div>
                        </div>
                    </div>
                ) : (
                    <span className="text-gray-500 text-sm">Food details not available</span>
                )}
            </td>

            {/* Pickup Location */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.requestLocation}
            </td>

            {/* Contact Number */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.contactNumber}
            </td>

            {/* Request Reason */}
            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                <div className="truncate" title={request.requestReason}>
                    {request.requestReason}
                </div>
            </td>

            {/* Status */}
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}>
                    {request.status === 'accepted' ? 'Approved' : request.status}
                </span>
            </td>

            {/* Requested Date */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(request.requestedAt).toLocaleDateString()}
            </td>
        </tr>
    );
};

export default MyFoodRequests;