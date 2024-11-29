import React, { useState, useEffect } from 'react';
import { magnitude } from 'simple-statistics';
import { dot, norm } from 'mathjs';



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
    const [reccomendations, setReccomendations] = useState(null)
    const [similarity, setSimilarity] = useState(null)
    const [uploading, setUploading] = useState(true)

    const vectorize = (text, vocabulary) => {
        const words = text.split(/\W+/).filter(Boolean)
        const wordCount = {}
  
        words.forEach(word => {
            const lowerWord = word.toLowerCase()
            wordCount[lowerWord] = (wordCount[lowerWord] || 0) + 1
        })
        const vector = vocabulary.map(word => wordCount[word.toLowerCase()] || 0)
        return vector
    }

    const cosineSimilarity = (text1, text2) => {
        const words1 = text1.split(/\W+/).filter(Boolean)
        const words2 = text2.split(/\W+/).filter(Boolean)
        const vocabulary = Array.from(new Set([...words1.map(word => word.toLowerCase()), ...words2.map(word => word.toLowerCase())]))

        const vec1 = vectorize(text1, vocabulary)
        const vec2 = vectorize(text2, vocabulary)
    
        const dotProduct = dot(vec1, vec2)
        const magnitude1 = norm(vec1)
        const magnitude2 = norm(vec2)

        let result = dotProduct / (magnitude1 * magnitude2)
        result = result ** (1/10)
        return result
    }

    const reccomender = (data) => {
        let user = "Computer Science. Front-end development. React, HTML/CSS, Javascript/Typescript, Python, AI, Machine learning. Internship"
        let jobKey = ""
        let sim = 0
        let simArray = []
        data.forEach((job) => {
            jobKey = job.description
            sim = cosineSimilarity(user, jobKey)
            simArray.push(sim)
        })
        let updatedData = data.map((job, index) => ({
            ...job,
            sim: simArray[index]
        }))
        updatedData = updatedData.sort((a, b) => b.sim - a.sim);
        return updatedData
    }



    useEffect(() => {
        fetch('http://localhost:3000/api/internships')
        .then(response => response.json())
        .then(data=>{
            setUploading(false)
            console.log(data)
            data = reccomender(data)
            setJoblistings(data);
            setfilteredJoblistings(data);
            console.log(data)
        })
        .catch(error=>console.error("Error fetching data:",error));
    },[]);
    
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

    <h3>Available Jobs</h3>
    {uploading && (
                <div>
                    <img src = "giphy.gif"></img>
                </div>
            )}
    <div className = "internship-folder">
        <ul>
            {filteredJoblistings.slice(startingIndex, startingIndex + 10).map((job) => (
                <div>
                    <li key={job.id}>
                        <h4>{job.title}</h4>
                        <p>Company: {job.company_name}</p>
                        <p>Job title: {job.job_title}</p>
                        <p>Location: {job.location}</p>
                        <p>Job Type: {job.employment_type}</p>
                        <p>Experience Level: {job.experience_level}</p>
                        <a className = "apply-now" href={"https://www.linkedin.com/jobs/view/" + job.job_id} target="_blank" rel="noopener noreferrer">Apply Now</a>
                    </li>
                    <div>
                        <h1> {Math.round(job.sim * 100,5)}% Compatability </h1>
                    </div>
                </div>
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
