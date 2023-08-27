// WITH A LIBRARY
"use client"
// import React from 'react'
// import Countdown from 'react-countdown'

// const endingDate = new Date("2023-12-25")

// const CountDown = () => {
//   return (
//     <div>
//     <Countdown className='font-bold text-5xl text-yellow-300' date={endingDate}/>
//     </div>
//   )
// }

// export default CountDown


// WITHOUT A LIBRARY
// "use client"
// import React, { useState, useEffect } from "react";

// const CountDown = () => {
  
//   let difference = +new Date(`10/10/2023`) - +new Date();
//   const [delay, setDelay] = useState(difference);

//   const d = Math.floor(difference / (1000 * 60 * 60 * 24));
//   const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
//   const m = Math.floor((difference / 1000 / 60) % 60);
//   const s = Math.floor((difference / 1000) % 60);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setDelay(delay - 1);
//     }, 1000);

//     if (delay === 0) {
//       clearInterval(timer);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   });
//   return (
//     <span className="font-bold text-5xl text-yellow-300">
//       {d}:{h}:{m}:{s}
//     </span>
//   );
// };

// export default CountDown;


import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const endingDate = new Date("2023-12-25");

const CountDown = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='font-bold text-5xl text-yellow-300'>
         {isClient && <Countdown date={endingDate} />}
    </div>
  );
};

export default CountDown;
