import React from "react";
import { useState } from "react";

interface SliderProps {
    images: { src: string; text: string }[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) return null;

    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: "300px",
            overflow: "hidden",
            borderRadius: "8px"
        }}>
            <div
                style={{
                    backgroundImage: `url(${images[current].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div style={{
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: "16px 24px",
                    borderRadius: "4px",
                    fontSize: "1.5rem",
                    textAlign: "center"
                }}>
                    {images[current].text}
                </div>
            </div>
            <button
                onClick={prevSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "16px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer"
                }}
                aria-label="Previous"
            >
                &#8592;
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "16px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer"
                }}
                aria-label="Next"
            >
                &#8594;
            </button>
        </div>
    );
};

export default Slider;