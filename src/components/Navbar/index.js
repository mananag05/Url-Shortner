"use client"

import { MdSwitchAccessShortcutAdd } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import  { toggle } from "@/redux/slices/sidebar";
import { motion , useAnimationControls} from 'framer-motion'
import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

    const ContainerConsts = {
        close : {
            width : "0rem",
            transition : {
                type : "spring",
                damping : "15",
                duration : "0.5",
            }
        },
        open : {
            width : "13rem",
            transition : {
                type : "spring",
                damping : "15",
                duration : "0.5"
            }

        }
    }

  const SideNav = useSelector((state) => state.SIDENAV);
  const dispatch = useDispatch();

  const ContainerControls = useAnimationControls();

  useEffect(() => {
    if(SideNav){
        ContainerControls.start("open")
    } else {
        ContainerControls.start("close")
    }
}, [SideNav])

  const HandleSideBarToggle = () => {
    dispatch(toggle());
  };

  return (
    <div className="flex flex-row items-center p-2 m-2 bg-amber-100 rounded-md ">
      <span className="font-mono font-black flex flex-row items-center ">
        <MdSwitchAccessShortcutAdd className="mr-2 text-3xl" />
        <span>Url Shortner</span>
      </span>
      <div className="lg:flex lg:flex-row font-mono lg:flex-1 lg:items-center lg:justify-center hidden mr-24 font-cavaet">
        <span onClick={() => router.push('/')} className="hover:cursor-pointer mr-5">HOME</span>
        <span onClick={() => router.push('/stats')} className="hover:cursor-pointer mr-5">STATS</span>
      </div>
      <IoReorderThreeOutline
        onClick={() => HandleSideBarToggle()}
        className="lg:hidden text-3xl mr-3 ml-auto hover:cursor-pointer"
      />
     
        <div>
          {SideNav ? (<div onClick={HandleSideBarToggle} className="fixed top-0 left-0 w-[100%] h-[100%] bg-zinc-950 bg-opacity-25 z-1 lg:hidden"></div>) : (<></>)}
          <motion.div
                        animate={ContainerControls}
                        className="fixed top-0 right-0 h-[100%] z-50 bg-zinc-300 border-l-2 lg:hidden font-mono text-nowrap overflow-hidden"
                        variants={ContainerConsts} 
                        initial="close"
          >
            <div className="flex flex-row items-center ml-3 mt-2">
            <span onClick={HandleSideBarToggle} className="text-base hover:cursor-pointer"> Close menu</span>
            <IoIosArrowForward className="text-base"/>
            </div>
            <div className="flex flex-col mt-5 items-center font-cavaet">
                    <span  onClick={() => {router.push('/'); dispatch(toggle())}} className="p-3 hover:cursor-pointer">
                        HOME
                    </span>
                    <span  onClick={() => {router.push('/stats'); dispatch(toggle())}} className="p-3 hover:cursor-pointer">
                        STATS
                    </span>
            </div>
          </motion.div>
        </div>
    </div>
  );
};

export default Navbar;
