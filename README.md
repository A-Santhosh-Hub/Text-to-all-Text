## 🧠 TexttoAllText — One Input, Infinite Outputs

Text to All Text Utility ( https://sanstudio.neocities.org/TexttoAllText )

Text to All Text is a versatile, client-side web application designed to be the "Swiss Army Knife" for developers, content creators, and writers. It unifies code formatting, text cleaning, case conversion, and HTML previewing into a single, lightweight interface.

Built with a privacy-first approach, this tool runs entirely in your browser. No data is ever sent to a cloud server, making it safe for sensitive code or private drafts.

🚀 Live Demo

Click here to Launch the Tool
([https://sanstudio.neocities.org/TexttoAllText])

📚 Table of Contents

✨ Key Features

📖 Usage Scenarios

🛠️ Technical Architecture

⚙️ Configuration & Storage

📦 Installation & Deployment

🔒 Privacy & Security

❓ Troubleshooting

🤝 Credits

✨ Key Features

📝 Advanced Text & Code Editor

The core of the utility is a responsive, syntax-aware environment.

Code Formatting: Beautify messy code with support for JSON, HTML, CSS, JavaScript, C/C++, Java, and Python.

Smart Indentation: Choose your preferred style (2 spaces, 4 spaces, or Tabs).

Stats Engine: Instantly see character, word, and line counts.

Clipboard Tools: Copy output or clear the workspace with a single click.

🧹 Text Cleaning & Transformation

Tools designed to fix common formatting issues in copied text.

Trim Edges: Removes whitespace from the start and end of lines.

Remove Extra Spaces: Collapses multiple spaces into one.

Remove Empty Lines: Strips out blank lines to compact text.

Passage Editor (Case Converter):

UPPERCASE: Converts text to all caps.

lowercase: Converts text to all lowercase.

Capitalize Words: (Title Case) Capitalizes the first letter of every word.

Sentence case: Smartly capitalizes the beginning of sentences.

📱 Social Media Toolkit

Specialized tools for content creators.

YouTube Title Checker: A dynamic counter that changes color based on YouTube's optimal title length (Green < 60, Orange < 100, Red > 100).

Hashtag Maker: Converts natural text (e.g., "Web Development, Coding") into social tags (#webdevelopment #coding).

🌐 Instant HTML Viewer

A secure sandbox for web developers.

Local Preview: Open .html files from your disk without setting up a local server.

Live Editing: Modify the HTML source in the tool and see updates in real-time.

Blob URL Security: Renders previews in a blob structure to prevent cross-site scripting risks.

📂 File Management

Drag & Drop: Supports dropping files anywhere on the interface.

Smart Download: Downloads files with the correct extension and a timestamped name (e.g., formatted-2023-10-27.json)—no annoying prompts.

Format Detection: Automatically detects file types (e.g., .json, .py) upon upload.

🕰️ Intelligent History System

Auto-Save: Every action (format, download, preview) saves a snapshot.

Context Aware: Remembers if the file was text or HTML.

One-Click Restore: Clicking a history item restores the content and switches to the correct view tab instantly.

📖 Usage Scenarios

1. The "Messy Code" Fixer

You copy a JSON object from a server log, but it's one long line.

Action: Paste into Editor -> Select "JSON" -> Click "Format".

Result: Perfectly indented, readable JSON.

2. The Content Creator

You are writing a YouTube video description.

Action: Select "YouTube Title Check".

Result: Type your title and watch the color indicator to ensure it isn't cut off in search results. Then, switch to "Hashtag Maker" to generate your tags from a keyword list.

3. The Web Developer

You need to quickly check an HTML email template.

Action: Drag the .html file onto the browser window.

Result: The tool automatically switches to HTML Viewer mode and renders the email. You can tweak the CSS inline and see the result immediately.

🛠️ Technical Architecture

This project is a Single-Page Application (SPA) contained entirely within one HTML file.

Core Structure: HTML5

Styling: Tailwind CSS (loaded via CDN) for a utility-first, responsive design.

Icons: FontAwesome (loaded via CDN) for scalable vector icons.

Logic: Vanilla JavaScript (ES6+). No frameworks (React/Vue) were used to keep it lightweight and portable.

Security: Implements a strict Content-Security-Policy (CSP) to ensure safe execution of scripts and styles.

⚙️ Configuration & Storage

The utility remembers your preferences using the browser's Local Storage.

What is saved?

Theme: Dark Mode / Light Mode preference.

Editor Settings: Indent size, Trim options, etc.

History: The last 10 items you worked on.

To reset the app, simply clear your browser's cache/local storage.

📦 Installation & Deployment

Run Locally

Download the index.html file.

Double-click it to open in Chrome, Firefox, Edge, or Safari.

Note: An internet connection is required initially to load the Tailwind and FontAwesome libraries (CDNs).

Deploy to Web

Since it is a static file, it can be hosted anywhere:

GitHub Pages: Upload index.html to a repository and enable Pages.

Netlify / Vercel: Drag and drop the folder containing the file.

Neocities: Direct upload.

🔒 Privacy & Security

Text to All Text is designed with privacy as a priority.

Client-Side Execution: All logic runs on your CPU.

Zero Data Collection: We do not have a backend database. We cannot see your code, text, or files.

Sandboxed Preview: HTML previews run in a secure context to preventing malicious code execution on your main device.

❓ Troubleshooting

Q: The icons aren't showing up.
A: Ensure you have an active internet connection. The icons are loaded from cdnjs.cloudflare.com. If you are offline, the layout will work, but icons will be missing.

Q: The HTML preview is blank.
A: Ensure your HTML file has a <body> tag and content. The viewer is designed for standard HTML documents.

Q: I can't download files.
A: Check if your browser has a "Pop-up Blocker" active, although the current method uses a direct anchor link which usually bypasses this.

🤝 Credits

Developed by: SanStudio

Icons: FontAwesome

Fonts: Google Fonts

Styling Engine: Tailwind CSS

License: MIT - Free to use, modify, and distribute.


### 📸 Preview

![3D Model Viewer Screenshot](https://github.com/A-Santhosh-Hub/Text-to-all-Text/blob/main/TXT.png)
