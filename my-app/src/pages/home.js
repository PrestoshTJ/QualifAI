
import React, {useRef} from 'react';
import './home.css';

const Home = () => {
  const myElementref = useRef(null)
  const scrollTo = () => {
    myElementref.current.scrollIntoView({
      behavior: 'smooth', 
      block: 'start',     
    });
  }
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Check out the amazing features of QualifAI!</h1>
      </header>
      <section className="hero-section">
        <h2 className="hero-title">Find your dream job or perfect your resume!</h2>
        <p className="hero-text">Explore our features to get started.</p>
        <button className = "vbtn" onClick = {scrollTo}> Explore features </button>
      </section>
      <section ref = {myElementref} className="features-section">
        <div className="feature-grid">
          <a href="/resume" className="feature-link">
            <div className="feature-box">
              <header className="feature-header">
                <h1 className="feature-title">Resume Checker</h1>
                <p className="feature-text">Perfect your resume! <br /><br />Or see how you stand...</p>
              </header>
              <div className="feature-icon">
                <i className="fas fa-file-alt"></i>
              </div>
            </div>
          </a>
          <a href="/jobs" className="feature-link">
            <div className="feature-box">
              <header className="feature-header">
                <h1 className="feature-title">Job Finder</h1>
                <p className="feature-text">Discover your dream job or internship!</p>
              </header>
              <div className="feature-icon">
                <i className="fas fa-briefcase"></i>
              </div>
            </div>
          </a>
          <a href="/resources" className="feature-link">
            <div className="feature-box">
              <header className="feature-header">
                <h1 className="feature-title">Resources</h1>
                <p className="feature-text">Get access to exclusive job search resources and tips!</p>
              </header>
              <div className="feature-icon">
                <i className="fas fa-book"></i>
              </div>
            </div>
          </a>
        </div>
      </section>
      <br></br><br></br><br></br><br></br>
      {/* <main className="main-section box">
        <section className="testimonials-section">
          <h2 className="testimonial-title">What our users say</h2>
          <p className="testimonial-text">
            "QualifAI helped me land my dream job! The resume checker and job finder features were incredibly helpful."
            <br />
            - Steph A Lane
          </p>
          <p className="testimonial-text">
            "I was able to perfect my resume and get noticed by top companies thanks to QualifAI's resources and tools."
            <br />
            - Jane Todd
          </p>
        </section>
      </main> */}
      <div className = "mission">
        <h1> Mission Statement</h1>
        <p>"Our mission is to empower job-seekers by providing unbiased and intelligent resume analysis and educational resources. Using LLM AI technology and the scalability of MongoDB, we help students highlight their skills and experiences and connect them with potential employers. We help educate students by providing them with helpful resources that provide in-depth insight into resumes and the application process as a whole."</p>
      </div>
      <br></br><br></br><br></br>
      <footer className="footer">
        <p>&copy; 2024 QualifAI</p>
      </footer>
    </div>
  );
}

export default Home