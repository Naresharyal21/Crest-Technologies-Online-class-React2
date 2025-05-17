import React, { useState } from 'react';

const BirthdayForm = ({ handleAddBirthday }) => {
  const [errors, setErrors] = useState({});
  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [fimg, setFimg] = useState(''); 

  const validate = () => {
    const errors = {};
    if (fullname.trim() === '') {
      errors['fullname'] = 'Full name is required';
    }
    if (dob.trim() === '') {
      errors['dob'] = 'Date of birth is required';
    }
    if (!fimg) {
      errors['fimg'] = 'Profile picture is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

 const handleSubmit = (event) => {
  event.preventDefault();
  if (!validate()) return;

  const dobs = JSON.parse(localStorage.getItem('dob')) || [];

  dobs.push({
    id: Date.now(),
    fullname,
    dob,
    fimg,
  });

  localStorage.setItem('dob', JSON.stringify(dobs));
  handleAddBirthday(dobs);

  // Clear form
  setFullname('');
  setDob('');
  setFimg('');
};


  return (
    <div className="flex dob-form" style={{ flexDirection: 'column' }}>
      <h1 className="mr-11" style={{ marginLeft: '315px' , transform: 'translateY(286%)'}}>
        Add My Birthday
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="bxhw">
          <input
            className={`mr-11 sw ${errors.fullname ? 'input-error' : ''}`}
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
              if (errors.fullname) setErrors({ ...errors, fullname: '' });
            }}
          />
          <p className="ercolor">{errors.fullname}</p>

          <input
            className={`mr-11 sw ${errors.dob ? 'input-error' : ''}`}
            type="date"
            name="dob"
            value={dob}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setDob(e.target.value);
              if (errors.dob) setErrors({ ...errors, dob: '' });
            }}
          />
          <p className="ercolor">{errors.dob}</p>

       <input
  className={`mr-11 sw ${errors.fimg ? 'input-error' : ''}`}
  type="text"
  name="fimg"
  placeholder="Enter Image URL"
  value={fimg}
  onChange={(e) => {
    setFimg(e.target.value);
    if (errors.fimg) setErrors({ ...errors, fimg: '' });className="button mr-10 clrbtn  "
  }}
/>
          <p className="ercolor">{errors.fimg}</p>

          <button className="mr-11 sw button">Add</button>
           
         
        </div>
      </form>
      
    </div>
  );
};

export default BirthdayForm;
