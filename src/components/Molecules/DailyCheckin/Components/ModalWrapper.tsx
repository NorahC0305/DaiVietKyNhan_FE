import React, { memo, useEffect } from "react";

const ModalWrapper: React.FC<ICOMPONENTS.ModalWrapperProps> = memo(
  ({ isOpen, onClose, children, title = "Sổ Điểm Danh", className = "" }) => {
    // Handle escape key - chỉ đóng bằng ESC hoặc nút X
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div className={`fixed inset-0 z-50 ${className}`}>
        {/* Backdrop - Cho phép click xuyên qua */}
        <div
          className="absolute inset-0 bg-transparent"
          style={{ pointerEvents: "none" }}
        />

        {/* Modal Content Container */}
        <div className="relative h-full flex items-center justify-center pt-28 pb-8 px-2 sm:px-4 md:px-6 lg:px-8 pointer-events-none">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto pointer-events-auto">
            {/* Modal Content */}
            <div className="relative">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

ModalWrapper.displayName = "ModalWrapper";

export default ModalWrapper;
