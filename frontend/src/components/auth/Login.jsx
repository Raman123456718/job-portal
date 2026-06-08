import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password || !input.role) {
            return toast.error("Please fill all fields");
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
            }

        } catch (error) {
            console.error("Login Error:", error);

            if (!navigator.onLine) {
                toast.error("No internet connection. Please check your network.");
            }
            else if (error.response) {
                switch (error.response.status) {
                    case 400:
                        toast.error(
                            error.response.data.message ||
                            "Please fill all required fields."
                        );
                        break;

                    case 401:
                        toast.error(
                            error.response.data.message ||
                            "Invalid email or password."
                        );
                        break;

                    case 403:
                        toast.error("Access denied.");
                        break;

                    case 404:
                        toast.error("User not found.");
                        break;

                    case 500:
                        toast.error("Server error. Please try again later.");
                        break;

                    case 502:
                        toast.error(
                            "Server is waking up. Please wait a few seconds and try again."
                        );
                        break;

                    default:
                        toast.error(
                            error.response.data.message ||
                            "Something went wrong."
                        );
                }
            }
            else if (error.request) {
                toast.error(
                    "Unable to connect to server. Please try again later."
                );
            }
            else {
                toast.error(
                    error.message ||
                    "An unexpected error occurred."
                );
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

   return (
  <div className="min-h-screen bg-gradient-to-r from-violet-100 via-white to-orange-100 flex items-center justify-center px-4">
    <div className="flex w-full max-w-6xl items-center justify-between gap-10">

      {/* Left Section */}
      <div className="hidden lg:block flex-1">
        <h1 className="text-6xl font-bold text-[#6A38C2] leading-tight">
          Welcome <br /> Back
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-md">
          Log in to access your profile, applications, and discover new career opportunities.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
          alt="login"
          className="w-80 mt-8"
        />
      </div>

      {/* Login Form */}
      <div className="flex-1 flex justify-center">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#6A38C2]">
              Login
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back to JobPortal
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Enter your email"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Role</Label>

              <div className="flex gap-6 mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                  />
                  Student
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                  />
                  Recruiter
                </label>
              </div>
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-6" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-[#6A38C2] hover:bg-[#5a2db0]"
            >
              Login
            </Button>
          )}

          <p className="text-center mt-5 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#6A38C2] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
);

}

export default Login;