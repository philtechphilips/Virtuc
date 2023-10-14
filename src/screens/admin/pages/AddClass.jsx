import React, { useEffect } from "react";
import { COLORS } from "../constants/data";
import { useState } from "react";
import "./table.scss";
import useAuthContext from "../../main/context/AuthContext";
import axios from "../../main/api/axios";
import FlashMessage from "../components/FlashMessage";

const AddClass = () => {
  const [section, setSection] = useState("");
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [getSection, setGetSection] = useState([]);
  const [getTeachers, setGetTeachers] = useState([]);
  const [isFetchingTeacher, setIsFetchingTeacher] = useState(true);
  const [isFetchingSection, setIsFetchingSection] = useState(true);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/sections", { headers })
      .then((response) => {
        setGetSection(response.data);
        setIsFetchingSection(false)
        // console.log(response.data);
      })
      .catch((error) => {
        setIsFetchingSection(false)
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/all-staff", { headers })
      .then((response) => {
        setGetTeachers(response.data);
        setIsFetchingTeacher(false)
        // console.log(response.data);
      })
      .catch((error) => {
        setIsFetchingTeacher(false)
        console.error(error);
      });
  }, []);

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
    const addClass = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "/add-class",
          {
            section, className, teacher
          },
          { headers }
        );
        if (response.status === 200) {
          setSection("");
          setClassName("");
          setTeacher("");
          setErrors([]);
          setSuccess(response.data.message);
        }
      } catch (e) {
        if (e.response.status === 422) {
          setErrors(e.response.data.errors);
        }
      } finally {
        setIsLoading(false);
      }
    };
    addClass();
  }

  return (
    <div className="pb-20 w-full h-screen p-5 pt-24 md:p-10">
      <div className="bg-white p-5">
        <div className="flex w-full md:w-1/2 justify-between items-center">
          <h1 className="text-lg font-semibold mb-4">Add Class</h1>
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
                Class:
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Enter New Class"
                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.className && (
                <p className="text-sm text-red-500">{errors.className[0]}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between">
            <div className="mb-4 mt-4 w-full pr-3">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                Section:
              </label>
              <select value={section}
                onChange={(e) => setSection(e.target.value)} className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {isFetchingSection && (
                  <option value="" disabled>
                    Loading sections...
                  </option>
                )}
                {!isFetchingSection && (
                  <>
                    <option value="" disabled>Select section</option>
                    {getSection.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.section}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {errors.section && (
                <p className="text-sm text-red-500">{errors.section[0]}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between">
            <div className="mb-4 mt-4 w-full pr-3">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                Class Teacher:
              </label>
              <select value={teacher} onChange={(e) => setTeacher(e.target.value)} className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {isFetchingTeacher && (
                  <option value="" disabled >
                    Loading teachers...
                  </option>
                )}
                {!isFetchingTeacher && (
                  <>
                    <option value="" disabled>Select a teacher</option>
                    {getTeachers.map((item, index) => (
                      item.role === 'teacher' && (
                      <option key={index} value={item.id}>
                        {item.surname + " " + item.firstname}
                      </option>)
                    ))}
                  </>
                )}
              </select>
              {errors.teacher && (
                <p className="text-sm text-red-500">{errors.teacher[0]}</p>
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
            className={`text-sm font-medium p-3 hover:drop-shadow-xl pl-5 pr-5 ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center px-3">
                <div className=" inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-white"></div>
                </div>{" "}
                <span className="text-sm font-medium ml-2">Submitting..</span>
              </div>
            ) : (
              "Add New Class"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
