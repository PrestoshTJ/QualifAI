import React from 'react';
import './Resource.css';

export default function Resources() {
    return (
        <div className="resources">
            <header className='header'>
                <h1 className="title">Resources</h1>
            </header>
            <section className="resource-section">
                <h2 className='resource-title'>Job Search Tip</h2>
                <ul className="resource-list">
                    <li>
                        <a href='https://www.indeed.com/career-advice/interviewing/100-interview-questions' target="_blank" rel="noopener noreferrer">
                            100 Common Interview Questions and Answers
                        </a>
                    </li>
                    <li>
                        <a href='https://www.indeed.com/career-advice/finding-a-job/network-like-a-pro' target="_blank" rel="noopener noreferrer">
                            How to Network Like a Pro
                        </a>
                    </li>  
                </ul>
            </section>
            <section className='resource-section'>
                <h2 className='resource-title'>Resume Checking Tool</h2>
                <ul className="resource-list">
                    <li>
                        <a href="/resume" target="_blank" rel="noopener noreferrer">
                            Resume Checker Tool
                        </a>
                    </li>
                    <li> 
                        <a href="https://www.cover-letter-now.com/lp/clnrsmcl26.aspx?utm_source=google&utm_medium=sem&utm_campaign=85758224&utm_term=cv%20cover%20letter%20template&network=g&device=c&adposition=&adgroupid=8329436984&placement=&adid=289291840683&gad_source=1&gclid=CjwKCAjw3624BhBAEiwAkxgTOlZsgJsYbZnIm3OZLnz1sOGv9CipnzpUGml3IFXo0RRp-oywP6TPQBoCcb8QAvD_BwE" target="_blank" rel="noopener noreferrer">
                            Cover Letter and CV Templates
                        </a>
                    </li>
                </ul>
                </section>
      <section className="resource-section">
        <h2 className="resource-title">Job Search Platforms</h2>
        <ul className="resource-list">
          <li>
            <a href = "/jobs">QualifAI Job Search</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener noreferrer">
              LinkedIn Job Search
            </a>
          </li>
          <li>
            <a href="https://www.indeed.com/" target="_blank" rel="noopener noreferrer">
              Indeed Job Search
            </a>
          </li>
          <li>
            <a href="https://www.glassdoor.com/Job/index.html" target="_blank" rel="noopener noreferrer">
              Glassdoor Job Search
            </a>
          </li>
        </ul>
      </section>
      <footer className="footer">
        <p>&copy; 2024 QualifAI</p>
      </footer>
    </div>
  );
}    
                            


    