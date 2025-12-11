const TerminalProfile = () => {
  const profileData = {
    name: "Anu Peddada",
    role: "Business + Computer Science Student",
    location: "Washington University in St. Louis",
    email: "a.peddadad@wustl.edu",
    skills: ["Web Development", "Business Analysis", "C++", "JavaScript"],
    interests: ["Building Projects", "Web Dev", "Innovation"],
    status: "Available for opportunities"
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control-dot red"></span>
          <span className="control-dot yellow"></span>
          <span className="control-dot green"></span>
        </div>
        <div className="terminal-title">anu@portfolio ~</div>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-key">name</span>
          <span className="terminal-operator">:</span>
          <span className="terminal-string">"{profileData.name}"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-key">role</span>
          <span className="terminal-operator">:</span>
          <span className="terminal-string">"{profileData.role}"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-key">location</span>
          <span className="terminal-operator">:</span>
          <span className="terminal-string">"{profileData.location}"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-key">email</span>
          <span className="terminal-operator">:</span>
          <span className="terminal-string">"{profileData.email}"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-key">skills</span>
          <span className="terminal-operator">:</span>
          <span className="terminal-bracket">[</span>
        </div>
        {profileData.skills.map((skill, index) => (
          <div className="terminal-line indent" key={index}>
            <span className="terminal-string">"{skill}"</span>
            {index < profileData.skills.length - 1 && <span className="terminal-operator">,</span>}
          </div>
        ))}
        <div className="terminal-line">
          <span className="terminal-bracket">]</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-key">interests</span>
          <span className="terminal-operator">:</span>
          <span className="terminal-bracket">[</span>
        </div>
        {profileData.interests.map((interest, index) => (
          <div className="terminal-line indent" key={index}>
            <span className="terminal-string">"{interest}"</span>
            {index < profileData.interests.length - 1 && <span className="terminal-operator">,</span>}
          </div>
        ))}
        <div className="terminal-line">
          <span className="terminal-bracket">]</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-key">status</span>
          <span className="terminal-operator">:</span>
          <span className="terminal-string">"{profileData.status}"</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">&gt;</span>
          <span className="terminal-cursor">_</span>
        </div>
      </div>
    </div>
  );
};




