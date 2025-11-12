import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
 import 'react-toastify/dist/ReactToastify.css'; // Add this CSS import
import { useNavigate } from "react-router";


const Register = () => {

     const navigate = useNavigate();
     const { createUser, updateUserProfile } = useContext (AuthContext);
    const [loading, setLoading] = useState (false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });

        // ADD THIS TEST HERE:
    useEffect(() => {
        toast.success("Test toast - is this working?");
    }, []);


    // console.log('Form Data:', formData);
    // console.log('Loading state:', loading);

    const handleChange = (e) => {
        console.log('Input changed:', e.target.name, e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;
        
        console.log('Password validation:', { hasUpperCase, hasLowerCase, hasMinLength });
        return { hasUpperCase, hasLowerCase, hasMinLength, isValid: hasUpperCase && hasLowerCase && hasMinLength };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Form submitted with data:', formData);

        // Password validation
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            console.log('Password validation failed');
            toast.error('Password must contain uppercase, lowercase letters and be at least 6 characters long');
            toast("Password must contain uppercase, lowercase letters and be at least 6 characters long")
            setLoading(false);
            return;
        }

        try {
            console.log('Creating user with email:', formData.email);
            // Create user with email and password
            const result = await createUser(formData.email, formData.password);
            console.log('User created successfully:', result);
            
            console.log('Updating user profile with:', { name: formData.name, photoURL: formData.photoURL });
            // Update user profile with name and photo
            await updateUserProfile(formData.name, formData.photoURL);
            console.log('User profile updated successfully');
            
            toast.success('Account created successfully!');
            console.log('Form reset - clearing all fields');
            // Reset form
            setFormData({
                name: '',
                email: '',
                photoURL: '',
                password: ''
            });

             navigate('/'); 
            
     } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please use a different email or login.');
    } else {
        toast.error(error.message);
    }
}
        
        finally {
            console.log('Registration process completed');
            setLoading(false);
        }
    }

    const passwordValidation = validatePassword(formData.password);
    // console.log('Current password validation status:', passwordValidation)


    return (
<div className="min-h-screen bg-[#f7fcf5] py-12">
     <div className="max-w-6xl mx-auto px-4">
     <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Side - Brand & Info */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <div className="mb-8">
    <h1 className="text-4xl lg:text-5xl font-bold text-[#0c2729] mb-4">
                                Join PlateShare
    </h1>
     <p className="text-lg text-gray-600 leading-relaxed">
 Become part of our food-sharing community and help reduce waste while feeding your neighbors. Together, we can create a sustainable future where no good food goes to waste.
                            </p>
 </div>
                        
 <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
<h3 className="text-xl font-semibold text-[#0c2729] mb-4">Why Join PlateShare?</h3>
      <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
      <div className="w-6 h-6 bg-[#83b541] rounded-full flex items-center justify-center text-white text-sm">✓</div>
           Share surplus food with your community
         </li>
         <li className="flex items-center gap-3">
             <div className="w-6 h-6 bg-[#83b541] rounded-full flex items-center justify-center text-white text-sm">✓</div>
          Discover fresh meals near you
         </li>
         <li className="flex items-center gap-3">
             <div className="w-6 h-6 bg-[#83b541] rounded-full flex items-center justify-center text-white text-sm">✓</div>
              Reduce food waste and help the environment
                </li>
         </ul>
      </div>
     </div>

          {/* Right Side - Registration Form */}
       <div className="lg:w-1/2">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0c2729]">Create Account</h2>
                 <p className="text-gray-600 mt-2">Join our food-sharing community</p>
                            </div>

       <form onSubmit={handleSubmit}  className="space-y-6">
         <div className="space-y-4">
                {/* Name Field */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                 <input 
                 type="text" 
                   name="name" 
                  value={formData.name}
                onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#83b541] focus:border-transparent transition-all"
                 placeholder="Enter your full name"
              required
             />
                 </div>

                  {/* Email Field */}
         <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
           <input 
              type="email" 
                 name="email" 
                 value={formData.email}
                onChange={handleChange}
         className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#83b541] focus:border-transparent transition-all"
         placeholder="Enter your email"
             required/>
       </div>
     {/* Photo URL Field */}
     <div>
         <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
         <input 
             type="url" 
               name="photoURL"
              value={formData.photoURL}
                onChange={handleChange}
             className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#83b541] focus:border-transparent transition-all"
             placeholder="Paste your profile photo URL"   />
     </div>
        {/* Password Field with Validation */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
                type="password"
                 name="password"  
                 value={formData.password}
                    onChange={handleChange}  
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#83b541] focus:border-transparent transition-all"
                placeholder="Create a secure password"
                required   />
                                                                   {/* Password Validation Requirements */}
                  {formData.password && (
              <div className="mt-2 space-y-1">
           <p className="text-xs text-gray-600 font-medium">Password must contain:</p>
           <div className="flex flex-wrap gap-4 text-xs">
         <span className={passwordValidation.hasUpperCase ? "text-green-500" : "text-red-500"}>
                                  • Uppercase letter   </span>
         <span className={passwordValidation.hasLowerCase ? "text-green-500" : "text-red-500"}>
                       • Lowercase letter</span>
               <span className={passwordValidation.hasMinLength ? "text-green-500" : "text-red-500"}>
    • At least 6 characters     </span>
                             </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
 

                {/* Register Button */}
    <button 
        type="submit"
        disabled={loading}
 className="w-full bg-[#83b541] hover:bg-[#6f9a37] text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
 >
                                    Register Now
                                </button>

    {/* Divider */}
    <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
           </div>

        {/* Google Login Button */}
        <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300"
        >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
             </svg>
             Continue with Google
         </button>

              {/* Login Link */}
             <div className="text-center">
             <p className="text-gray-600">
               Already have an account?{" "}
      <a href="/login" className="text-[#83b541] hover:text-[#0c2729] font-semibold transition-colors">
                                            Log In     </a>
            </p>
        </div>
        </form>
             </div>
           </div>
                </div>
            </div>

                  
        </div>
    
                                        )}

export default Register;