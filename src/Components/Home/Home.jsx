import React, { use, useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import HowItworks from "../Howitworks/Howitworks";
import OurMission from "../OurMission/OurMission";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";


const Home = () => {

    const [featuredFoods, setFeaturedFoods] = useState([]);
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
        const fetchFeaturedFoods = async () => {
            try {
                const response = await fetch('http://localhost:3000/foods');
                const allFoods = await response.json();
                
                // Sort by quantity (extract number from "Serves X people")
                const sortedFoods = allFoods.sort((a, b) => {
                    const quantityA = parseInt(a.foodQuantity.match(/\d+/)?.[0] || 0);
                    const quantityB = parseInt(b.foodQuantity.match(/\d+/)?.[0] || 0);
                    return quantityB - quantityA; // Descending order
                });
                
                // Take top 6 foods
                const top6Foods = sortedFoods.slice(0, 6);
                setFeaturedFoods(top6Foods);
            } catch (error) {
                console.error('Error fetching featured foods:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedFoods();
    }, []);

   return (
 
     <div>
           <Banner></Banner>
   
    {/* Featured Foods Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#0c2729]">Featured Foods </h2>
                        <p className="text-gray-600 mt-2">Most abundant meals available in your community</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-lg text-[#83b541]"></span>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {featuredFoods.map(food => (
                                    <div key={food._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                                  <div className="p-4"> {/* Added padding wrapper for image */}
                <img 
                    src={food.foodImage} 
                    alt={food.foodName}
                    className="w-full h-48 object-cover rounded-xl" /* Added rounded corners */
                />
            </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-[#0c2729] mb-2">{food.foodName}</h3>
                                            
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-full overflow-hidden">
                                                    <img 
                                                        src={food.donatorImage} 
                                                        alt={food.donatorName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-600">{food.donatorName}</span>
                                            </div>
                                            
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

                            {/* Show All Button */}
                            <div className="text-center">
                                <Link
                                    to="/availablefoods" 
                                    className="inline-block font-bold bg-[#6f9a37] hover:bg-[#184c4f] text-white py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Show All Available Foods
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>


   <HowItworks></HowItworks>
   <OurMission></OurMission>
    </div>
   )
}

export default Home;