import React, { useState } from "react";

const Box = ({
  data,
}: {
  data: { text: string; info: string; num: number; percent: number };
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="w-48 h-32 bg-white rounded shadow-md flex flex-col justify-between items-center relative p-3">
      <div className="flex justify-between w-full">
        <div className="text-xs font-small text-black">{data.text}</div>

        <span
          onMouseOver={() => setShowInfo(true)}
          onMouseOut={() => setShowInfo(false)}
          className="text-xs font-small text-black"
        >
          ⓘ
        </span>
        {showInfo && (
          <div className="absolute bg-black p-2 rounded text-xs bottom-full text-white ">
            {data.info}
          </div>
        )}
      </div>
      <div className="text-2xl">{data.num}</div>
      <div className="text-xs text-gray-400">
        So với 7 ngày trước {data.percent}%
      </div>
    </div>
  );
};

export default Box;
