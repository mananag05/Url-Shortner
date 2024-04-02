"use client";

import { useState } from "react";
import Loader from "../loader/loader";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";

const MainCompo = () => {
  const [clipboardText, setClipboardText] = useState("");
  const [ShortData, setShortData] = useState("");
  const [loader, setLoader] = useState(false);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardText(text);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  

  const HandleShorten = async () => {
    if (
      clipboardText === "" ||
      !/^(http:\/\/|https:\/\/)/.test(clipboardText)
    ) {
      toast.error("Please enter a valid URL String");
      return;
    }
    setLoader(true);
    setClipboardText("");
    try {
      const response = await fetch(
        "https://url-shortener-1-8elk.onrender.com/url/shorten",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ url: clipboardText }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        console.log();
        setShortData(json.data);
      } else {
        toast.error("Some Error Occured");
      }
    } catch (err) {
      console.log("Some Error Occured", err);
    }
    setLoader(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied To Clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-[50%]  font-mono m-2 mt-5">
      <div className="lg:text-3xl text-2xl text-center mt-10 font-cavaet">
        Free URL Shortner
      </div>
      {loader ? (
        <Loader className="text-amber-300" />
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
                placeholder="Enter Link"
              />
            </div>
            <div
              onClick={HandleShorten}
              className="lg:w-2/12 text-center font-cavaet p-2 bg-amber-100  hover:bg-amber-200 hover:cursor-pointer w-[100%] rounded-b-lg lg:rounded-none lg:rounded-r-lg"
            >
              SHORTEN URL
            </div>
          </div>
          {ShortData === "" ? (
            <></>
          ) : (
            <div>
              <div className="flex lg:flex-col flex-col items-center justify-center w[100%] p-10">
                <div className="bg-gray-100 h-10 flex w-full flex-row items-center justify-center rounded-lg m-2">
                  <p className=" hidden lg:flex font-cavaet text-1xl bg-amber-100 h-[100%]  items-center justify-center rounded-l-lg ">
                    <span className="ml-6 mr-10">Short Link</span>
                  </p>
                  <div className="ml-2 max-w-[70%] lg:max-w-[50%] max-h-[full] overflow-hidden truncate select-text">
                    <span className=" max-w-[70%]">{ShortData.shortLink}</span>
                  </div>
                  <div className="w-[20%] h-full flex bg-orange-200 rounded-r-lg items-center justify-center ml-auto">
                    <FaRegCopy
                      onClick={() => copyToClipboard(ShortData.shortLink)}
                      className="text-2xl hover:cursor-pointer"
                    />
                  </div>
                </div>
                <div className="bg-gray-100 h-10 flex w-full flex-row items-center justify-center rounded-lg m-2">
                  <p className="flex font-cavaet text-1xl bg-amber-100 h-[100%]  items-center justify-center rounded-l-lg ">
                    <span className="ml-6 mr-12">URL Key</span>
                  </p>
                  <div className="ml-2 max-w-[70%] lg:max-w-[50%] max-h-[full] overflow-hidden truncate select-text">
                    <span className=" text-center max-w-[70%]">
                      {ShortData.shortLink.split("redirect/")[1]}
                    </span>
                  </div>
                  <div className="w-[20%] h-full flex bg-orange-200 rounded-r-lg items-center justify-center ml-auto">
                    <FaRegCopy
                      onClick={() => copyToClipboard(ShortData.shortLink.split("redirect/")[1])}
                      className="text-2xl hover:cursor-pointer"
                    />
                  </div>
                </div>
                <div className="bg-gray-100 h-10 flex w-full flex-row items-center justify-center rounded-lg m-2">
                  <p className="flex font-cavaet text-1xl bg-amber-100 h-[100%] min-w-[50%] mr-auto  items-center justify-center rounded-l-lg ">
                    <span className="ml-3">Expires On</span>
                  </p>
                  <div className="ml-2 max-w-[70%] max-h-[full] overflow-hidden truncate select-text">
                    <span className=" text-center max-w-[70%] mr-10">
                      {new Date(ShortData.expirationDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
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

export default MainCompo;
