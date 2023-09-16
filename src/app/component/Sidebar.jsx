"use client";
import React from "react";
import { useState, useRef } from "react";

function Sidebar({ children }) {
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(360);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      ref={sidebarRef}
      className="app-sidebar pt-4"
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
      key="sidebar"
    >
      <div className="app-sidebar-content overflow-y-scroll flex flex-wrap gap-4 justify-start items-start px-4  ">
        {children}
      </div>
      <div className="app-sidebar-resizer" onMouseDown={startResizing}></div>
    </div>
  );
}

export default Sidebar;
