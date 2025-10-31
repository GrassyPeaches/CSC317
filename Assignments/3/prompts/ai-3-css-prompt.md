make a css for this code
Sure — please paste the HTML code you’d like me to make the CSS for. Once I see your structure (the elements, classes, etc.), I can write a clean and styled CSS file to match it.
You said:
<!DOCTYPE html>
<html>
  <head>
    <title>Graciela Ramirez - Student Portfolio</title>
  </head>

  <body>
    <header>
      <h1>Graciela Ramirez</h1>
      <p>Computer Science Student</p>
    </header>

    <section id="Profile Photo">
      <img
        src="Images\gracielaramirez-8643_54516241257_o.jpg"
        alt="Profile photo of Graciela, the author of this portfolio page"
        width="500"
        height=""
      />
    </section>

    <section id="About">
      <h2>About Me</h2>
      <p>
        Hello! I'm Graciela, a junior studying Computer Science at San Francisco
        State University. I’m passionate about learning new programming
        languages and exploring how they can be applied to solve real-world
        problems. Beyond technology, I believe that health is one of the most
        important pillars of a good life. One area I’m especially interested in
        is the intersection of nanotechnology and exercise science. The idea of
        optimizing human performance and well-being through innovative research
        excites me, and I hope to contribute to advancements that improve
        people’s quality of life.
      </p>
      <p>
        When I’m not programming, I enjoy hiking, baking, and dancing. Lately,
        I’ve been on the fun (and sometimes messy) adventure of learning to
        cook. My proudest creations so far are a hearty clam chowder paired with
        homemade bread—soft on the inside with a golden, flaky crust. For
        desserts, I love making (and eating, of course!) tres leches cake and
        tangy lemon bars. Staying active is also important to me: I love
        strength training at the gym, and I’ve recently branched out into
        learning salsa and bachata. These hobbies not only keep me moving but
        also help me stay balanced, creative, and mentally refreshed.
      </p>
    </section>

    <section id="Skills">
      <h2>Skills</h2>
      <h3>Programming Languages</h3>
      <ul>
        <li>HTML</li>
        <li>Python</li>
        <li>Java</li>
        <li>Java Script (learning)</li>
      </ul>
      <h3>Tools and Technologies</h3>
      <ul>
        <li>Git and Github</li>
        <li>Jupyter Notebook</li>
        <li>Python Data Science Packages</li>
        <li>Terminal</li>
        <li>VS Code</li>
      </ul>
    </section>

    <section id="Projects">
      <h2>Recent Projects</h2>
      <ul>
        <li>Cook n' Colab</li>
        <ul>
          <li>
            A community based website that allows recipe creation and sharing
          </li>
          <li>Made with HTML, CSS, and Java Script on VS code</li>
          <li>
            Accomplished real world experience making a community based website
          </li>
        </ul>
        <li>Thank you Cards App</li>
        <ul>
          <li>
            An app to order thank you cards through chatting with SF Giants
            players
          </li>
          <li>Made with Java on IntelliJ</li>
          <li>Accomplished my largest OOP program</li>
        </ul>
        <li>Omnifood</li>
        <ul>
          <li>A website prototype for meal-prep subscription service</li>
          <li>Made with HTML, CSS and Java Script on VS code</li>
          <li>Accomplished extensive use and built confidence in CSS</li>
        </ul>
      </ul>
    </section>

    <section id="Contact">
      <h2>Contact Me</h2>
      <ul>
        <li><a href="https://github.com/GrassyPeaches">GitHub</a></li>
        <li>
          <a href="https://www.linkedin.com/in/graciela-ramirez-b9877b233/"
            >LinkedIn</a
          >
        </li>
      </ul>
    </section>
  </body>
</html>
Perfect — thanks for sharing your HTML!
Here’s a clean, modern, responsive CSS that will make your portfolio look polished and visually balanced:
🎨 style.css
/* Reset default browser styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* General page styling */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #fafafa;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

header h1 {
  font-size: 2.5rem;
  color: #222;
  margin-bottom: 0.3rem;
}

header p {
  font-size: 1.2rem;
  color: #666;
}

