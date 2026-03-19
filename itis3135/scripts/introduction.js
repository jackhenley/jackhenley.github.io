const defaultValues = {
  "first-name": "Jack",
  "middle-name": "",
  "nickname": "",
  "last-name": "Henley",
  "mascot-adjective": "Jolly",
  "mascot-animal": "hawk",
  "divider": "♣",
  "picture-caption": "One of my favorite camping memories",
  "personal-statement": "I'm a junior studying computer science with a concentration in AI, robotics, and gaming. I transferred from WCU for the fall semester and have so far been enjoying my time here at UNCC. I enjoy hiking, playing violin and mandolin, and playing video games in my free time.",
  "personal-background": "I grew up in Louisiana and moved to Asheville, NC about four years ago. I'm pursuing a degree in computer science because I enjoy problem solving and the challenge of figuring things out.",
  "professional-background": "I have yet to work a role in the software industry, however I have taught coding classes for the company I work for.",
  "academic-background": "I started pursuing computer science at WCU, and decided that UNCC would be a better fit for me.",
  "subject-background": "",
  "primary-computer": "I use an Asus G14 laptop as my \"desktop\" at home, and dual boot Windows 11 and EndeavourOS on it.",
  "quote": "It's the greatest gig in the world, being alive. You get to eat Denny's, wear a hat, whatever you want to do.",
  "quote-author": "Norm Macdonald",
  "funny-thing": "",
  "share": "",
  "link-1-url": "https://www.linkedin.com/in/jack-henley-230565380",
  "link-1-name": "LinkedIn",
  "link-2-url": "https://github.com/jackhenley",
  "link-2-name": "GitHub",
  "link-3-url": "https://webpages.charlotte.edu/jhenley8/",
  "link-3-name": "CLT Web",
  "link-4-url": "https://jackhenley.github.io/",
  "link-4-name": "Github.io",
  "link-5-url": "https://jackhenley.github.io/itis3135/",
  "link-5-name": "ITIS3135"
};

const defaultCourses = [
  { number: "3155", name: "Software Engineering",                    reason: "", department: "ITSC" },
  { number: "2181", name: "Intro to Computer Systems",               reason: "", department: "ITSC" },
  { number: "3688", name: "Computers and Their Impact on Society",   reason: "", department: "ITSC" },
  { number: "3135", name: "Front-End Web Application Development",   reason: "", department: "ITIS" },
  { number: "2122", name: "Intro. to Probability and Statistics",    reason: "", department: "STAT" }
];

const requiredFieldIds = [
  "first-name", "last-name",
  "mascot-adjective", "mascot-animal", "divider", "picture-caption",
  "personal-statement", "personal-background",
  "professional-background", "academic-background", "primary-computer",
  "quote", "quote-author",
  "link-1-url", "link-1-name", "link-2-url", "link-2-name",
  "link-3-url", "link-3-name", "link-4-url", "link-4-name",
  "link-5-url", "link-5-name"
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validateForm() {
  const missing = requiredFieldIds.filter((id) => {
    const el = document.getElementById(id);
    return !el || !el.value.trim();
  });

  const emptyCourse = Array.from(document.querySelectorAll(".course-entry")).some((entry) => {
    const num  = entry.querySelector(".course-number").value.trim();
    const name = entry.querySelector(".course-name").value.trim();
    const dept = entry.querySelector(".course-department").value.trim();
    return !num || !name || !dept;
  });
  if (emptyCourse) missing.push("course (number, name, and department required for each)");

  if (missing.length > 0) {
    alert(`Please fill in the following required fields:\n${missing.join(", ")}`);
    return false;
  }

  return true;
}

function updateRemoveButtons() {
  const btns = document.querySelectorAll(".remove-course-btn");
  btns.forEach((btn) => { btn.disabled = btns.length === 1; });
}

function makeCourseEntry({ number = "", name = "", reason = "", department = "" } = {}) {
  const entry = document.createElement("div");
  entry.className = "course-entry";
  entry.innerHTML = `
    <label>Number:</label><br>
    <input type="text" class="course-number" placeholder="e.g. 3155" value="${escapeHtml(number)}" required><br>
    <label>Name:</label><br>
    <input type="text" class="course-name" placeholder="e.g. Software Engineering" value="${escapeHtml(name)}" required><br>
    <label>Reason (optional):</label><br>
    <textarea class="course-reason" placeholder="Why are you taking this course?" rows="2">${escapeHtml(reason)}</textarea><br>
    <label>Department:</label><br>
    <input type="text" class="course-department" placeholder="e.g. ITSC" value="${escapeHtml(department)}" required><br>
    <button type="button" class="remove-course-btn">Remove</button><br><br>`;
  entry.querySelector(".remove-course-btn").addEventListener("click", () => {
    entry.remove();
    updateRemoveButtons();
  });
  return entry;
}

function addCourse() {
  document.getElementById("courses-container").appendChild(makeCourseEntry());
  updateRemoveButtons();
}

function resetCourseEntries(courses) {
  const container = document.getElementById("courses-container");
  container.innerHTML = "";
  courses.forEach((c) => container.appendChild(makeCourseEntry(c)));
  updateRemoveButtons();
}

function resetForm() {
  for (const [id, value] of Object.entries(defaultValues)) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }
  document.getElementById("picture").value = "";
  resetCourseEntries(defaultCourses);
}

