// import React from 'react';

// const ArrowIcon = () => {
//   const scrollToBottom = () => {
//     window.scrollTo({
//       top: document.body.scrollHeight,
//       behavior: 'smooth' // Add smooth scroll behavior
//     });
//   };

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//       fill="#000" // Change the fill color to black
//       className="h-8 w-8 absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer" // Increase size and add padding, change cursor to pointer
//       onClick={scrollToBottom} // Add onClick event handler to scroll to bottom
//     >
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M0 0 L10 10 L20 0 Z"
//       />
//     </svg>
//   );
// };

// export default ArrowIcon;
// import React from 'react';

// const ArrowIcon = () => {
//   const scrollToBottom = () => {
//     window.scrollTo({
//       top: document.body.scrollHeight,
//       behavior: 'smooth' // Add smooth scroll behavior
//     });
//   };

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//       fill="#000" // Change the fill color to black
//       className="h-8 w-8 absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer" // Increase size and add padding, change cursor to pointer
//       onClick={scrollToBottom} // Add onClick event handler to scroll to bottom
//     >
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M0 0 L10 10 L20 0 Z"
//       />
//     </svg>
//   );
// };

// export default ArrowIcon;
import React, { useState, useEffect } from 'react';

const ArrowIcon = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > 0); // Update state based on scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  const scrollOnePage = (direction) => {
    const pageHeight = window.innerHeight; // Get viewport height

    // Calculate scroll amount based on direction (up or down)
    const scrollAmount = direction === 'up' ? -pageHeight : pageHeight;

    window.scrollTo({
      top: window.scrollY + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="h-8 w-8 absolute right-4 bottom-4 transform cursor-pointer"
      onClick={() => scrollOnePage(isScrolledDown ? 'up' : 'down')} // Dynamically call scroll based on direction
    >
      {/* Choose any of the following arrow path options */}
      {/* Option 1: Enhanced Default SVG with Fills and Stroke */}
      {/* <path d="M10 15l4.646-4.646a.5.5 0 0 0-.708-.708L10 12.293 5.354 7.646a.5.5 0 1 0-.708.708L10 14.5z" /> */}

      {/* Option 2: More Modern Triangle with Slight Gradient */}
      {/* <path d="M10 5l5 5-5 5z" /> */}

      {/* Option 3: Playful Double Arrow (Optional) */}
      {isScrolledDown ? (
        <>
          <path d="M5 10l5 5 5-5" />
        </>
      ) : (
        <>
          <path d="M10 15l5-5-5-5" />
        </>
      )}
    </svg>
  );
};

export default ArrowIcon;