/* Profile photo */
#Profile\ Photo {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

#Profile\ Photo img {
  border-radius: 12px;
  max-width: 100%;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Section styling */
section {
  margin-bottom: 2.5rem;
}

h2 {
  color: #004d99;
  font-size: 1.8rem;
  border-left: 6px solid #0073e6;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
}

h3 {
  color: #0066cc;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1rem;
  text-align: justify;
}

/* Lists */
ul {
  list-style-type: square;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.4rem;
}

/* Links */
a {
  color: #0073e6;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: #005bb5;
  text-decoration: underline;
}

/* Contact section */
#Contact ul {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#Contact a {
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  body {
    padding: 1rem;
  }

  header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  #Contact ul {
    flex-direction: column;
    align-items: center;
  }
}
✅ How to use
Save the CSS above as style.css in the same folder as your HTML file.
In your HTML <head>, add this line:
<link rel="stylesheet" href="style.css">
Open your page in a browser — you’ll see a clean layout with subtle color accents, centered photo, and readable sections.
Would you like me to make it more colorful / themed (e.g. pastel, dark mode, or minimalist tech style)? I can tailor the CSS aesthetic

You said:
make the theme neon

Perfect 🔥 — let’s turn your portfolio into a neon cyber-inspired theme — glowing text, dark background, and vibrant accents that pop like a futuristic terminal.
Here’s your neon-themed style.css:
🌌 style.css
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* BODY */
body {
  font-family: 'Orbitron', 'Poppins', sans-serif;
  background-color: #0a0a0f;
  color: #e5e5e5;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  text-shadow: 0 0 4px #00ffe0;
}

/* HEADER */
header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #00ffe0;
}

header h1 {
  font-size: 2.8rem;
  color: #00ffe0;
  text-shadow: 0 0 10px #00ffe0, 0 0 20px #00b3ff;
}

header p {
  font-size: 1.2rem;
  color: #ff00ff;
  text-shadow: 0 0 6px #ff00ff;
}

/* PROFILE PHOTO */
#Profile\ Photo {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

#Profile\ Photo img {
  border-radius: 50%;
  max-width: 300px;
  height: auto;
  border: 3px solid #00ffe0;
  box-shadow: 0 0 20px #00ffe0, 0 0 40px #00b3ff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#Profile\ Photo img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 40px #ff00ff, 0 0 80px #00ffe0;
}

/* SECTION HEADERS */
h2 {
  color: #00ffe0;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  border-left: 6px solid #ff00ff;
  padding-left: 0.6rem;
  text-shadow: 0 0 10px #00ffe0;
}

h3 {
  color: #ff00ff;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 8px #ff00ff;
}

/* TEXT */
p {
  margin-bottom: 1rem;
  text-align: justify;
}

/* LISTS */
ul {
  list-style-type: none;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

li::before {
  content: "✦ ";
  color: #00ffe0;
  text-shadow: 0 0 10px #00ffe0;
}

li {
  margin-bottom: 0.4rem;
}

/* LINKS */
a {
  color: #00ffe0;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

a:hover {
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffe0;
}

/* CONTACT SECTION */
#Contact ul {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#Contact a {
  padding: 0.4rem 1rem;
  border: 2px solid #00ffe0;
  border-radius: 10px;
  text-shadow: 0 0 8px #00ffe0;
}

#Contact a:hover {
  border-color: #ff00ff;
  text-shadow: 0 0 12px #ff00ff, 0 0 24px #00ffe0;
}

/* GLOW DIVIDER */
section {
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
}

/* RESPONSIVE */
@media (max-width: 600px) {
  body {
    padding: 1rem;
  }

  header h1 {
    font-size: 2rem;
  }

  #Profile\ Photo img {
    max-width: 200px;
  }

  #Contact ul {
    flex-direction: column;
    align-items: center;
  }
}
Add this in your <head>:
<link rel="stylesheet" href="style.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@300;400&display=swap" rel="stylesheet">
✨ Result:
Futuristic black background
Cyan + magenta neon glow
Animated hover glow on photo and links
Easy to read, sleek, and fun
Would you like me to add a glowing navigation bar or animated neon dividers to make it look more like a full professional site?
You said:
include styling for the theme switcher buttobs

