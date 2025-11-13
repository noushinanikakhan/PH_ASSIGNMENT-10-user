import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const FoodDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = use(AuthContext);

    // Food Request System States
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [foodRequests, setFoodRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(false);

    // Handle food request submission
    const handleSubmitRequest = async (requestData) => {
        const foodRequest = {
            ...requestData,
            foodId: id,
            requesterEmail: user.email,
            requesterName: user.displayName,
            requesterImage: user.photoURL,
            status: 'pending',
            requestedAt: new Date()
        };

        const response = await fetch('http://localhost:3000/food-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodRequest)
        });

        if (!response.ok) {
            throw new Error('Failed to submit request');
        }

        console.log('Food request submitted successfully');
    };

    // Fetch food requests for this food
    const fetchFoodRequests = async () => {
        if (user.email === food.donatorEmail) {
            setLoadingRequests(true);
            try {
                const response = await fetch(`http://localhost:3000/food-requests/${id}`);
                const requests = await response.json();
                setFoodRequests(requests);
            } catch (error) {
                console.error('Error fetching food requests:', error);
            } finally {
                setLoadingRequests(false);
            }
        }
    };

    // Handle accept request
    const handleAcceptRequest = async (requestId) => {
        try {
            // Update request status to accepted
            await fetch(`http://localhost:3000/food-requests/${requestId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'accepted' })
            });

            // Update food status to donated
            await fetch(`http://localhost:3000/foods/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ foodStatus: 'donated' })
            });

            // Refresh requests and food data
            fetchFoodRequests();
            // Refresh food details
            const response = await fetch(`http://localhost:3000/foods/${id}`);
            const updatedFood = await response.json();
            setFood(updatedFood);

            // TODO: Add success toast
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    // Handle reject request
    const handleRejectRequest = async (requestId) => {
        try {
            await fetch(`http://localhost:3000/food-requests/${requestId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' })
            });

            // Refresh requests
            fetchFoodRequests();
            // TODO: Add success toast
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

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

    // Fetch requests when food loads and user is the owner
    useEffect(() => {
        if (food && user.email === food.donatorEmail) {
            fetchFoodRequests();
        }
    }, [food, user.email]);

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
            <div className="max-w-6xl mx-auto px-4">
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
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        food.foodStatus === 'available' 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {food.foodStatus}
                                    </span>
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

                        {/* Request Food Button - Only show if user is NOT the food owner AND food is available */}
                        {user.email !== food.donatorEmail && food.foodStatus === 'available' && (
                            <div className="text-center">
                                <button 
                                    onClick={() => setShowRequestModal(true)}
                                    className="bg-[#83b541] hover:bg-[#6f9a37] text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Request Food
                                </button>
                            </div>
                        )}

                        {/* Message for food owner */}
                        {user.email === food.donatorEmail && (
                            <div className="text-center">
                                <p className="text-gray-600 italic">This is your shared food. You can manage requests below.</p>
                            </div>
                        )}

                        {/* Message when food is donated */}
                        {food.foodStatus === 'donated' && (
                            <div className="text-center">
                                <p className="text-gray-600 italic">This food has been donated to someone.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Food Requests Table - Only show to food owner */}
                {user.email === food.donatorEmail && (
                    <FoodRequestsTable 
                        requests={foodRequests}
                        loading={loadingRequests}
                        onAccept={handleAcceptRequest}
                        onReject={handleRejectRequest}
                    />
                )}

                {/* Request Food Modal */}
                <RequestFoodModal 
                    show={showRequestModal}
                    onClose={() => setShowRequestModal(false)}
                    onSubmit={handleSubmitRequest}
                    foodId={id}
                />
            </div>
        </div>
    );
};

// Request Food Modal Component
const RequestFoodModal = ({ show, onClose, onSubmit, foodId }) => {
    const [formData, setFormData] = useState({
        requestLocation: '',
        requestReason: '',
        contactNumber: ''
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
            await onSubmit(formData);
            onClose();
            // Reset form
            setFormData({
                requestLocation: '',
                requestReason: '',
                contactNumber: ''
            });
        } catch (error) {
            console.error('Error submitting request:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#0c2729]">Request Food</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pickup Location *
                            </label>
                            <input
                                type="text"
                                name="requestLocation"
                                value={formData.requestLocation}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                                placeholder="Where will you pickup the food?"
                            />
                        </div>

                        {/* Why Need Food */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Why Do You Need This Food? *
                            </label>
                            <textarea
                                name="requestReason"
                                value={formData.requestReason}
                                onChange={handleInputChange}
                                required
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                                placeholder="Please share why you need this food..."
                            />
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number *
                            </label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#83b541] focus:border-transparent"
                                placeholder="Your phone number for coordination"
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
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Request'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Food Requests Table Component
const FoodRequestsTable = ({ requests, loading, onAccept, onReject }) => {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-[#83b541]"></span>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No requests yet.</p>
            </div>
        );
    }

    

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-[#0c2729] mb-6">Food Requests</h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Requester
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reason
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img 
                                                src={request.requesterImage} 
                                                alt={request.requesterName}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {request.requesterName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {request.requesterEmail}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {request.contactNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {request.requestLocation}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                        <div className="truncate" title={request.requestReason}>
                                            {request.requestReason}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            request.status === 'pending' 
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : request.status === 'accepted'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  {request.status === 'pending' && (
      <div className="flex gap-2"> <button  onClick={() => onAccept(request._id)}
     className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs" >
        Accept  </button>
    <button   onClick={() => onReject(request._id)}
       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs">
         Reject  </button></div>
     )}
     {request.status !== 'pending' && (
    <span className="text-gray-500 text-xs">
        {request.status === 'accepted' ? 'Donated' : 'Rejected'}
    </span>
)}
            </td>
             </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;