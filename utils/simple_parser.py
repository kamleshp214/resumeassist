import re

def parse_resume(text, provided_name=""):
    """
    Parse resume text using basic regex techniques.
    This is a lightweight version for Vercel deployment.
    """
    # Initialize result structure
    result = {
        "name": "",
        "email": "",
        "phone": "",
        "education": [],
        "experience": [],
        "skills": [],
        "certifications": [],
        "additional_sections": {}
    }
    
    # Use provided name if available
    if provided_name:
        result["name"] = provided_name
    else:
        result["name"] = extract_name(text)
    
    # Extract contact information
    result["email"] = extract_email(text)
    result["phone"] = extract_phone(text)
    
    # Extract sections
    result["education"] = extract_education(text)
    result["experience"] = extract_experience(text)
    result["skills"] = extract_skills(text)
    result["certifications"] = extract_certifications(text)
    
    return result

def extract_name(text):
    """Simple name extraction using patterns"""
    # Check first few lines for name pattern
    lines = text.split('\n')
    for line in lines[:10]:  # Check first 10 lines only
        line = line.strip()
        if len(line) > 0 and len(line.split()) <= 5 and not re.search(r'@|[0-9]|resume|cv|curriculum', line.lower()):
            return line
    return "Unknown"

def extract_email(text):
    """Extract email using regex"""
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else ""

def extract_phone(text):
    """Extract phone number using regex"""
    phone_pattern = r'(\+\d{1,3}[-\.\s]??)?\(?\d{3}\)?[-\.\s]?\d{3}[-\.\s]?\d{4}'
    phones = re.findall(phone_pattern, text)
    return phones[0] if phones else ""

def extract_education(text):
    """Extract education information using regex and patterns"""
    education = []
    
    # Get education section
    edu_section = extract_section(text, ['education', 'academic background', 'academics'])
    if not edu_section:
        return education
    
    # Simple pattern matching for education entries
    edu_patterns = [
        r'(?i)(Bachelor|Master|PhD|B\.S\.|M\.S\.|B\.A\.|M\.A\.|M\.B\.A\.|Degree).*?(\d{4})',
        r'(?i)(University|College|School|Institute).*?(\d{4})'
    ]
    
    for pattern in edu_patterns:
        matches = re.finditer(pattern, edu_section)
        for match in matches:
            education.append({
                "degree": match.group(0).strip(),
                "dates": match.group(2) if len(match.groups()) > 1 else ""
            })
    
    return education

def extract_experience(text):
    """Extract work experience information using regex and patterns"""
    experience = []
    
    # Get experience section
    exp_section = extract_section(text, ['experience', 'work experience', 'employment', 'work history'])
    if not exp_section:
        return experience
    
    # Split by potential job entries (dates or companies)
    lines = exp_section.split('\n')
    current_job = {}
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check if line appears to be a job title or company
        if re.search(r'(?i)(19|20)\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec', line):
            # Save previous job if exists
            if current_job and 'title' in current_job:
                experience.append(current_job)
                
            # Start new job
            current_job = {
                "title": line,
                "details": []
            }
        elif current_job and 'title' in current_job:
            current_job["details"].append(line)
    
    # Add the last job
    if current_job and 'title' in current_job:
        experience.append(current_job)
    
    return experience

def extract_skills(text):
    """Extract skills using keyword matching"""
    skills = []
    
    # Get skills section
    skills_section = extract_section(text, ['skills', 'technical skills', 'core competencies', 'competencies'])
    if not skills_section:
        return skills
    
    # Look for comma or bullet-separated skills
    skill_candidates = re.split(r',|\n|\•|\-|\|', skills_section)
    
    for skill in skill_candidates:
        skill = skill.strip()
        if len(skill) > 0 and len(skill.split()) <= 4:
            skills.append(skill)
    
    return skills

def extract_certifications(text):
    """Extract certifications"""
    certifications = []
    
    # Get certifications section
    cert_section = extract_section(text, ['certifications', 'certificates', 'professional certifications'])
    if not cert_section:
        return certifications
    
    # Look for certification patterns
    cert_lines = cert_section.split('\n')
    for line in cert_lines:
        line = line.strip()
        if len(line) > 0 and len(line) < 100 and not line.lower() in ['certifications', 'certificates']:
            certifications.append(line)
    
    return certifications

def extract_section(text, section_headers):
    """
    Extract a section from the resume text based on common section headers.
    Returns the text of the specified section.
    """
    text = text.lower()
    text_lines = text.split('\n')
    
    section_text = ""
    section_started = False
    next_section_pattern = r'^(?:' + '|'.join([
        'experience', 'education', 'skills', 'certifications', 'projects', 
        'summary', 'objective', 'profile', 'interests', 'awards', 'publications',
        'references', 'personal'
    ]) + r')\s*(?::|$)'
    
    for i, line in enumerate(text_lines):
        line_lower = line.lower().strip()
        
        # Check if this line is a header for the section we want
        is_target_header = any(header in line_lower for header in section_headers)
        
        if is_target_header and not section_started:
            section_started = True
            continue
        
        # If we're in the target section and find another section header, stop
        if section_started and re.search(next_section_pattern, line_lower):
            break
            
        if section_started:
            section_text += line + "\n"
    
    return section_text.strip()
