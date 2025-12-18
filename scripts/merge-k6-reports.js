#!/usr/bin/env node

/**
 * Merge k6 HTML reports into a unified dashboard
 */

const fs = require('fs');
const path = require('path');

const inputDir = process.argv[2] || './all-blob-reports';
const outputDir = process.argv[3] || './k6-report';

function findHtmlFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return [];
  }

  const files = fs.readdirSync(dir, { recursive: true });
  return files
    .filter(f => f.endsWith('.html'))
    .map(f => ({ path: path.join(dir, f), name: path.basename(f, '.html') }));
}

function generateIndexHTML(reports) {
  const cards = reports
    .map(
      (r) => `
    <div class="test-card">
      <h2>${r.displayName}</h2>
      <a href="${r.name}.html" class="btn">View Report →</a>
    </div>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>k6 Test Reports Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: white;
      text-align: center;
      font-size: 3em;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }
    .subtitle {
      text-align: center;
      color: rgba(255,255,255,0.9);
      margin-bottom: 40px;
      font-size: 1.2em;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }
    .test-card {
      background: white;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
    }
    .test-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    }
    .test-card h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.5em;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }
    .btn:hover {
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      color: rgba(255,255,255,0.8);
      margin-top: 60px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 k6 Load Testing Dashboard</h1>
    <p class="subtitle">Performance test results for all test suites</p>
    
    <div class="grid">
      ${cards}
    </div>
    
    <div class="footer">
      <p>Generated on ${new Date().toLocaleString()}</p>
      <p>Powered by k6 and k6-reporter</p>
    </div>
  </div>
</body>
</html>
  `;
}

function main() {
  const htmlFiles = findHtmlFiles(inputDir);
  console.log(`Found ${htmlFiles.length} HTML reports`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (htmlFiles.length === 0) {
    console.log('No HTML reports found, creating empty dashboard');
    const html = generateIndexHTML([]);
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    return;
  }

  // Copy individual reports and generate display names
  const reports = htmlFiles.map((file) => {
    const destPath = path.join(outputDir, path.basename(file.path));
    fs.copyFileSync(file.path, destPath);
    
    // Generate display name from filename
    const displayName = file.name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    
    return {
      name: file.name,
      displayName: displayName
    };
  });

  // Generate index page
  const indexHTML = generateIndexHTML(reports);
  fs.writeFileSync(path.join(outputDir, 'index.html'), indexHTML);
  
  console.log(`Dashboard created at ${outputDir}/index.html`);
  console.log(`Copied ${reports.length} individual reports`);
}

main();
