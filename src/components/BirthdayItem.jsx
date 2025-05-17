import React from 'react';

const BirthdayItem = ({ birthday, setSection }) => {
  if (!birthday) {
    return (
      <div>
        <p>Error: No birthday selected.</p>
        <button onClick={() => setSection("list")}>Back to List</button>
      </div>
    );
  }

  const showBirthday = () => {
    const mybirthday = new Date(birthday.dob);
    const monthDay1 = mybirthday.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
    });

    const today = new Date();
    const monthDay2 = today.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
    });

    return monthDay1 === monthDay2;
  };

  return (
    <>
      <h1 className='header'>WELCOME {birthday.fullname.toUpperCase()}</h1>

      {showBirthday() && (
        <h2 className='header'>🎉 HAPPY BIRTHDAY DEAR {birthday.fullname.toUpperCase()} 🎉</h2>
      )}
     

      <div className="bxhw content">
        <p>Name: {birthday.fullname}</p>
        <p>Date of Birth: {birthday.dob}</p>
        <img
          src={birthday.fimg}
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <br />
        <button className="button mr-10 clrbtn  " onClick={() => setSection("list")}>Back to List</button>
      </div>
    </>
  );
};

export default BirthdayItem;
