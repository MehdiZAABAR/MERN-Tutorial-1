// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const HomeContent = () => {
// //   const imageUrls = [
// //     '/systems/Over Large Water Basins.jpg',
// //     '/systems/Pipes-Horizontal.jpg',
// //     '/systems/Pipes-inclined-farming.jpg',
// //     '/systems/Polystyrene FoamTrays.png',
// //     '/systems/SmallPipedSystemHorizontal.png',
// //     '/systems/Tour Farm.png',
// //     '/systems/Tour Medium Size.png',
// //   ];
// const imageUrls = [
//     '/Carousel/1.png',
//     '/Carousel/2.png',
//     '/Carousel/3.png',
//     '/Carousel/4.png',
//     '/Carousel/5.png',
//     '/Carousel/6.png',
//     '/Carousel/7.png',
//   ];

//   return (
//     <div className="bg-gradient-to-b from-green-200 to-green-400 min-h-screen">
//     <div className="bg-green-600 text-white py-4 px-8 text-3xl font-bold text-center">Easy Hydro© For All Gardening Enthousiasts</div>
//     <div className="flex">
//       <div className="flex-1 p-8">
//         <p className="text-lg leading-relaxed">
//           Hydroponics offers a game-changer for plant cultivation. Unlike traditional soil-based methods, hydroponics provides adaptable setups that cater to diverse spaces and preferences.

//           <ul className="list-disc pl-8 mt-4">
//             <li>
//               <strong>Horizontal PVC Pipe Systems:</strong> Picture rows of PVC pipes mounted above a table, cradling your plants. This space-saving design is perfect for smaller areas.
//             </li>
//             <li>
//               <strong>Vertical Gardens:</strong> Think of plants thriving in towers positioned directly above a water reservoir. This maximizes vertical space and creates a stunning visual impact.
//             </li>
//             <li>
//               <strong>Inclined Systems with Wood Support:</strong> These setups utilize angled PVC pipes supported by wooden structures, offering a unique and functional approach.
//             </li>
//           </ul>

//           Hydroponics doesn't stop there. Large water basin systems are another option, where plants rest on buoyant polystyrene plates. In these setups, water circulation is ensured through pumps or air stones, keeping your plants oxygenated.

//           By embracing these diverse hydroponic configurations, you can overcome space limitations and cultivate your plants efficiently, regardless of your gardening goals.
//         </p>
//       </div>
//       <div className="flex-1 p-8">
//         <Carousel
//           showArrows={true}
//           autoPlay={true}
//           infiniteLoop={true}
//           stopOnHover
//           showStatus={false} // Hide status bar
//           showThumbs={false} // Hide thumbnail navigation
//           emulateTouch={true} // Enable touch emulation for non-touch devices
//           swipeable={true} // Allow swipe navigation
//           interval={5000} // Set autoplay interval
//           className="h-auto"
//         >
//           {imageUrls.map((imageUrl, index) => (
//             <div key={index} className="carousel-item">
//               <img
//                 src={imageUrl}
//                 alt="Hydroponic System"
//                 className="w-full h-auto"
//               />
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default HomeContent;
// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const HomeContent = () => {
//   const imageUrls = [
//     '/Carousel/1.png',
//     '/Carousel/2.png',
//     '/Carousel/3.png',
//     '/Carousel/4.png',
//     '/Carousel/5.png',
//     '/Carousel/6.png',
//     '/Carousel/7.png',
//   ];

//   return (
//     <div style={{ background: 'linear-gradient(to bottom, rgb(144, 238, 144), rgb(34, 139, 34))' }} className="min-h-screen">
//       <div className="bg-green-600 text-white py-4 px-8 text-3xl font-bold text-center">Easy Hydro© For All Gardening Enthusiasts</div>
//       <div className="flex">
//         <div className="flex-1 p-8">
//           <p className="text-lg leading-relaxed">
//             Hydroponics offers a game-changer for plant cultivation. Unlike traditional soil-based methods, hydroponics provides adaptable setups that cater to diverse spaces and preferences.

//             <ul className="list-disc pl-8 mt-4">
//               <li>
//                 <strong>Horizontal PVC Pipe Systems:</strong> Picture rows of PVC pipes mounted above a table, cradling your plants. This space-saving design is perfect for smaller areas.
//               </li>
//               <li>
//                 <strong>Vertical Gardens:</strong> Think of plants thriving in towers positioned directly above a water reservoir. This maximizes vertical space and creates a stunning visual impact.
//               </li>
//               <li>
//                 <strong>Inclined Systems with Wood Support:</strong> These setups utilize angled PVC pipes supported by wooden structures, offering a unique and functional approach.
//               </li>
//             </ul>

//             Hydroponics doesn't stop there. Large water basin systems are another option, where plants rest on buoyant polystyrene plates. In these setups, water circulation is ensured through pumps or air stones, keeping your plants oxygenated.

