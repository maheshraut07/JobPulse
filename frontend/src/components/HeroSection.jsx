import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="flex flex-col gap-12 my-12 px-10">
      {/* Main Hero Section */}
      <div className="flex flex-col gap-8 items-center">
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#1A73E8] font-medium">
          Discover Your Career Journey
        </span>
        <h1 className="text-5xl font-bold text-center">
          Find, Apply & <br /> Get Hired at the{" "}
          <span className="text-[#FF5722]">Best Companies</span>
        </h1>
        <p className="text-gray-600 text-center">
          Your dream job is just a click away. Start now and shape your future
          with confidence!
        </p>
        <div className="flex w-full max-w-lg shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
          <input
            type="text"
            placeholder="Search for jobs, companies, or skills"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-gray-700"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#FF5722]"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Second Section: Aligned in Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold text-[#1A73E8] mb-4">
            Fast-Track Your Career
          </h2>
          <p className="text-gray-600">
            Gain access to exclusive job listings, expert career advice, and
            tools to build the career you've always wanted.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <h2 className="text-3xl font-bold text-[#FF5722] mb-4">
            Join a Thriving Community
          </h2>
          <p className="text-gray-600">
            Become part of a global network of professionals who found success
            through our platform. The future is yours—make it happen today!
          </p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      {!user ? (
        <div className="flex flex-col items-center bg-gray-100 py-6">
          <h2 className="text-4xl font-bold text-[#1A73E8] mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Create an account, upload your resume, and start applying for jobs
            that match your skill set. Your future starts here!
          </p>
          {/* If you want to display something from the `user` object, make sure it's valid JSX */}
          <div>{user.name}</div>{" "}
          {/* Example usage if `user` has a `name` field */}
          <Button
            onClick={() => navigate("/signup")}
            className="bg-[#FF5722] text-white px-6 py-3 rounded-full"
          >
            Get Started
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default HeroSection;
