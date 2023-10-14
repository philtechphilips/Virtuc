import React from "react";
import { COLORS } from "../constants/data";
import { useState } from "react";
import "./table.scss";
import useAuthContext from "../../main/context/AuthContext";
import axios from "../../main/api/axios";
import FlashMessage from "../components/FlashMessage";

const Sections = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleHideMessage = () => {
    setSuccess("");
  };

  const { user } = useAuthContext();
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  function handleSubmit(event) {
    event.preventDefault();
    const AddEvent = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "/create-event",
          {
            name,
            startDate,
            endDate,
          },
          { headers }
        );
        if (response.status === 200) {
          setName("");
          setStartDate("");
          setEndDate("");
          setErrors([]);
          setSuccess(response.data.message);
        }
      } catch (e) {
        // console.log(e)
        if (e.response.status === 422) {
          setErrors(e.response.data.errors);
        }
      } finally {
        setIsLoading(false);
      }
    };
    AddEvent();
  }

  return (
    <div className="pb-20 w-full h-screen p-5 pt-24 md:p-10">
      <div className="bg-white p-5">
        <div className="flex w-full md:w-1/2 justify-between items-center">
          <h1 className="text-lg font-semibold mb-4">Academic Section/Term</h1>
        </div>

        <form onSubmit={handleSubmit} className="md:w-1/2 w-full">
          {success != "" && (
            <FlashMessage
              type="success"
              message={success}
              onHideMessage={handleHideMessage}
            />
          )}
          <div className="w-full flex flex-wrap justify-between">
            <div className="mb-4 mt-4 w-full pr-3">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                Section:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Academic Section"
                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name[0]}</p>
              )}
            </div>

            <div className="mb-4 mt-4 w-full pr-3">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                Term:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Term"
                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name[0]}</p>
              )}
            </div>


            <div className="mb-4 mt-4 w-full pr-3">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                Start Date:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Enter Phone Number"
                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate[0]}</p>
              )}
            </div>

            <div className="mb-4 mt-4 w-full pr-3">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                End Date:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Enter Phone Number"
                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate[0]}</p>
              )}
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            style={{
              backgroundColor: COLORS.primary,
              color: "#fff",
              borderRadius: "3px",
            }}
            className={`text-sm font-medium p-3 hover:drop-shadow-xl pl-5 pr-5`}
          >
            {isLoading ? (
              <div className="flex items-center px-3">
                <div className=" inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-white"></div>
                </div>{" "}
                <span className="text-sm font-medium ml-2">Submitting..</span>
              </div>
            ) : (
              "Schedule Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sections;
