# ResumeAssist - Professional Resume Analysis

![ResumeAssist](https://img.shields.io/badge/ResumeAssist-2025-black)
![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-2.0+-blue)

A professional, mobile-optimized ATS (Applicant Tracking System) resume analysis tool developed by Kamlesh Porwal. ResumeAssist enables users to optimize their resumes for automated screening systems, enhancing their application success rates through data-driven recommendations.

## 📱 Mobile-First Design

The application features a clean, minimalist black and white design with a focus on mobile usability:

- Responsive design that works on all devices
- Smooth hamburger menu navigation for mobile devices
- Touch-friendly interface elements
- Elegant animations and transitions

## ✨ Key Features

- **Resume Parsing**: Extract key information from resumes in PDF, DOCX, or TXT formats
- **ATS Compatibility Analysis**: Get a real compatibility score for how well your resume will perform with ATS systems
- **Keyword Optimization**: Identify missing keywords relevant to your target job role
- **Mobile-Friendly Interface**: Use the application seamlessly on your smartphone or tablet
- **Detailed Feedback**: Receive actionable suggestions to improve your resume
- **Job Role Matching**: Target specific job roles for tailored improvement suggestions
- **AI-Powered Analysis**: Leverages Google's Gemini AI for intelligent resume parsing
- **Print-Friendly Resume View**: Generate a clean, printable version of your parsed resume
- **Enhanced Resume Details**: View comprehensive resume information with tabbed navigation
- **Visual ATS Score**: See your ATS score with color-coded visual indicators
- **Responsive Design**: Fully optimized experience across all device sizes

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Flask
- Google Gemini API key (for AI analysis)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kamleshp214/resumeassist
   cd GeminiParser
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up your Gemini API key:
   ```bash
   # Linux/macOS
   export GEMINI_API_KEY="your_api_key_here"
   
   # Windows
   set GEMINI_API_KEY="your_api_key_here"
   ```

5. Run the application:
   ```bash
   python app.py
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## 📊 ResumeAssist Methodology

1. **Document Submission**: Upload your resume in PDF, DOCX, or TXT format
2. **Position Specification**: Select your target position from available options
3. **Information Verification**: Confirm personal and professional details for accurate analysis
4. **Comprehensive Assessment**: Receive ATS compatibility scoring and detailed evaluation
5. **Documentation**: Generate professional, print-optimized versions of analysis results
6. **Strategic Implementation**: Apply data-driven recommendations to enhance resume effectiveness

## 🎯 Professional Resume Optimization

ResumeAssist is designed for professionals at all career stages seeking to optimize their application materials:

- **Competitive Advantage**: Develop application materials that meet industry standards
- **Strategic Presentation**: Effectively highlight qualifications, achievements, and relevant experience
- **Data-Driven Approach**: Make informed decisions based on objective ATS compatibility metrics
- **Position-Specific Optimization**: Customize resume content for targeted roles and sectors
- **Continuous Improvement**: Monitor progress through quantifiable assessment metrics

## 💻 Technical Details

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI Integration**: Google Gemini API
- **File Processing**: PyPDF2, python-docx, textract
- **Styling**: Custom CSS with mobile-first approach

## 📱 Mobile Features

- Hamburger menu with smooth animations
- Touch-friendly card interfaces
- Responsive design for all screen sizes
- Optimized file upload for mobile devices

## 🔒 Privacy

- Resume data is not stored permanently
- All processing happens locally on the server
- Option to clear all resume data at any time
- No third-party tracking or analytics

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- **Kamlesh Porwal** - [GitHub](https://github.com/kamleshp214) | [LinkedIn](https://www.linkedin.com/in/kamlesh-porwal-2b1a2a1a6/)

## 🙏 Acknowledgements

- Google Gemini API for powering the AI analysis
- The open-source community for various libraries used in this project

## 🚀 Deployment

### Deploying to Vercel

ResumeAssist is configured for easy deployment on Vercel. Follow these steps:

1. **Fork or clone this repository** to your GitHub account

2. **Sign up for Vercel** at [vercel.com](https://vercel.com) if you haven't already

3. **Create a new project** on Vercel and import your GitHub repository

4. **Configure environment variables**:
   - Add `GEMINI_API_KEY` with your Google Gemini API key

5. **Deploy!** Vercel will automatically detect the Python configuration and deploy your app

6. **Enjoy your deployed application** at the URL provided by Vercel

Note: The app uses serverless functions on Vercel, which may have some limitations compared to a traditional server deployment. File uploads are stored temporarily and may be cleaned up periodically.
