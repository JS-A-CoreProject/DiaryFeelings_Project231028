/*
  Write title, Content Component
*/
"use client";

import React, { useEffect, useState } from "react";
import "../../write/write.css";
import emotion from "../../write/3_love.png";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WriteContent = () => {
  // get today's date
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  // select date from calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="write-box">
      {/* left sidebar */}
      <div className="write-sidebar">
        <div>img</div>
        <div>sticker</div>
        <div>calendar</div>
        <div>aiImg</div>
      </div>
      {/* write diary title, content */}
      <div className="write-container">
        {/* selelct emtion, date, title */}
        <div className="write-header">
          <Image className="write-select-img" src={emotion} alt="emotion" />
          <div className="write-tit">
            {/* select date */}
            <DatePicker
              className="write-date"
              dateFormat="yyyy.MM.dd" // format of edate
              shouldCloseOnSelect // select date close calendar
              minDate={new Date("2000-01-01")} // can't select before minDate
              maxDate={new Date()} // can't select after maxDate
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showPopperArrow={false}
            />
            <textarea placeholder="title"></textarea>
          </div>
        </div>
        {/* write content area */}
        <div className="write-cont">
          <textarea placeholder="content"></textarea>
        </div>
      </div>
      {/* diary register button */}
      <div className="write-btn-box">
        <button className="write-btn">일기 등록</button>
      </div>
    </div>
  );
};

export default WriteContent;
