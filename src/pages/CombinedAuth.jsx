// src/components/CombinedAuth.jsx

import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

// This is your original component, rebuilt to be responsive.
export default function AnimatedAuthComponent() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const navigate = useNavigate();

  // States for form inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleSignUpClick = () => setIsSignUpActive(true);
  const handleSignInClick = () => setIsSignUpActive(false);

  // --- Firebase Logic ---
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing in: ", error.message);
      alert("Failed to sign in: " + error.message);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      // You might want to update the user's profile with the name here
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing up: ", error.message);
      alert("Failed to sign up: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error with Google sign-in: ", error.message);
      alert("Failed with Google sign-in: " + error.message);
    }
  };


  // Base container styles
  const containerClasses = "bg-[#24283a] rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-4xl";
  
  // Panel (form) styles
  const formContainerBase = "absolute top-0 h-full transition-all duration-700 ease-in-out";
  const signInFormClasses = `left-0 w-full md:w-1/2 z-20 ${isSignUpActive ? 'opacity-0' : 'opacity-100'}`;
  const signUpFormClasses = `left-0 w-full md:w-1/2 z-20 ${isSignUpActive ? 'opacity-100' : 'opacity-0'}`;

  // Overlay styles
  const overlayContainerClasses = `absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 hidden md:block ${isSignUpActive ? '-translate-x-full' : 'translate-x-0'}`;
  const overlayClasses = "bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out";

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1c1f2e] p-4 font-sans">
      
      {/* On mobile, we show one form at a time */}
      <div className="md:hidden w-full max-w-sm">
        {isSignUpActive ? (
           // Mobile Sign Up Form
          <div className="bg-[#24283a] p-8 rounded-2xl">
            <form onSubmit={handleEmailSignUp} className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Create Account</h1>
              <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
              <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
              <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
              <button type="submit" className="text-white mt-4 text-sm font-bold uppercase px-10 py-3 rounded-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]">Sign Up</button>
              <p className="text-gray-400 mt-4 text-sm">Already have an account?</p>
              <button type="button" onClick={handleSignInClick} className="text-white font-bold mt-2">Sign In</button>
            </form>
          </div>
        ) : (
          // Mobile Sign In Form
          <div className="bg-[#24283a] p-8 rounded-2xl">
            <form onSubmit={handleEmailSignIn} className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Sign In</h1>
              <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
              <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
              <a href="#" className="text-sm text-gray-400 my-3">Forgot your password?</a>
              <button type="submit" className="text-white text-sm font-bold uppercase px-10 py-3 rounded-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]">Sign In</button>
              <p className="text-gray-400 my-3 text-sm">OR</p>
              <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 font-bold px-4 py-2 rounded-lg">
                <FaGoogle /> Continue with Google
              </button>
              <p className="text-gray-400 mt-4 text-sm">Don't have an account?</p>
              <button type="button" onClick={handleSignUpClick} className="text-white font-bold mt-2">Sign Up</button>
            </form>
          </div>
        )}
      </div>

      {/* On Desktop, we show the sliding animation */}
      <div className={`${containerClasses} min-h-[500px] hidden md:block`}>
        <div className={`${formContainerBase} ${signUpFormClasses}`}>
          <form onSubmit={handleEmailSignUp} className="bg-[#24283a] h-full flex flex-col justify-center items-center px-16 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Create Account</h1>
            <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
            <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
            <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
            <button type="submit" className="text-white mt-4 text-sm font-bold uppercase px-10 py-3 rounded-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]">Sign Up</button>
          </form>
        </div>

        <div className={`${formContainerBase} ${signInFormClasses}`}>
          <form onSubmit={handleEmailSignIn} className="bg-[#24283a] h-full flex flex-col justify-center items-center px-16 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Sign In</h1>
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="bg-[#31364c] text-white p-3 my-2 w-full rounded-lg border-none" />
            <a href="#" className="text-sm text-gray-400 my-3">Forgot your password?</a>
            <button type="submit" className="text-white text-sm font-bold uppercase px-10 py-3 rounded-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]">Sign In</button>
            <p className="text-gray-400 my-3 text-sm">OR</p>
            <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 font-bold px-4 py-2 rounded-lg">
              <FaGoogle /> Continue with Google
            </button>
          </form>
        </div>

        <div className={overlayContainerClasses}>
          <div className={`${overlayClasses} ${isSignUpActive ? 'translate-x-1/2' : 'translate-x-0'}`}>
            <div className="absolute top-0 h-full w-1/2 flex flex-col justify-center items-center text-center px-10 transform -translate-x-[0%]">
              <h1 className="text-3xl font-bold">Welcome Back!</h1>
              <p className="text-md my-4">Enter your personal details and start your journey with us</p>
              <button onClick={handleSignInClick} className="bg-transparent border-2 border-white text-white font-bold uppercase px-12 py-3 rounded-full tracking-wider">Sign In</button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col justify-center items-center text-center px-10 transform translate-x-[0%]">
              <h1 className="text-3xl font-bold">Hello, Friend!</h1>
              <p className="text-md my-4">Enter your personal details and start your journey with us</p>
              <button onClick={handleSignUpClick} className="bg-transparent border-2 border-white text-white font-bold uppercase px-12 py-3 rounded-full tracking-wider">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