function clearForm() {
  const inputs = document.querySelectorAll("#form input, #form textarea");
  inputs.forEach((el) => (el.value = ""));
  resetCourseEntries(defaultCourses.map(() => ({})));
}

function generatePreview(imgSrc) {
  const get = (id) => escapeHtml(document.getElementById(id).value.trim());

  const firstName           = get("first-name");
  const middleName          = get("middle-name");
  const nickname            = get("nickname");
  const lastName            = get("last-name");
  const mascotAdj           = get("mascot-adjective");
  const mascotAnimal        = get("mascot-animal");
  const picCaption          = get("picture-caption");
  const personalStatement   = get("personal-statement");
  const personalBackground  = get("personal-background");
  const professionalBackground = get("professional-background");
  const academicBackground  = get("academic-background");
  const subjectBackground   = get("subject-background");
  const primaryComputer     = get("primary-computer");
  const quote               = get("quote");
  const quoteAuthor         = get("quote-author");
  const funnyThing          = get("funny-thing");
  const share               = get("share");

  const courses = Array.from(document.querySelectorAll(".course-entry")).map((entry) => ({
    number:     escapeHtml(entry.querySelector(".course-number").value.trim()),
    name:       escapeHtml(entry.querySelector(".course-name").value.trim()),
    reason:     escapeHtml(entry.querySelector(".course-reason").value.trim()),
    department: escapeHtml(entry.querySelector(".course-department").value.trim())
  })).filter((c) => c.name);

  const links = [1, 2, 3, 4, 5].map((n) => ({
    href: escapeHtml(document.getElementById(`link-${n}-url`).value.trim()),
    name: escapeHtml(document.getElementById(`link-${n}-name`).value.trim())
  })).filter((l) => l.href);

  const middleDisplay   = middleName ? ` ${middleName}` : "";
  const nicknameDisplay = nickname ? ` (${nickname})` : "";
  const displayName = `${firstName}${middleDisplay}${nicknameDisplay} ${lastName}`;

  const courseItems = courses.map((c) =>
    `<li><b>${c.department} ${c.number} — ${c.name}</b>${c.reason ? `<br><em>${c.reason}</em>` : ""}</li>`
  ).join("");

  const linkItems = links.map((l) =>
    `<li><a href="${l.href}">${l.name}</a></li>`
  ).join("\n      ");

  const optionalSections = [
    subjectBackground ? `<li><b>Subject Background: </b>${subjectBackground}</li>` : "",
    funnyThing ? `<p><b>Something Funny: </b>${funnyThing}</p>` : "",
    share      ? `<p><b>Something I'd Like to Share: </b>${share}</p>` : ""
  ].filter(Boolean).join("\n      ");

  const panel = document.getElementById("preview-panel");
  panel.innerHTML = `
  <header>
    <h1>${firstName} ${lastName}&apos;s ${mascotAdj} ${mascotAnimal} &clubs; ITIS3135</h1>
  </header>
  <main>
    <h2>${displayName}</h2>
    <figure>
      <img src="${imgSrc}" alt="${picCaption}" width="500" height="300" />
      <figcaption><em>${picCaption}</em></figcaption>
    </figure>
    <p>${personalStatement}</p>
    <ul>
      <li><b>Personal Background: </b>${personalBackground}</li>
      <li><b>Professional Background: </b>${professionalBackground}</li>
      <li><b>Academic Background: </b>${academicBackground}</li>
      ${optionalSections}
      <li><b>Primary Computer: </b>${primaryComputer}</li>
      <li><b>Current Courses:</b>
        <ol>${courseItems}</ol>
      </li>
    </ul>
    <blockquote>
      <p>&ldquo;${quote}&rdquo;</p>
      <cite>- ${quoteAuthor}</cite>
    </blockquote>
    <h3>Links</h3>
    <ul>
      ${linkItems}
    </ul>
  </main>
  <button type="button" id="back-to-form-btn">Reset</button>`;

  document.getElementById("form-view").style.display = "none";
  panel.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });

  document.getElementById("back-to-form-btn").addEventListener("click", showForm);
}

function showForm() {
  document.getElementById("preview-panel").style.display = "none";
  document.getElementById("form-view").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const formElement = document.getElementById("form");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const pictureFile = document.getElementById("picture").files[0];
  if (pictureFile) {
    const reader = new FileReader();
    reader.onload = (evt) => generatePreview(evt.target.result);
    reader.readAsDataURL(pictureFile);
  } else {
    generatePreview("images/introPhoto.jpg");
  }
});

document.getElementById("reset-btn").addEventListener("click", resetForm);
document.getElementById("clear").addEventListener("click", clearForm);
document.getElementById("add-course-btn").addEventListener("click", addCourse);

// Populate default course entries on load
resetCourseEntries(defaultCourses);
