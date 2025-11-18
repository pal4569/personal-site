import './Landing.css'
import face from '../../../public/face.png'
import mdblog from '../../../public/md-blog.png'
import lld from '../../../public/lld.png'
import strategy from '../../../public/strategy.png'
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaEnvelopeSquare } from "react-icons/fa";
import LoginIcon from '../../components/LoginIcon/LoginIcon'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_SERVER_URL;

export default function Landing() {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>("");

  function handleClickBlog() {
    navigate("/blogs/15");
  }

  useEffect(() => {
    fetch(`${API}/api/lastUpdated`)
      .then(res => res.json())
      .then(data => setDate(new Date(data.date).toLocaleDateString()));
  }, []);

  console.log(date);

  return (
    <div className="landing-container">
      <LoginIcon />
      <h1 className="landing-title">Michael F. Callahan</h1>
      <img src={face} alt="face" />
      <div className="socials-container">
        <a href="https://www.linkedin.com/in/michael-f-callahan/">
          <FaLinkedin className="linkedin" />
        </a>
         <a href="https://github.com/pal4569">
          <FaGithubSquare className="github" />
        </a>
        <a href="mailto:michaelfc8841@gmail.com">
          <FaEnvelopeSquare className="mail" />
        </a>
      </div>
      <div className="desc">
        <p>Hi, I'm Michael! I'm an incoming Software Engineer at Travelers Insurance as part of the Engineering Development Program. I'm currently finishing up my Computer Science degree at Northeastern University.</p>
        <p>I've previously worked at Boston Children's Hospital as a AI Software Researcher, Prime Medicine as a IT Analyst co-op, and The Boston Globe as a IT Support co-op.</p>
        <p>I'm passionate about turning real human needs into thoughtful, useful tech solutions. </p>
      </div>
      <h3>Projects</h3>
      <div className="all-projects">
        <div className="projects-container">
          <div 
            className="project-title-container"
            onClick={handleClickBlog}>
            <img src={mdblog} alt="face" />
            <h6>Markdown Blog Creator</h6>
          </div>
        </div>

        <div className="projects-container">
          <div className="project-title-container">
            <img src={lld} alt="face" />
            <h6>AI LLD Measurement</h6>
          </div>
        </div>

        <div className="projects-container">
          <div className="project-title-container">
            <img src={strategy} alt="face" />
            <h6>strategy.town</h6>
          </div>
        </div>
      </div>
      <footer>Last updated: {date}</footer>
    </div>
  );
}
