import React, { useState, useEffect } from 'react';

import "./Internships.css";
const Internship = () => {
    const [preferences, setPreferences] = useState({
        careerGoals: 'No-preference',
        location: '',
        jobType: '',
        experienceLevel: ''
    })
    const [Joblistings, setJoblistings] = useState ([]);
    const [filteredJoblistings, setfilteredJoblistings]= useState(Joblistings);
    const [error,setError] = useState(null);
    const [startingIndex, setStartingIndex] = useState(0)
    const [formText, setFormText] = useState("Save Preferences")

    useEffect(() => {
        fetch('http://localhost:3000/api/internships')
        .then(response => response.json())
        .then(data=>{
            setJoblistings(data);
            setfilteredJoblistings(data);
            console.log(Joblistings.length)
        })
        .catch(error=>console.error("Error fetching data:",error));
    },[]);
    
    //handle from submission
    const handlesubmit = (e) => {
        if (formText == "Save Preferences") {
            setFormText("Reset")
        } else {
            setFormText("Save Preferences")
        }
        if (Joblistings != filteredJoblistings) {
            setfilteredJoblistings(Joblistings)
            return
        } else {
            e.preventDefault();
            e.preventDefault();
            console.log(preferences)
            let update = Joblistings
            if (preferences.careerGoals != "No-preference" && preferences.careerGoals != "") {
                update = update.filter(job => job.keyword === preferences.careerGoals)
                setfilteredJoblistings(update)
                console.log(filteredJoblistings)
            }
            if (preferences.location != "") {
                update = update.filter(job => job.location.toLowerCase().includes(preferences.location.toLowerCase()))
            }
            if (preferences.jobType != "No-preference" && preferences.jobType != "") {
                update = update.filter(job => job.employment_type === preferences.jobType)
            }
            if (preferences.experienceLevel != "No-preference" && preferences.experienceLevel != "" ) {
                update = update.filter(job => job.experience_level === preferences.experienceLevel)

            }
            setfilteredJoblistings(update)
        }

    };
    //handle input changes
    const handleChange = (e) => {
        const {name, value} =e.target;
        setPreferences({...preferences, [name]:value});
    };

    const handleIndex = (page) => {
        let newIndex = (page - 1) * 10
        setStartingIndex(newIndex)
    }

    const handleInput = (e) => {
        let result = e.target.value
        if (result != "" && result < Math.ceil(filteredJoblistings.length / 10)) {
            handleIndex(result)
        } 
    }

    return(
        <div className="internship-preferences">
    <h2>Job Preferences</h2>
    <form onSubmit={handlesubmit}>
        <div>
            <label>Career Goals:</label>
            <select name="careerGoals" defaultValue={preferences.careerGoals} onChange={handleChange}>
                <option value = "No-preference"> No preference </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business-Administration">Business Administration</option>
                <option value="Marketing">Marketing</option>
                <option value="Graphic-Design">Graphic Design</option>
                <option value="Data-Science">Data Science</option>
                <option value="Information-Technology">Information Technology</option>
                <option value="Communications">Communications</option>
                <option value="Finance">Finance</option>
                <option value="Environmental-Science">Environmental Science</option>  
            </select>
        </div>

        <div>
            <label>Location:</label>
            <input
                type='text'
                name='location'
                value={preferences.location}
                onChange={handleChange}
                placeholder="Preferred location (e.g., New York"
            />
        </div>   

        <div>
            <label>Job Type:</label>
            <select name="jobType" defaultValue={preferences.jobType} onChange={handleChange}>
                <option value = "No-preference">No preference</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>    
            </select>
        </div>

        <div>
            <label> Experience Level: </label>
                <select name = "experienceLevel" value = {preferences.experienceLevel} onChange = {handleChange}>
                    <option value = "No-preference">No preference</option>
                    <option value = "Internship">Internship</option>
                    <option value = "Entry level">Entry level</option>
                    <option value = "Associate">Associate</option>
                    <option value = "Mid-Senior level">Mid-Senior level</option>
                    <option value = "Director">Director</option>
                    <option value = "Executive">Executive</option>
                </select>
        </div>

        <button type="submit"> {formText}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>

    <h3>Available Jobs</h3>
    <div className = "internship-folder">
        <ul>
            {filteredJoblistings.slice(startingIndex, startingIndex + 10).map((job) => (
                <li key={job.id}>
                    <h4>{job.title}</h4>
                    <p>Company: {job.company_name}</p>
                    <p>Job title: {job.job_title}</p>
                    <p>Location: {job.location}</p>
                    <p>Job Category: {job.keyword}</p>
                    <p>Job Type: {job.employment_type}</p>
                    <p>Experience Level: {job.experience_level}</p>
                    <a className = "apply-now" href={"https://www.linkedin.com/jobs/view/" + job.job_id} target="_blank" rel="noopener noreferrer">Apply Now</a>
                </li>
            ))}
        </ul>
    </div>
    {filteredJoblistings.length / 10 <= 6 ? (
    [...Array(Math.ceil(filteredJoblistings.length / 10))].map((_, index) => (
        <button onClick={() => handleIndex(index + 1)} key={index}>
            {index + 1}
        </button>
    ))
) : (
    <>
        <div className = "flex">
            <input onChange = {(e) => handleInput(e)} type = "number"></input>
            <h3> ‎ Out of ‎ </h3>
            <h1></h1>
            <h3>{Math.ceil(filteredJoblistings.length / 10)}</h3>
        </div>
    </>
)}
      
</div>
            
    );
};

export default Internship;
