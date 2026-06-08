import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0],
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Frontend Validation
        if (
            !input.fullname ||
            !input.email ||
            !input.phoneNumber ||
            !input.password ||
            !input.role
        ) {
            return toast.error("Please fill all required fields.");
        }

        const formData = new FormData();

        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(
                    res.data.message || "Account created successfully!"
                );

                navigate("/login");
            }
        } catch (error) {
            console.error("Signup Error:", error);

            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        toast.error(
                            error.response.data.message ||
                            "Invalid input data."
                        );
                        break;

                    case 401:
                        toast.error("Unauthorized access.");
                        break;

                    case 403:
                        toast.error("Access denied.");
                        break;

                    case 404:
                        toast.error("Service not found.");
                        break;

                    case 409:
                        toast.error(
                            error.response.data.message ||
                            "User already exists."
                        );
                        break;

                    case 500:
                        toast.error(
                            "Server error. Please try again later."
                        );
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
            } else if (error.request) {
                toast.error(
                    "Unable to connect to server. Check your internet connection."
                );
            } else {
                toast.error(
                    error.message || "Signup failed."
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
                        Find Your <br /> Dream Job
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-md">
                        Join thousands of candidates and recruiters on JobPortal.
                        Create your account and start your career journey today.
                    </p>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="job portal"
                        className="w-80 mt-8"
                    />
                </div>

                {/* Signup Form */}
                <div className="flex-1 flex justify-center">
                    <form
                        onSubmit={submitHandler}
                        className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-[#6A38C2]">
                                Create Account
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Join JobPortal today
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label>Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className="mt-1"
                                />
                            </div>

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
                                <Label>Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
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
                                    placeholder="Enter password"
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

                            <div>
                                <Label>Profile Photo</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="mt-1 cursor-pointer"
                                />
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
                                Create Account
                            </Button>
                        )}

                        <p className="text-center mt-5 text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#6A38C2] font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;