import React, { useState, useEffect } from 'react';

function TimeFunction(props) {
   const [currentDateTime, setCurrentDateTime] = useState(new Date());
   const [currentDateEff, setCurrentDateEff] = useState(new Date());

   setInterval(() => setCurrentDateTime(new Date()), 1000);

   useEffect(
      () => {
         let setTime = () => {
            console.log("setTime is called");
            setCurrentDateEff(new Date());
         }
         let interval = setInterval(setTime, 1000);
         return () => {
            clearInterval(interval);
         }
      },
      []
   );
   return (
      <div>
         <p>The current time is {currentDateTime.toString()}</p>
         <p>The current EFFECT time is {currentDateEff.toString()}</p>
      </div>
   );
}
export default TimeFunction;