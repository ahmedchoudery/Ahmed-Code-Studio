import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Muhammad Ahmed Raza - Professional CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0f172a;      /* Deep Slate */
      --secondary: #1e293b;    /* Charcoal Slate */
      --accent: #b45309;       /* Rich Amber */
      --accent-light: #fef3c7; /* Light Amber tint */
      --text: #334155;         /* Muted Slate Text */
      --text-dark: #0f172a;    /* Heading Text */
      --border: #e2e8f0;       /* Light border */
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      color: var(--text);
      line-height: 1.5;
      background-color: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .resume-container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
    }

    /* --- Header Section --- */
    .header {
      background: var(--primary);
      color: #ffffff;
      padding: 40px 50px 35px 50px;
      border-bottom: 5px solid var(--accent);
      position: relative;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .header-left h1 {
      font-family: 'Outfit', sans-serif;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
      line-height: 1.1;
      margin-bottom: 6px;
      color: #ffffff;
    }

    .header-left h2 {
      font-size: 16px;
      font-weight: 500;
      color: #fbbf24; /* Warm Yellow Accent */
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 24px;
      margin-top: 15px;
      font-size: 13px;
      color: #cbd5e1;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .contact-item a {
      color: #cbd5e1;
      text-decoration: none;
      transition: color 0.2s;
    }

    .contact-item a:hover {
      color: #ffffff;
    }

    .contact-icon {
      color: #fbbf24;
      display: inline-flex;
    }

    /* --- Main Layout --- */
    .main-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;
      padding: 40px 50px;
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-dark);
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 2px solid var(--border);
      padding-bottom: 6px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title::after {
      content: '';
      flex-grow: 1;
      height: 1px;
      background: var(--border);
      margin-left: 10px;
    }

    .section-title-accent-bar {
      width: 12px;
      height: 12px;
      background-color: var(--accent);
      border-radius: 2px;
      display: inline-block;
    }

    /* Summary */
    .summary-text {
      font-size: 14px;
      color: var(--text);
      text-align: justify;
      line-height: 1.6;
    }

    /* Skills Grid */
    .skills-category-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .skill-card {
      background: #f8fafc;
      border-left: 3px solid var(--accent);
      padding: 12px 16px;
      border-radius: 0 6px 6px 0;
    }

    .skill-card h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 6px;
    }

    .skill-card p {
      font-size: 13px;
      color: var(--text);
    }

    /* Timeline & Experience & Projects */
    .experience-item {
      margin-bottom: 25px;
    }

    .experience-item:last-child {
      margin-bottom: 0;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 6px;
    }

    .exp-role-company h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .exp-role-company span {
      font-weight: 400;
      color: var(--text);
    }

    .exp-date-location {
      font-size: 12px;
      font-weight: 500;
      color: var(--accent);
      background: var(--accent-light);
      padding: 2px 8px;
      border-radius: 4px;
      white-space: nowrap;
    }

    .exp-description {
      font-size: 13.5px;
      margin-bottom: 8px;
      line-height: 1.5;
    }

    .bullet-list {
      list-style-type: none;
      padding-left: 4px;
    }

    .bullet-list li {
      position: relative;
      padding-left: 16px;
      margin-bottom: 4px;
      font-size: 13px;
      line-height: 1.5;
    }

    .bullet-list li::before {
      content: "•";
      color: var(--accent);
      font-weight: bold;
      position: absolute;
      left: 2px;
      top: -1px;
    }

    .tag-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .tag {
      background: #f1f5f9;
      color: #475569;
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 4px;
    }

    /* Print styling optimizations */
    @media print {
      body {
        background-color: #ffffff;
      }
      .resume-container {
        max-width: 100%;
        margin: 0;
      }
      .contact-item a {
        color: #cbd5e1 !important;
      }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <h1>Muhammad Ahmed Raza</h1>
          <h2>Full Stack Web Developer</h2>
          
          <div class="contact-grid">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <a href="mailto:ahmedraza.webdev@gmail.com">ahmedraza.webdev@gmail.com</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📱</span>
              <a href="https://wa.me/923174307043" target="_blank">+92 317 430 7043</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🌐</span>
              <a href="https://ahmedchoudery.github.io" target="_blank">ahmedchoudery.github.io</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">💻</span>
              <a href="https://github.com/ahmedchoudery" target="_blank">github.com/ahmedchoudery</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">👔</span>
              <a href="https://www.linkedin.com/in/ahmedcodestudio/" target="_blank">linkedin.com/in/ahmedcodestudio/</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="main-layout">
      <!-- Summary Section -->
      <section>
        <h3 class="section-title"><span class="section-title-accent-bar"></span>Executive Summary</h3>
        <p class="summary-text">
          High-performing MERN stack specialist with extensive experience bridging the gap between highly secure, production-grade backends and ultra-premium, interactive user interfaces. Passionate about engineering high-fidelity web applications with state-of-the-art animations, cinematic layouts, and highly-optimized load profiles. Proven track record of transforming traditional business processes into modern global digital platforms.
        </p>
      </section>

      <!-- Technical Skills Section -->
      <section>
        <h3 class="section-title"><span class="section-title-accent-bar"></span>Technical Expertise</h3>
        <div class="skills-category-container">
          <div class="skill-card">
            <h4>Frontend Engineering</h4>
            <p>React 19, Next.js 15 (App Router), Three.js (WebGL 3D), GSAP (Spatial Animation), Framer Motion, Vanilla CSS, Tailwind CSS, Responsive Web Design</p>
          </div>
          <div class="skill-card">
            <h4>Backend & Databases</h4>
            <p>Node.js, Express.js, RESTful API Design, Token-Based Authentication, MongoDB (Aggregation & Indexing), MySQL, Protected Middleware Architecture</p>
          </div>
          <div class="skill-card">
            <h4>Architecture & Automation</h4>
            <p>Monolithic & Serverless Deployments, Real-Time Webhooks, Synchronized Booking Engines, Omnichannel Alerts (Twilio SMS, Resend Email)</p>
          </div>
          <div class="skill-card">
            <h4>DevOps & Tooling</h4>
            <p>Git, GitHub, Vercel CI/CD, Lighthouse Performance Auditing (Targeting 95+ Scores), Vitest Unit & UI Testing, Performance Profiling</p>
          </div>
        </div>
      </section>

      <!-- Selected Projects Section -->
      <section>
        <h3 class="section-title"><span class="section-title-accent-bar"></span>Signature Projects</h3>
        
        <!-- Project 1 -->
        <div class="experience-item">
          <div class="exp-header">
            <div class="exp-role-company">
              <h3>Falak Hall & Events <span>— Luxury Booking & Venue Platform</span></h3>
            </div>
            <div class="exp-date-location">Production Ready</div>
          </div>
          <p class="exp-description">
            Engineered a complete premium digital event booking suite designed for luxury venues, moving offline operations to a lightning-fast cloud architecture.
          </p>
          <ul class="bullet-list">
            <li><strong>Optimized Performance:</strong> Accomplished a near-perfect <strong>98/100 Lighthouse score</strong> utilizing Next.js Server Components and advanced asset-caching techniques.</li>
            <li><strong>Safe Transactional State:</strong> Developed a custom backend booking engine with synchronized transactional locks to eliminate venue double-booking.</li>
            <li><strong>Automated Communications:</strong> Integrated the Twilio API for automated client SMS workflows and the Resend API for immediate admin email delivery.</li>
            <li><strong>Cinematic UI:</strong> Designed a responsive, spatial "glassmorphism" layout integrated with high-performance GSAP micro-animations running at 60fps.</li>
          </ul>
          <div class="tag-container">
            <span class="tag">Next.js 15</span>
            <span class="tag">React 19</span>
            <span class="tag">Node.js</span>
            <span class="tag">Express</span>
            <span class="tag">MongoDB</span>
            <span class="tag">GSAP</span>
            <span class="tag">Twilio API</span>
            <span class="tag">Resend API</span>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="experience-item" style="margin-top: 15px;">
          <div class="exp-header">
            <div class="exp-role-company">
              <h3>Ahmed Code Studio <span>— High-Fidelity 3D Portfolio Platform</span></h3>
            </div>
            <div class="exp-date-location">Active Platform</div>
          </div>
          <p class="exp-description">
            Conceived and launched a bespoke cinematic developer portfolio using Next.js and React, showing an interactive, glassmorphic visual playground.
          </p>
          <ul class="bullet-list">
            <li><strong>Immersive 3D Experience:</strong> Programmed lightweight 3D elements utilizing Three.js and @react-three/fiber with zero-jitter responsive controls.</li>
            <li><strong>Responsive Visuals:</strong> Implemented Vanilla CSS glassmorphic cards, custom keyframe scroll-triggering, and premium dark/light spatial layouts.</li>
          </ul>
          <div class="tag-container">
            <span class="tag">Next.js</span>
            <span class="tag">Three.js</span>
            <span class="tag">GSAP</span>
            <span class="tag">React Three Fiber</span>
            <span class="tag">Vanilla CSS</span>
            <span class="tag">Vitest</span>
          </div>
        </div>
      </section>

      <!-- Professional Experience & Education -->
      <section style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px;">
        <div>
          <h3 class="section-title"><span class="section-title-accent-bar"></span>Professional Experience</h3>
          <div class="experience-item">
            <div class="exp-header" style="margin-bottom: 2px;">
              <div class="exp-role-company" style="font-size: 13.5px;">
                <h3>Lead Full Stack Engineer</h3>
                <p style="font-size: 12px; color: var(--text-dark); font-weight: 500;">Ahmed Code Studio</p>
              </div>
              <div class="exp-date-location" style="font-size: 11px; padding: 1px 6px;">2024 — Present</div>
            </div>
            <p style="font-size: 12.5px; line-height: 1.4;">
              Providing end-to-end web engineering, systems architecture, and visual design to local and international clients, delivering pixel-perfect production builds with rigorous performance profiling and comprehensive unit testing coverage.
            </p>
          </div>
        </div>
        
        <div>
          <h3 class="section-title"><span class="section-title-accent-bar"></span>Education & Credentials</h3>
          <div class="experience-item">
            <div class="exp-header" style="margin-bottom: 2px;">
              <div class="exp-role-company" style="font-size: 13px;">
                <h3 style="font-size: 13px;">BS in Computer Science</h3>
                <p style="font-size: 11.5px; color: var(--text-dark);">Software Engineering Core</p>
              </div>
            </div>
            <p style="font-size: 12px; color: var(--text);">Focus on Distributed Computing, Database Algorithms, and Frontend Architecture.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</body>
</html>
`;

async function main() {
  try {
    console.log('Writing temporary HTML resume file...');
    const tempHtmlPath = path.join(__dirname, 'temp-resume.html');
    fs.writeFileSync(tempHtmlPath, htmlTemplate, 'utf-8');

    console.log('Launching headless browser via Puppeteer...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    console.log('Loading resume HTML...');
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });

    console.log('Generating high-quality PDF...');
    const pdfDir = path.join(__dirname, '../public');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    const pdfPath = path.join(pdfDir, 'resume.pdf');

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        bottom: '0mm',
        left: '0mm',
        right: '0mm'
      }
    });

    console.log('Cleaning up temporary HTML file...');
    fs.unlinkSync(tempHtmlPath);

    console.log(`Success! PDF generated at: ${pdfPath}`);
    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

main();
