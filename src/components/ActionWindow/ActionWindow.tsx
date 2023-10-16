import { useEffect, useRef, useState } from "react";
import "./actionWindow.css";
import Categories from "../Categories/Categories";

const ActionWindow = ({ zoom }: { zoom: number }) => {
  const actionConRef = useRef<HTMLDivElement>(null);
  const draggableConRef = useRef<HTMLUListElement>(null);
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const box = draggableConRef.current;
    box!.style.top = "100px";
    box!.style.left = "45%";
  }, []);

  useEffect(() => {
    if (!draggableConRef.current || !actionConRef.current) return;

    const box = draggableConRef.current;
    const container = actionConRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, []);

  interface Data {
    id: number;
    text: string;
    subCat: Data[];
  }

  const [data, setData] = useState<Data[]>([
    {
      id: 1,
      text: "Categories",
      subCat: [],
    },
  ]);

  useEffect(() => {
    generateCategoryColor(data);
  }, [data]);

  const characters = "0123456789ABCDEF";

  const generateBgColors = () => {
    const colorCount = 10;
    const darkColors = [];

    for (let i = 0; i < colorCount; i++) {
      let color = "#";

      for (let j = 0; j < 6; j++) {
        color += characters[Math.floor(Math.random() * characters.length)];
      }

      darkColors.push(color);
    }
    return darkColors[0];
  };

  const generateCategoryColor = (data: Data[]) => {
    let color = generateBgColors();
    data.map((parent) => {
      const element = document.querySelectorAll(
        `[data-category-id="${parent.id}"]`
      );

      element.forEach((child: Element) => {
        if (child instanceof HTMLParagraphElement) {
          if (child.style.backgroundColor !== "") {
            color = child.style.backgroundColor;
          }
          if (child.style.backgroundColor === "") {
            child.style.backgroundColor = color;
          }
        }
      });
      if (parent.subCat) {
        generateCategoryColor(parent.subCat);
      }
    });
  };

  const scrollUp = (): void => {
    if (draggableConRef) {
      let top: Number =
        Number(`${draggableConRef.current?.style.top.slice(0, -2)}`) - 10;
      draggableConRef.current!.style.top = top + "px";
    }
  };
  const scrollUDown = (): void => {
    if (draggableConRef) {
      let bottom: Number =
        Number(`${draggableConRef.current?.style.top.slice(0, -2)}`) + 10;
      draggableConRef.current!.style.top = bottom + "px";
    }
  };
  const scrollLeft = (): void => {
    if (draggableConRef) {
      let left: Number =
        Number(`${draggableConRef.current?.style.left.slice(0, -2)}`) - 10;
      draggableConRef.current!.style.left = left + "px";
    }
  };
  const scrollRight = (): void => {
    if (draggableConRef) {
      let right: Number =
        Number(`${draggableConRef.current?.style.left.slice(0, -2)}`) + 10;
      draggableConRef.current!.style.left = right + "px";
    }
  };

  return (
    <div className="action-container" ref={actionConRef}>
      <button className="scroll-btn top" onClick={scrollUp}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="action-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
      <button className="scroll-btn bottom" onClick={scrollUDown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="action-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <button className="scroll-btn left" onClick={scrollLeft}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="action-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button className="scroll-btn  right" onClick={scrollRight}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="action-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <ul id="window" ref={draggableConRef} style={{ zoom }}>
        {data.map((category) => (
          <Categories
            category={category}
            data={data}
            setData={setData}
            key={category.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default ActionWindow;
