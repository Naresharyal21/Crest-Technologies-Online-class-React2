import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";

const BirthdayList = (props) => {
    const { birthdays = [], setBirthdays, setSection, setSelectedBirthday } = props;

    const [filteredBirthdays, setFilteredBirthdays] = useState(birthdays);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setFilteredBirthdays(birthdays);
    }, [birthdays]);

    const handleDelete = (id) => {
        const updatedList = birthdays.filter((b) => b.id !== id);
        setBirthdays(updatedList);
        localStorage.setItem("dob", JSON.stringify(updatedList));
    };
    const handleClear = () => {

        localStorage.removeItem('dob');
        setBirthdays([])
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        const filtered = birthdays.filter(b =>
            b.fullname.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBirthdays(filtered);
    };
    const getRemainingDays = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        // Set next birthday to the same MM-DD in the current year
        let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

        // If birthday has already occurred this year, move to next year
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.ceil((nextBirthday - today) / oneDay);

        return diffDays;
    };



    return (
        <div className="w-100">
            <div className="flex w-100 justify-between align-items-center">
                <div className="flex py-15">
                    <div className="flex py-15 searchicon">
                        <div className="inner"><CiSearch /></div>
                        <input
                            className="input mr-10"
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>

                    <button
                        className="button mr-10 width"
                        onClick={() => setSection("addBirthdays")}
                    >
                        Add BirthDays
                    </button>
                </div>
            </div>
            <button className="button mr-10 clrbtn  " onClick={handleClear}>Clear All Records</button>

            <table cellPadding={0} cellSpacing={0} className="w-100 table">
                <thead>
                    <tr>

                        <th style={{ width: "50px", textAlign: "left" }}>S.N.</th>
                        <th style={{ width: "150px", textAlign: "left" }}>Full Name</th>
                        <th style={{ width: "200px", textAlign: "left" }}>Date of Birth</th>
                        <th style={{ width: "200px", textAlign: "left" }}> Remanning Days</th>
                        <th style={{ width: "150px", textAlign: "left" }}>Person Image</th>
                        <th style={{ width: "100px", textAlign: "left" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBirthdays.length > 0 ? (
                        filteredBirthdays.map((birthday, index) => (
                            <tr key={birthday.id}>
                                <td className="border-1 py-10">{index + 1}</td>
                                <td className="border-1 py-10">{birthday.fullname}</td>
                                <td className="border-1 py-10">{birthday.dob}</td>
                                <td className="border-1 py-10">{getRemainingDays(birthday.dob)}</td>
                                <td className="border-1 py-10">
                                    {birthday.fimg ? (
                                        <img
                                            src={birthday.fimg}
                                            alt="Profile"
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="border-1 py-10">
                                    <button
                                        className="rf-m mr-10 btn-10"
                                        onClick={() => handleDelete(birthday.id)}
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                                <td className="border-1 py-10">
                                    <button
                                        className="rf-m mr-10 btn-10"
                                        onClick={() => {
                                            setSelectedBirthday(birthday);
                                            setSection("viewMyBirthDay");
                                        }}

                                    >
                                        <FaUsersViewfinder />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-10">
                                No birthdays found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BirthdayList;
