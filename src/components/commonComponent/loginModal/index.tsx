import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { isMobile } from "../../../utils/screenDimension";
import { useEffect } from "react";
//import LazyLoad from "react-lazyload";
import "./style.scss";

const ImageModal = ({ customClass, show, setShow }) => {
  const { bannerImage } = useSelector((state: RootState) => state.user.profile);

  // interface LazyImageProps {
  //   src: string;
  //   alt?: string;
  //   className?: string;
  //   height?: number | string; // for LazyLoad height prop
  //   offset?: number; // for LazyLoad offset prop
  //   placeholder?: React.ReactNode; // optional placeholder
  // }

  // const LazyImage: React.FC<LazyImageProps> = ({
  //   src,
  //   alt = "image",
  //   className = "",
  //   height = "auto",
  //   offset = 100,
  //   placeholder = <div style={{ height: "200px", background: "#ccc" }} />,
  // }) => {
  //   return (
  //     <LazyLoad height={height} offset={offset} placeholder={placeholder}>
  //       <div style={{ width: "100%" }}>
  //         <img src={src} alt={alt} className={className} loading="lazy" />
  //       </div>
  //     </LazyLoad>
  //   );
  // };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "scroll";
    return () => {};
  }, [show]);

  return isMobile
    ? show && (
        <div
          className={`customModal-overlay ${
            isMobile ? "fullscreen-modal" : customClass
          }`}
        >
          {bannerImage?.value && (
            <div
              className="w-100 d-flex  justify-content-end bg-primary rounded-0 "
            >
              <button
              onClick={() => setShow(false)}
                type="button"
                className="btn-close btn-close-white p-2"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div
            className="p-0 modal-body2 overflow-auto"
            style={{ width: "100%", overflowY: "auto" }}
          >
            {bannerImage ? (
              <img
                src={"data:image/png;base64," + bannerImage?.value}
                alt="Modal Content"
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <div
                style={{
                  minHeight: "800px",
                  background: "#000",
                }}
              ></div>
            )}
          </div>
        </div>
      )
    : show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            //alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)", // Optional overlay
            zIndex: 1050, // Ensures it appears on top of other elements
            paddingTop: "5px",
          }}
        >
          <div className={`modal-custom2 `}>
            <div
              className="modal-header bg-primary w-100 d-flex  justify-content-end"
              style={{ padding: "0.75rem 1rem", cursor: "pointer" }}
              onClick={() => setShow(false)}
            >
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                style={{ right: "1rem", top: "0.5rem" }}
              ></button>
            </div>
            <div
              className="p-0 w-100 overflow-auto"
              style={{ maxHeight: "90vh" }}
            >
              {bannerImage ? (
                <img
                  src={"data:image/png;base64," + bannerImage?.value}
                  alt="Modal Content"
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <div className="blackscreen"></div>
              )}
              {/* <LazyImage
                //src={"data:image/png;base64," + bannerImage?.value}
                src=""
                alt="Modal Content"
                className="img-fluid"
                height="auto"
                placeholder={
                  <div style={{ minHeight: "300px", background: "#000" }}>
                    Loading...
                  </div>
                }
              /> */}
            </div>
          </div>
        </div>
      );
};

// ImageModal.propTypes = {
//   imageUrl: PropTypes.string.isRequired,
// };

export default ImageModal;