Perfect 🔮 — let’s add theme switcher buttons so visitors can toggle between the Neon Mode (vibrant dark theme) and a Light Mode (clean, minimalist version).

1. Add this HTML snippet inside your <header> (just below <p>):
<div class="theme-switcher">
  <button id="neon-theme">Neon Mode</button>
  <button id="light-theme">Light Mode</button>
</div>
2. Update your CSS (style.css) with this code:
This version includes the neon theme, a clean light theme, and glowing animated buttons to toggle between them
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* GLOBAL VARIABLES */
:root {
  --bg-color: #0a0a0f;
  --text-color: #e5e5e5;
  --accent1: #00ffe0;
  --accent2: #ff00ff;
  --shadow1: 0 0 10px var(--accent1);
  --shadow2: 0 0 10px var(--accent2);
}

/* LIGHT THEME VARIABLES */
body.light {
  --bg-color: #fefefe;
  --text-color: #1a1a1a;
  --accent1: #0073e6;
  --accent2: #ff4081;
  --shadow1: none;
  --shadow2: none;
}

/* BODY */
body {
  font-family: 'Orbitron', 'Poppins', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  transition: background-color 0.4s, color 0.4s;
}

/* HEADER */
header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--accent1);
}

header h1 {
  font-size: 2.8rem;
  color: var(--accent1);
  text-shadow: var(--shadow1);
}

header p {
  font-size: 1.2rem;
  color: var(--accent2);
  text-shadow: var(--shadow2);
}

/* THEME SWITCHER */
.theme-switcher {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.theme-switcher button {
  background: transparent;
  border: 2px solid var(--accent1);
  color: var(--accent1);
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s ease;
  text-shadow: var(--shadow1);
  box-shadow: 0 0 10px var(--accent1);
}

.theme-switcher button:hover {
  background-color: var(--accent1);
  color: #000;
  box-shadow: 0 0 20px var(--accent1), 0 0 40px var(--accent2);
  transform: scale(1.05);
}

/* PROFILE PHOTO */
#Profile\ Photo {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

#Profile\ Photo img {
  border-radius: 50%;
  max-width: 300px;
  height: auto;
  border: 3px solid var(--accent1);
  box-shadow: 0 0 20px var(--accent1), 0 0 40px var(--accent2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#Profile\ Photo img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 40px var(--accent2), 0 0 80px var(--accent1);
}

/* SECTION HEADERS */
h2 {
  color: var(--accent1);
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  border-left: 6px solid var(--accent2);
  padding-left: 0.6rem;
  text-shadow: var(--shadow1);
}

h3 {
  color: var(--accent2);
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-shadow: var(--shadow2);
}

/* TEXT */
p {
  margin-bottom: 1rem;
  text-align: justify;
}

/* LISTS */
ul {
  list-style-type: none;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

li::before {
  content: "✦ ";
  color: var(--accent1);
  text-shadow: var(--shadow1);
}

li {
  margin-bottom: 0.4rem;
}

/* LINKS */
a {
  color: var(--accent1);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

a:hover {
  color: var(--accent2);
  text-shadow: var(--shadow2);
}

/* CONTACT SECTION */
#Contact ul {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#Contact a {
  padding: 0.4rem 1rem;
  border: 2px solid var(--accent1);
  border-radius: 10px;
  text-shadow: var(--shadow1);
  transition: all 0.3s ease;
}

#Contact a:hover {
  border-color: var(--accent2);
  text-shadow: var(--shadow2);
  box-shadow: 0 0 20px var(--accent1);
}

/* DIVIDERS */
section {
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

/* RESPONSIVE */
@media (max-width: 600px) {
  body {
    padding: 1rem;
  }

  header h1 {
    font-size: 2rem;
  }

  #Profile\ Photo img {
    max-width: 200px;
  }

  #Contact ul {
    flex-direction: column;
    align-items: center;
  }
}
3. Add this JavaScript before your </body> tag:
<script>
  const neonBtn = document.getElementById('neon-theme');
  const lightBtn = document.getElementById('light-theme');

  neonBtn.addEventListener('click', () => {
    document.body.classList.remove('light');
  });

  lightBtn.addEventListener('click', () => {
    document.body.classList.add('light');
  });
