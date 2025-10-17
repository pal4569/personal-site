import './Landing.css'
import face from '../../assets/face.png'
import mdblog from '../../assets/md-blog.png'
import lld from '../../assets/lld.png'
import strategy from '../../assets/strategy.png'
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaEnvelopeSquare } from "react-icons/fa";
import LoginIcon from '../../components/LoginIcon/LoginIcon'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate();

  function handleClickBlog() {
    navigate("/blogs/15");
  }

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
        <p>I recently graduated from Northeastern University with a B.S. in Computer Science. I have a strong foundation in software development, systems programming, and IT infrastructure. Through my co-op experiences and internship work, I’ve gained hands-on exposure to both enterprise-scale IT systems and impactful real-world applications of AI in pediatric diagnostic imaging. </p>
        <p>At Boston Children’s Hospital, I’m currently contributing to a machine learning pipeline that automatically estimates limb length discrepancy in children to improve diagnostic accuracy and reduce manual effort for radiologists. Previously at Prime Medicine, I automated IT operations using Python, Bash, and PowerShell, integrating tools like Active Directory, Intune, and Jamf to improve provisioning and compliance workflows. At the Boston Globe, I provided end-user IT support while streamlining onboarding and inventory processes through scripting.</p>
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
    </div>
  );
}
