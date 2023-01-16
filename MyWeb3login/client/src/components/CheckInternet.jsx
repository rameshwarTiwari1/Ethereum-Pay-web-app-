import React from "react";
import { Detector } from "react-detect-offline";
import img from "../assets/images/icons8-wi-fi-off-100.png";
import "./allcompo.css";
import { ToastContainer, toast } from "react-toastify";
import toastIcon from "../assets/images/icons8-wi-fi-off-100.png";

// const toastNet = () => {
//   try {
//     if (toast != null) {
//       ToastContainer.clear()
//     } else {
//       toast = toast.makeText("No Internet Connection");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const CheckInternet = (props) => {
  return (
    <div>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div className="toast-img" style={{ paddingTop: "10px" }}>
              <img className="wifi-img" src={img}></img>
              <ToastContainer />
              <div
                className="text-white"
                children={
                  toast.warning("No Internet Connection", {
                    toastId: "success1",

                    // icon: { toastIcon },
                  })
                  // toast.clear()
                }></div>

              <h1 className="wifi-text text-center" style={{ margin: "0" }}>
                No Internet Connection
                <br />
                Please Connect Internet to see the Transaction history
              </h1>
            </div>
          )
        }
      />
      {/* <ToastContainer />
      <Detector
        render={({ online }) =>
          online ? props.children : toast.warning("No Internet Connection!")
        }
      /> */}
    </div>
  );
};

export default CheckInternet;