//             By embracing these diverse hydroponic configurations, you can overcome space limitations and cultivate your plants efficiently, regardless of your gardening goals.
//           </p>
//         </div>
//         <div className="flex-1 p-8">
//           <Carousel
//             showArrows={true}
//             autoPlay={true}
//             infiniteLoop={true}
//             stopOnHover
//             showStatus={false} // Hide status bar
//             showThumbs={false} // Hide thumbnail navigation
//             emulateTouch={true} // Enable touch emulation for non-touch devices
//             swipeable={true} // Allow swipe navigation
//             interval={5000} // Set autoplay interval
//             className="h-auto"
//           >
//             {imageUrls.map((imageUrl, index) => (
//               <div key={index} className="carousel-item">
//                 <img
//                   src={imageUrl}
//                   alt="Hydroponic System"
//                   className="w-full h-auto"
//                 />
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeContent;
// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import ArrowPath from '../components/utils/ArrowPath.jsx'; // Import the ArrowPath component

// const HomeContent = () => {
//   const imageUrls = [
//     '/Carousel/1.png',
//     '/Carousel/2.png',
//     '/Carousel/3.png',
//     '/Carousel/4.png',
//     '/Carousel/5.png',
//     '/Carousel/6.png',
//     '/Carousel/7.png',
//   ];

//   return (
//     <div style={{ position: 'relative', background: 'linear-gradient(to bottom, rgb(144, 238, 144), rgb(34, 139, 34))' }} className="min-h-screen">
//       <div className="bg-green-600 text-white py-4 px-8 text-3xl font-bold text-center">Easy Hydro© For All Gardening Enthusiasts</div>
//       <div className="flex">
//         <div className="flex-1 p-8">
//           <p className="text-lg leading-relaxed">
//             {/* Your text content */}
//           </p>
//         </div>
//         <div className="flex-1 p-8">
//           <Carousel
//             showArrows={true}
//             autoPlay={true}
//             infiniteLoop={true}
//             stopOnHover
//             showStatus={false} // Hide status bar
//             showThumbs={false} // Hide thumbnail navigation
//             emulateTouch={true} // Enable touch emulation for non-touch devices
//             swipeable={true} // Allow swipe navigation
//             interval={5000} // Set autoplay interval
//             className="h-auto"
//           >
//             {/* Carousel images */}
//           </Carousel>
//         </div>
//       </div>
//       <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>
//         <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <ArrowPath /> {/* Use the ArrowPath component */}
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default HomeContent;

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowIcon from '../components/utils/ArrowIcon'; // Import the ArrowIcon component

