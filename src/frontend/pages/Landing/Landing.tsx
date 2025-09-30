import './Landing.css'
import face from '../../assets/face.png'

export default function Landing() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Michael Callahan</h1>
      <img src={face} alt="face" />
      <p>Hi, I'm Michael! Welcome to my portfolio website.</p>
      <p>I'm a recent Northeastern University graduate with a strong foundation in software development, systems programming, and IT infrastructure. Through my co-op experiences and internship work, I’ve gained hands-on exposure to both enterprise-scale IT systems and impactful real-world applications of AI in healthcare. </p>
      <p>At Boston Children’s Hospital, I’m currently contributing to a machine learning pipeline that measures limb length discrepancy from medical imaging—aiming to improve diagnostic accuracy and reduce manual effort for clinicians. Previously at Prime Medicine, I automated IT operations using Python, Bash, and PowerShell, integrating tools like Active Directory, Intune, and Jamf to improve provisioning and compliance workflows. At the Boston Globe, I provided end-user IT support while streamlining onboarding and inventory processes through scripting.</p>
    </div>
  );
}
