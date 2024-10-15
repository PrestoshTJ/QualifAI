import React, { useState } from 'react';
import Tesseract from "tesseract.js";
import mammoth from 'mammoth';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/webpack';
import axios from "axios";
import "./Resume.css";
import { Document, Page } from '@react-pdf/renderer'
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`; 

const Resume = () => {
    const [resume, setResume] = useState(null);
    const [file, setFile] = useState(null)
    const [pdfUrl, setPdfUrl] = useState('')
    const [uploading, setUploading] = useState(false)
    const [messages, setMessages] = useState(null);
    const [input, setInput] = useState({})
    const [showButtons, setShowButtons] = useState(false)
    const [showMessages, setShowMessages] = useState(false)
    const [showTextArea, setShowTextArea] = useState(false)
    const [specifics, setSpecifics] = useState('')
    const [showVerification, setShowVerification] = useState(false)
    
    const handleFileChange = (e) => {
        try {
            const file = e.target.files[0];
            setFile(file)
            console.log(file.type)
            const allowedFileTypes= ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
            const maxfilesize= 500 *1024 
            if (file && allowedFileTypes.includes(file.type)) {
                if (file.size > maxfilesize) {
                    alert("Over 500 KB")
                    return
                }
                if (file.type === 'application/pdf') {
                    const fileURL = URL.createObjectURL(file);
                    setPdfUrl(fileURL);
                    extractTextFromPDF(file) //PDF
                } else {
                    readFileContent(file) // msword and plaintext
                }
             } else {
                alert('Only PDF,DOCX, and TXT files are allowed.');
            }
        
        }
        catch {
            console.log("Ok")
        }
        setShowVerification(true)
    }

    const readFileContent = (file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const arrayBuffer = event.target.result; // Get the ArrayBuffer of the file
                mammoth.extractRawText({ arrayBuffer })
                    .then((result) => {
                        setResume(result.value); // Set the extracted text
                        console.log(result.value);
                    })
                    .catch((err) => {
                        console.error("Error extracting text from DOCX:", err);
                    });
            } else if (file.type === "text/plain") {
                const textContent = event.target.result; // Corrected the property name
                setResume(textContent); // Set the plain text content
            }
        }
        if (file.type == "text/plain") {
            reader.readAsText(file)
        } else if (file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {   
            reader.readAsArrayBuffer(file)  
        }
    }

    const extractTextFromPDF = (file) => {
        setUploading(true);
        const fileReader = new FileReader();

        fileReader.onload = async (event) => {
            const typedArray = new Uint8Array(event.target.result);
            const pdf = await getDocument(typedArray).promise;
            const numPages = pdf.numPages;
            const imagePromises = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 10 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;
                const imgDataUrl = canvas.toDataURL();

                // Add OCR process for the current page
                imagePromises.push(
                    Tesseract.recognize(imgDataUrl, 'eng', {
                        logger: (m) => console.log(m)
                    })
                );
            }

            Promise.all(imagePromises)
                .then(results => {
                    const allText = results.map(result => result.data.text).join(''); // Combine text from all pages
                    setResume(allText); // Set the extracted text
                    setUploading(false); // Stop uploading state
                })
                .catch(err => {
                    console.error(err);
                    setUploading(false); // Stop uploading state in case of an error
                });
        };

        fileReader.readAsArrayBuffer(file);      
    }

    const chat = async (specifications) => {
        setUploading(true)
        let textContent = specifications + resume + " Don't mention the formatting"
        setInput({ text: textContent, type: 'user' })
        setMessages([{ text: textContent, type: 'user' }])
        setShowButtons(false)
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
              model: 'gpt-4o-mini',
              messages: [{ role: 'user', content: textContent }],
            }, {
              headers: {
                // We understand it is bad practice to share API key but for the sake of simplicity in this competition, we will leave it for your convienience in running
                'Authorization': `Bearer sk-ODA-WnfwkxlA2KxJ_ym0BNBWSobETVtdyp8VKPPZv2T3BlbkFJAsiDWLa0M-Cxcqevzru2I0iE2YESU5yqKXVWwHn2AA`, 
                'Content-Type': 'application/json',
              },
            })
            const botResponse = response.data.choices[0].message.content
            setMessages([{ text: botResponse, type: 'bot' }])
            setShowMessages(true)
        } catch (error) {
            console.error("Error fetching data")
            setMessages([{ text: "Error fetching data", type: 'user' }])
        }
        console.log(messages)
        setUploading(false)
    }

    const handleSpecific = () => {
        setShowTextArea(true)
        setShowButtons(false)
    }

    const addSpecifics = () => {
        setShowTextArea(false)
        let textContent = specifics + " Please provide these suggestions for my resume: "
        chat(textContent)
    }

    const handleTextChange = (event) => {
        setSpecifics(event.target.value)
    }

    const verify = (status) => {
        if (status == "No") {
            window.location.href = window.location;
            setShowVerification(false)
        } else{
            setShowVerification(false)
            setShowButtons(true)
        }
    }
    const reload = () => {window.location.href = window.location}


   

    return(
        <div>
             
            <div className = "box">
                {!uploading && !showButtons && !showMessages && !showTextArea ?
                    <div>
                        <h2>Upload Your Resume</h2>
                        <div class="file-upload">
                            <label for="file-upload" class="custom-file-upload">
                                Choose File
                            </label>
                            <input id = "file-upload" type="file" onChange={handleFileChange} />
                        </div> 
                    </div> 
                    :
                    <div>
                        <button style={{width: 300}} className = "button" onClick = {reload}> Back</button>
                    </div>

                }
            </div>
            {uploading && (
                <div>
                    <img src="giphy.gif" alt="loading_gif"  width="250" />
                </div>
            )}
            {resume && showButtons && (
                <div>
                    <div>
                        <h1> Do you want Suggestions? </h1>
                        <div className = "buttonRow">
                            <button className = "button" onClick = {() => chat("Provide suggestions for my resume: ")}> General suggestions </button>
                            <button className = "button" onClick = {handleSpecific}> Specific suggestions </button>
                        </div>
                    </div>
                    <div>
                        <h1> Do you want to know where you stand? </h1>
                        <button className = "button" onClick = {() => chat("Based on my resume, what career path is best for me and what SPECIFIC jobs/internships can/should I get? ")}> Standing </button>
                    </div>
                </div>

            )}
            {showTextArea && (
                <div className = "column">
                    <textarea value = {specifics} onChange = {handleTextChange}></textarea>
                    <br></br>
                    <button className = "sbtn" onClick = {addSpecifics}> Submit </button>
                </div>
            )}
            {messages && messages.length > 0 && showMessages && (
                <div>
                    {messages.map((msg, index) => (
                        <div className = "AITextbox" key={index}>
                            <strong>{msg.type === 'user' ? 'You' : 'QualifAI bot'}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
            )}
            {resume && showVerification && (
                <div className = "verification-screen">
                    <p> Does this data match your resume? </p>
                    <p> {file.type === 'application/pdf' ? <iframe
                        src={pdfUrl}
                        width="600"
                        height="500"
                        title="Uploaded PDF"
                    ></iframe> : resume} </p>
                    <button className = "vbtn sbtn" onClick = {() => verify("Yes")}> Yes </button>
                    <button className = "vbtn sbtn" onClick = {() => verify("No")} > No </button>
                </div>
            )}
        </div>
    )
}
// Tesseract.js

export default Resume;