const HomeContent = () => {
    const imageUrls = [
        '/Carousel/1.png',
        '/Carousel/2.png',
        '/Carousel/3.png',
        '/Carousel/4.png',
        '/Carousel/5.png',
        '/Carousel/6.png',
        '/Carousel/7.png',
    ];

    return (
        <div style={{ background: 'linear-gradient(to bottom, rgb(144, 238, 144), rgb(34, 139, 34))' }} className="min-h-screen relative">
            <div className="bg-green-600 text-white py-4 px-8 text-3xl font-bold text-center">Easy Hydro© For All Gardening Enthusiasts</div>
            <div className="flex">
                <div className="flex-1 p-8">
                    <div className="text-medium leading-relaxed">
                        <p>
                            Hydroponics offers a game-changer for plant cultivation. Unlike traditional soil-based methods, hydroponics provides adaptable setups that cater to diverse spaces and preferences.
                        </p>

                        <ul className="list-disc pl-8 mt-4">
                            <li>
                                <strong>Horizontal PVC Pipe Systems:</strong> Picture rows of PVC pipes mounted above a table, cradling your plants. While they may not inherently minimize surface area, multi-floor setups can optimize space utilization. They are ideal for smaller areas, reducing water pump usage and allowing for optimal sunlight exposure. Additionally, they are relatively affordable compared to other hydroponic configurations.
                            </li>
                            <li>
                                <strong>Vertical Gardens:</strong> These setups feature plants thriving in towers positioned directly above a water reservoir. They are designed to make efficient use of vertical space, allowing for multiple layers of plant growth. By stacking plants vertically, these gardens maximize the use of limited space, making them suitable for areas with minimal ground space availability. However, they may require more frequent water pump operation due to gravity-driven irrigation, which could result in increased power requirements and potential noise from the pump operation. Despite these considerations, vertical gardens create a stunning visual impact, enhancing the aesthetics of any space.
                            </li>
                            <li>
                                <strong>Slanted Pipe Systems:</strong>
                                This system offers a unique and efficient way to cultivate plants using hydroponics. Unlike traditional horizontal or vertical setups, these systems utilize PVC pipes mounted on a slanted frame, resembling a wide ladder.
                                This angled design provides several advantages:
                                <ul className="list-disc pl-8 mt-4"> <li>Maximizes Space: By tilting the pipes, slanted systems utilize both vertical and horizontal space effectively. This is ideal for areas with limited floor space but some available height.</li>
                                    <li>Adaptable Growth: The angle of the pipes can be adjusted to encourage vertical growth for taller plants or a more horizontal spread for bushier varieties.</li>
                                    <li>Optimized Water Management: The incline allows for better control over water flow. The water pump duty cycle (how often it runs) can be adjusted based on the angle to ensure proper water distribution and prevent pooling.</li>
                                    <li>Enhanced Sun Exposure: The orientation of the inclined system can be strategically chosen to maximize sunlight exposure for your plants.</li>
                                </ul>
                                While setup costs for slanted pipe systems are typically moderate due to the materials and labor involved, they offer a versatile and efficient solution for hydroponic gardening in diverse environments.
                            </li>
                        </ul>
                        <p>
                            Hydroponics doesn't stop there. Large water basin systems are another option, where plants rest on buoyant polystyrene plates. In these setups, water circulation is ensured through pumps and air stones pump tiny air bubble into the water
                            keeping your plants roots oxygenated. Large water basin systems may occupy significant space horizontally and require continuous water pump operation for circulation. Sunlight exposure can be managed with proper shading or positioning.
                            By embracing these diverse hydroponic configurations, you can overcome space limitations and cultivate your plants efficiently, regardless of your gardening goals.
                        </p>


                    </div>

                </div>
                <div className="flex-1 p-8">
                    <Carousel
                        showArrows={true}
                        autoPlay={true}
                        infiniteLoop={true}
                        stopOnHover
                        showStatus={false} // Hide status bar
                        showThumbs={false} // Hide thumbnail navigation
                        emulateTouch={true} // Enable touch emulation for non-touch devices
                        swipeable={true} // Allow swipe navigation
                        interval={5000} // Set autoplay interval
                        className="h-auto"
                    >
                        {imageUrls.map((imageUrl, index) => (
                            <div key={index} className="carousel-item">
                                <img
                                    src={imageUrl}
                                    alt="Hydroponic System"
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex-1 p-8 text-medium leading-relaxed'>
    <p><strong>Hydroponic tide systems:</strong> Hydroponic tide systems, also known as ebb and flow systems, are a type of hydroponic setup that utilizes a periodic flooding and draining process to provide plants with nutrients and water. These systems are popular among hydroponic enthusiasts due to their simplicity, effectiveness, and ability to accommodate a wide range of plant types.</p>
    
    <p>Here's how hydroponic tide systems typically work:</p>
    
    <ol>
        <li>
            <strong>Setup:</strong> The system consists of a growing tray or container, a reservoir for nutrient solution, a pump, and a timer. The growing tray is filled with a growing medium such as perlite, rockwool, or clay pellets, which support the plants' roots.
        </li>
        <li>
            <strong>Flooding Phase:</strong> Periodically, the pump is activated, flooding the growing tray with nutrient-rich water from the reservoir. This flooding phase typically lasts for a few minutes, allowing the growing medium and plant roots to absorb water and nutrients.
        </li>
        <li>
            <strong>Draining Phase:</strong> After the flooding phase, the pump is turned off, and the nutrient solution drains back into the reservoir through gravity. This draining phase allows excess water to be removed from the growing tray, preventing waterlogging and ensuring adequate oxygenation of the roots.
        </li>
        <li>
            <strong>Cycle Timing:</strong> The frequency and duration of the flooding and draining cycles can be controlled by a timer. The timing of the cycles depends on factors such as the type of plants being grown, their stage of growth, environmental conditions, and the specific nutrient requirements.
        </li>
        <li>
            <strong>Nutrient Solution Management:</strong> The nutrient solution in the reservoir needs to be monitored and replenished regularly to ensure that plants receive the necessary nutrients for healthy growth. pH levels and nutrient concentrations should also be adjusted as needed to maintain optimal conditions.
        </li>
        <li>
            <strong>Advantages:</strong> Hydroponic tide systems offer several advantages, including efficient water and nutrient usage, improved aeration of the root zone, reduced risk of soil-borne diseases, and better control over plant growth conditions. They are also relatively simple to set up and maintain, making them suitable for both beginners and experienced hydroponic growers.
        </li>
        <li>
            <strong>Plant Compatibility:</strong> A wide variety of plants can be grown in hydroponic tide systems, including leafy greens, herbs, vegetables, and flowering plants. However, certain crops may require specific adjustments to the timing and duration of the flooding and draining cycles to optimize growth.
        </li>
    </ol>
</div>
                </div>
            </div>
            <ArrowIcon /> {/* Add the ArrowIcon component */}
        </div>
    );
};
export default HomeContent;
