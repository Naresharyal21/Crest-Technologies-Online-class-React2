import { useEffect, useState } from "react";

import Header from "./components/Header";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList";
import BirthdayItem from "./components/BirthdayItem";

function App() {
  const [birthdays, setBirthdays] = useState([]);
   const [section, setSection] = useState('list');
   const [selectedBirthday, setSelectedBirthday] = useState(null);


  useEffect(() => {
    const storedbirthdays = JSON.parse(localStorage.getItem("dob")) || [];
    setBirthdays(storedbirthdays);
  }, []);


  const handleAddBirthday = (updatedList) => {
  setBirthdays(updatedList);
  localStorage.setItem("dob", JSON.stringify(updatedList));
  setSection("list");
};


  return (
    <>
     <Header />
      {section ==='addBirthdays'&&(
        <BirthdayForm handleAddBirthday={handleAddBirthday}  />
      )}
      
       {section === "list" && (
        <BirthdayList
          birthdays={birthdays}
          setBirthdays={setBirthdays}
          setSection={setSection}
           setSelectedBirthday={setSelectedBirthday}// <-- pass setter as prop
        />
      )}
      {section==="viewMyBirthDay"&& selectedBirthday &&(
      <BirthdayItem birthdays={birthdays} setBirthdays={setBirthdays} setSection={setSection} birthday={selectedBirthday}/>   
      )}
  
  
    </>
  );
}

export default App;
