"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/components/loader/loader";
import "react-toastify/dist/ReactToastify.css";

const Stats = () => {
  const [loader, setLoader] = useState(false);
  const [clipboardText, setClipboardText] = useState("");
  const [data, setdata] = useState("");

  const HandleGetStats = async () => {
    if(clipboardText === ''){
      return
    }
    setClipboardText("");
    setLoader(true);
    try {
      const response = await fetch(
        `https://url-shortener-1-8elk.onrender.com/url/clicks/${clipboardText}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const ResJson = await response.json();
      if (response.ok) {
        setdata(ResJson.data);
        setLoader(false);
      } else {
        console.log(ResJson.errorDetails.debugMessage);
        toast.error(ResJson.errorDetails.debugMessage);
        setLoader(false);
      }
    } catch (error) {
      toast.error("Not a Valid URL Key");
      setLoader(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardText(text);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  return (
    <div className="flex flex-col select-none bg-slate-300 h-screen">
      <ToastContainer />
      <Navbar />
      <div className="lg:text-3xl text-2xl text-center mt-10 font-cavaet">
        Free URL Shortner
      </div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex lg:flex-row flex-col items-center justify-center mt-5 p-10 ">
            <div
              onClick={() => handlePaste()}
              className="lg:w-2/12 text-center font-cavaet bg-amber-100 p-2 hover:bg-amber-200 hover:cursor-pointer w-[100%] rounded-t-lg lg:rounded-none lg:rounded-l-lg"
            >
              PASTE
            </div>
            <div className="lg:w-8/12 w-[100%] bg-white ">
              <input
                value={clipboardText}
                onChange={(e) => setClipboardText(e.target.value)}
                className=" border-none outline-none p-2 w-[100%] text-center"
                placeholder="Enter URL Key"
              />
            </div>
            <div
              onClick={() => HandleGetStats()}
              className="lg:w-2/12 text-center font-cavaet p-2 bg-amber-100  hover:bg-amber-200 hover:cursor-pointer w-[100%] rounded-b-lg lg:rounded-none lg:rounded-r-lg"
            >
              Get Stats
            </div>
          </div>
          {data === "" ? (
            <></>
          ) : (
            <div>
              <div className="flex lg:flex-col flex-col items-center justify-center w[100%] p-10">
                <div className="bg-gray-100 h-10 flex w-full flex-row items-center justify-center rounded-lg m-2">
                  <p className="flex font-cavaet text-1xl bg-amber-100 h-[100%] min-w-[50%] mr-auto  items-center justify-center rounded-l-lg ">
                    <span className="ml-3">No of Clicks</span>
                  </p>
                  <div className="ml-2 max-w-[70%] max-h-[full] overflow-hidden truncate select-text">
                    <span className=" text-center max-w-[70%] mr-10">
                      {data}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Stats;
