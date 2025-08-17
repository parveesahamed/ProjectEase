// src/components/CombinedAuth.jsx

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Google Icon SVG component for the button
const GoogleIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.591,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


export default function CombinedAuth() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    // Separate state for each form
    const [signInForm, setSignInForm] = useState({ email: '', password: '' });
    
    // Step 1: Add 'role' to the signUpForm state with a default value
    const [signUpForm, setSignUpForm] = useState({ name: '', email: '', password: '', role: 'User' });

    const handleSignInChange = (e) => setSignInForm({...signInForm, [e.target.name]: e.target.value });
    const handleSignUpChange = (e) => setSignUpForm({...signUpForm, [e.target.name]: e.target.value });

    const handleAuthResponse = (userCred) => {
        localStorage.setItem("user", JSON.stringify(userCred.user));
        navigate("/dashboard", { replace: true });
    };

    const handleAuthError = (error) => {
        // Clear error on form switch
        if (isSignUpActive) {
            if (err) setErr("");
        } else {
            if(err) setErr("");
        }
        setErr(error?.message || "Something went wrong.");
    };

    // --- Form Submission Logic ---
    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const userCred = await signInWithEmailAndPassword(auth, signInForm.email, signInForm.password);
            handleAuthResponse(userCred);
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!signUpForm.name || !signUpForm.role) {
            setErr("Please fill in all fields");
            return;
        }
        setErr("");
        setLoading(true);

        // NOTE: Hum abhi role ko console par log kar rahe hain.
        // Isko save karne ke liye aapko Firestore Database ka use karna padega.
        console.log("New User Details:", {
            name: signUpForm.name,
            email: signUpForm.email,
            role: signUpForm.role,
        });

        try {
            const userCred = await createUserWithEmailAndPassword(auth, signUpForm.email, signUpForm.password);
            await updateProfile(userCred.user, { displayName: signUpForm.name });
            // Yahan par aap Firestore mein user ka role save kar sakte hain.
            handleAuthResponse(userCred);
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

     // --- Google Login Logic ---
    const handleGoogleLogin = async () => {
        setErr("");
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const userCred = await signInWithPopup(auth, provider);
            // Google se sign in karne par role 'User' set hoga by default.
            console.log("New Google User:", {
                name: userCred.user.displayName,
                email: userCred.user.email,
                role: 'User' // Default role
            });
            handleAuthResponse(userCred);
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    // --- UI Toggling ---
    const handleSignUpClick = () => { setErr(""); setIsSignUpActive(true); };
    const handleSignInClick = () => { setErr(""); setIsSignUpActive(false); };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#111827]">
            <div 
                className={`relative overflow-hidden w-full max-w-4xl min-h-[620px] rounded-lg bg-[#1f2937] shadow-lg
                ${isSignUpActive ? 'right-panel-active' : ''}`}
                id="container"
            >
                {/* Sign Up Form */}
                <div className={`absolute top-0 h-full left-0 w-1/2 opacity-0 z-10 transition-all duration-600 ease-in-out
                    ${isSignUpActive ? 'transform translate-x-full opacity-100 z-50' : ''}`}
                >
                    <form onSubmit={handleSignUpSubmit} className="bg-[#1f2937] h-full flex justify-center items-center flex-col px-12 text-center">
                        <h1 className="font-bold text-3xl mb-2 text-white">Create Account</h1>
                        
                        {/* Input Fields */}
                        <input type="text" name="name" placeholder="Name" value={signUpForm.name} onChange={handleSignUpChange} className="bg-[#374151] border-none p-3 my-1.5 w-full text-white rounded" />
                        <input type="email" name="email" placeholder="Email" value={signUpForm.email} onChange={handleSignUpChange} className="bg-[#374151] border-none p-3 my-1.5 w-full text-white rounded" />
                        <input type="password" name="password" placeholder="Password" value={signUpForm.password} onChange={handleSignUpChange} className="bg-[#374151] border-none p-3 my-1.5 w-full text-white rounded" />
                        
                        {/* Step 2: Add the Role Dropdown */}
                        <div className="relative w-full my-1.5">
                            <select 
                                name="role"
                                value={signUpForm.role}
                                onChange={handleSignUpChange}
                                className="bg-[#374151] border-none p-3 w-full text-white rounded appearance-none cursor-pointer"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Employee">Employee</option>
                                <option value="Developer">Developer</option>
                                <option value="Team Lead">Team Lead</option>
                                <option value="Project Manager">Project Manager</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        {err && <p className="text-red-400 text-sm mt-2 h-5">{err}</p>}
                        
                        <button type="submit" disabled={loading} className="rounded-full border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold py-3 px-12 tracking-wider uppercase mt-4 transform transition-transform duration-75 ease-in hover:scale-105 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? 'Creating...' : 'Sign Up'}
                        </button>
                         <div className="relative flex items-center justify-center my-3 w-full">
                           <div className="border-t border-gray-500 flex-grow"></div>
                           <span className="px-2 text-gray-400 text-sm">OR</span>
                           <div className="border-t border-gray-500 flex-grow"></div>
                         </div>
                        <button type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold disabled:opacity-70 disabled:cursor-not-allowed">
                            <GoogleIcon />
                            Continue with Google
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className={`absolute top-0 h-full left-0 w-1/2 z-20 transition-all duration-600 ease-in-out
                    ${isSignUpActive ? 'transform translate-x-full' : ''}`}
                >
                     <form onSubmit={handleSignInSubmit} className="bg-[#1f2937] h-full flex justify-center items-center flex-col px-12 text-center">
                        <h1 className="font-bold text-3xl mb-4 text-white">Sign In</h1>
                        <input type="email" name="email" placeholder="Email" value={signInForm.email} onChange={handleSignInChange} className="bg-[#374151] border-none p-3 my-2 w-full text-white rounded" />
                        <input type="password" name="password" placeholder="Password" value={signInForm.password} onChange={handleSignInChange} className="bg-[#374151] border-none p-3 my-2 w-full text-white rounded" />
                        <a href="#" className="text-gray-400 text-sm my-4">Forgot your password?</a>
                        {err && <p className="text-red-400 text-sm mb-2 h-5">{err}</p>}
                        <button type="submit" disabled={loading} className="rounded-full border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold py-3 px-12 tracking-wider uppercase transform transition-transform duration-75 ease-in hover:scale-105 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>
                        <div className="relative flex items-center justify-center my-4 w-full">
                           <div className="border-t border-gray-500 flex-grow"></div>
                           <span className="px-2 text-gray-400 text-sm">OR</span>
                           <div className="border-t border-gray-500 flex-grow"></div>
                         </div>
                        <button type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold disabled:opacity-70 disabled:cursor-not-allowed">
                            <GoogleIcon />
                            Continue with Google
                        </button>
                    </form>
                </div>

                {/* Overlay Panels */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-50 transition-transform duration-600 ease-in-out
                    ${isSignUpActive ? 'transform -translate-x-full' : ''}`}
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out text-white
                        ${isSignUpActive ? 'transform translate-x-1/2' : 'transform translate-x-0'}"
                    >
                        {/* Overlay Left Panel (Shows on Sign In) */}
                        <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out
                            ${isSignUpActive ? 'transform translate-x-0' : 'transform -translate-x-1/5'}`}
                        >
                            <h1 className="font-bold text-3xl">Welcome Back!</h1>
                            <p className="text-md font-thin leading-snug mt-5">
                                To keep connected with us please login with your personal info
                            </p>
                            <button 
                                className="rounded-full border border-white bg-transparent text-white text-sm font-bold py-3 px-12 tracking-wider uppercase mt-4 transform transition-transform duration-75 ease-in hover:scale-105 focus:outline-none"
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </button>
                        </div>
                        
                        {/* Overlay Right Panel (Shows on Sign Up) */}
                        <div className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 right-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out
                            ${isSignUpActive ? 'transform translate-x-1/5' : 'transform translate-x-0'}`}
                        >
                            <h1 className="font-bold text-3xl">Hello, Friend!</h1>
                            <p className="text-md font-thin leading-snug mt-5">
                                Enter your personal details and start your journey with us
                            </p>
                            <button 
                                className="rounded-full border border-white bg-transparent text-white text-sm font-bold py-3 px-12 tracking-wider uppercase mt-4 transform transition-transform duration-75 ease-in hover:scale-105 focus:outline-none"
                                onClick={handleSignUpClick}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
