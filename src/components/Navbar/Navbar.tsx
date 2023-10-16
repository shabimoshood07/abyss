import React, { useState } from "react";
import "./navbar.css";
const Navbar = ({
  zoom,
  setZoom,
}: {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [percentageZoom, setPercentageZoom] = useState<string>("100%");
  const zoomLevel: number[] = [
    0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5,
  ];

  const zoomIn = () => {
    if (zoom >= 1) {
      let num = Number((zoom + 0.25).toFixed(2));
      return setZoom(num);
    }
    if (zoom >= 0.3) {
      let num = Number((zoom + 0.1).toFixed(2));
      return setZoom(num);
    }
    if (zoom === 0.25) {
      let num = Number((zoom + 0.05).toFixed(2));
      return setZoom(num);
    }
  };

  const zoomOut = () => {
    if (zoom === 0.3) {
      let num = Number((zoom - 0.05).toFixed(2));
      return setZoom(num);
    }
    if (zoom <= 1) {
      let num = Number((zoom - 0.1).toFixed(2));
      return setZoom(num);
    }
    if (zoom <= 1.5) {
      let num = Number((zoom - 0.25).toFixed(2));
      return setZoom(num);
    }
  };

  const normalZoom = () => setZoom(1);
  return (
    <header>
      <nav>
        <a href="/">
          <button className="logo-btn">Services</button>
        </a>

        <div className="control-btn">
          <div className="view-controls">
            <button>list view</button>
            <button onClick={normalZoom}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </div>

          <div className="zoom-controls">
            <button onClick={zoomOut} disabled={zoom === 0.25}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </button>
            <div className="zoom-select">
              <select
                name="select"
                id="select"
                onChange={(e) => setZoom(Number(e.target.value))}
                value={zoom}
              >
                {zoomLevel.map((zoom) => (
                  <option value={zoom} key={zoom} onClick={() => setZoom(zoom)}>
                    {zoom * 100}%
                  </option>
                ))}
              </select>
            </div>
            <button onClick={zoomIn} disabled={zoom === 1.5}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
