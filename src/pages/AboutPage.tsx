

import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

function AboutPage() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    // Fetch markdown files for the Layout component
    fetch('/docs')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error('Error fetching docs:', error));
  }, []);

  return (
    <Layout files={files}>
      <div className="about-page">
        <section className="about-hero-section">
          <div className="about-hero-content">
            <h1>Daniel Laplana Gimeno</h1>
            <p className="about-subtitle">Undergraduate Student of Computer Science and Videogame Design & Development</p>
          </div>
        </section>

        <section className="about-section">
          <h2>About Me</h2>
          <div className="about-card">
            <p>
              {/* Personal introduction to be filled */}
              I am an undergraduate student passionate about computer science and video game development. 
              This section can be expanded with more personal details about your background, interests, and career goals.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>Education</h2>
          <div className="about-card">
            <div className="education-item">
              <h3>Computer Science & Video Game Design and Development</h3>
              <p className="institution">{/* University name to be filled */}</p>
              <p className="date">{/* Years of study to be filled */}</p>
              <p className="description">{/* Description of studies to be filled */}</p>
            </div>
            {/* Additional education items can be added here */}
          </div>
        </section>

        <section className="about-section">
          <h2>Skills</h2>
          <div className="about-card">
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Programming Languages</h3>
                <ul>
                  <li>C++</li>
                  <li>C# and .Net</li>
                  <li>Typescript</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Game Development</h3>
                <ul>
                  <li>C++ from scratch</li>
                  <li>Unity</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Tools & Technologies</h3>
                <ul>
                  <li>React</li>
                  <li>.Net</li>
                  <li>Azure DevOps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Cometa Framework</h3>
              <p className="project-description">
                A high customizable and efficient videogame development framework.
              </p>
              <div className="project-links">
                <a href="https://github.com/kupehtci/Cometa" target="_blank" rel="noopener noreferrer" className="project-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub</a>
                <a href="#" className="project-link">Demo</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Cometa Render</h3>
              <p className="project-description">
                A base rendering framework for starting implementing videogames from scratch. 
              </p>
              <div className="project-links">
                <a href="https://github.com/kupehtci/CometaRender" target="_blank" rel="noopener noreferrer" className="project-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub</a>
                <a href="#" className="project-link">Demo</a>
              </div>
            </div>
            <div className="project-card">
              <h3>Cometa Web</h3>
              <p className="project-description">
                This website, built over React + Vite website for presenting Cometa. Its capable of rendering dinamically markdown files from the server and translate them into pure HTML. 
              </p>
              <div className="project-links">
                <a href="https://github.com/kupehtci/CometaWeb" target="_blank" rel="noopener noreferrer" className="project-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub</a>
                <a href="/docs/getting-started" className="project-link">Demo</a>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Experience</h2>
          <div className="about-card">
            <div className="experience-item">
              <h3>DevOps Engineer</h3>
              <p className="company">Hiberus</p>
              <p className="date">July 2024 - Present</p>
              <p className="description">Currently working on React and .Net applications development process and lifecycle for Spanish Ministry of Industry and Tourism.
                Also have been working for other clients like DKV insurance, Sacyr and others standardizing their development environments and improving their’s cloud infrastructures in AWS and Azure.</p>
            </div>
            <div className="experience-item">
              <h3>Operations Engineer</h3>
              <p className="company">Hiberus</p>
              <p className="date">June 2023 - October 2023</p>
              <p className="description">Automation for systems deployments using Terraform. Deploy, monitor, maintain and configure cloud infraestructures and on-premises systems.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Contact</h2>
          <div className="about-card contact-card">
            <div className="contact-info">
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
                <p className="contact-data">daniel.laplana.gimeno@gmail.com</p>
              </div>
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                <a href="https://github.com/kupehtci" target="_blank" rel="noopener noreferrer">kupehtci</a>
              </div>
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
                <a href="https://www.linkedin.com/in/daniellaplanagimeno/" target="_blank" rel="noopener noreferrer">daniellaplanagimeno</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default AboutPage;