</script>
4. Font link (in <head>):
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@300;400&display=swap" rel="stylesheet">

✅ Result:
Two glowing buttons to toggle themes
Smooth color transition between neon and light modes
Dynamic accent colors powered by CSS variables
Would you like me to add a third option (like a pink–purple “Galaxy Mode”) for even more style variety?

You said:
I already have the theme switcher, only style the html and dont want any edits besides the css file

Perfect 👍 — keeping your existing HTML exactly as is.
Here’s a pure CSS file that gives your site a neon theme, and also adds sleek, glowing styles for theme switcher buttons (without changing your HTML).
🎨 style.css
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* BODY */
body {
  font-family: 'Orbitron', 'Poppins', sans-serif;
  background-color: #0a0a0f;
  color: #e5e5e5;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  transition: background-color 0.4s, color 0.4s;
}

/* HEADER */
header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #00ffe0;
}

header h1 {
  font-size: 2.8rem;
  color: #00ffe0;
  text-shadow: 0 0 10px #00ffe0, 0 0 20px #00b3ff;
}

header p {
  font-size: 1.2rem;
  color: #ff00ff;
  text-shadow: 0 0 6px #ff00ff;
}

/* THEME SWITCHER BUTTONS */
button {
  background: transparent;
  border: 2px solid #00ffe0;
  color: #00ffe0;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0.5rem;
  text-shadow: 0 0 6px #00ffe0;
  box-shadow: 0 0 10px #00ffe0;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #00ffe0;
  color: #000;
  box-shadow: 0 0 20px #00ffe0, 0 0 40px #ff00ff;
  transform: scale(1.05);
}

/* PROFILE PHOTO */
#Profile\ Photo {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

#Profile\ Photo img {
  border-radius: 50%;
  max-width: 300px;
  height: auto;
  border: 3px solid #00ffe0;
  box-shadow: 0 0 20px #00ffe0, 0 0 40px #ff00ff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#Profile\ Photo img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 40px #ff00ff, 0 0 80px #00ffe0;
}

/* SECTION HEADERS */
h2 {
  color: #00ffe0;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  border-left: 6px solid #ff00ff;
  padding-left: 0.6rem;
  text-shadow: 0 0 10px #00ffe0;
}

h3 {
  color: #ff00ff;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 8px #ff00ff;
}

/* PARAGRAPHS */
p {
  margin-bottom: 1rem;
  text-align: justify;
}

/* LISTS */
ul {
  list-style-type: none;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

li::before {
  content: "✦ ";
  color: #00ffe0;
  text-shadow: 0 0 10px #00ffe0;
}

li {
  margin-bottom: 0.4rem;
}

/* LINKS */
a {
  color: #00ffe0;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

a:hover {
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffe0;
}

/* CONTACT SECTION */
#Contact ul {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

#Contact a {
  padding: 0.4rem 1rem;
  border: 2px solid #00ffe0;
  border-radius: 10px;
  text-shadow: 0 0 8px #00ffe0;
  transition: all 0.3s ease;
}

#Contact a:hover {
  border-color: #ff00ff;
  text-shadow: 0 0 12px #ff00ff, 0 0 24px #00ffe0;
}

/* DIVIDERS */
section {
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
}

/* RESPONSIVE */
@media (max-width: 600px) {
  body {
    padding: 1rem;
  }

  header h1 {
    font-size: 2rem;
  }

  #Profile\ Photo img {
    max-width: 200px;
  }

  #Contact ul {
    flex-direction: column;
    align-items: center;
  }
}
✅ What this CSS does
Keeps your HTML unchanged
Applies a glowing neon theme sitewide
Styles your existing theme switcher buttons with a bright glow effect
Uses cyan + magenta highlights on a dark background
Looks good on both desktop and mobile
Would you like the neon glow to animate slowly (pulsate effect) on the buttons for a more dynamic cyber feel?
