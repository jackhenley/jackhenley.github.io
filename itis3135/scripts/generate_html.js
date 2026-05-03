function generateHtmlPage() {
  if (!validateForm()) return;

  const get = (id) => document.getElementById(id).value.trim();
  const esc = (str) => str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const firstName          = esc(get("first-name"));
  const middleName         = esc(get("middle-name"));
  const nickname           = esc(get("nickname"));
  const lastName           = esc(get("last-name"));
  const mascotAdj          = esc(get("mascot-adjective"));
  const mascotAnimal       = esc(get("mascot-animal"));
  const picCaption         = esc(get("picture-caption"));
  const personalStatement  = esc(get("personal-statement"));
  const personalBg         = esc(get("personal-background"));
  const professionalBg     = esc(get("professional-background"));
  const academicBg         = esc(get("academic-background"));
  const subjectBg          = esc(get("subject-background"));
  const primaryComputer    = esc(get("primary-computer"));
  const quote              = esc(get("quote"));
  const quoteAuthor        = esc(get("quote-author"));
  const funnyThing         = esc(get("funny-thing"));
  const share              = esc(get("share"));

  const pictureFile = document.getElementById("picture").files[0];
  const imgSrc = pictureFile ? `images/${esc(pictureFile.name)}` : "images/introPhoto.jpg";

  const middleDisplay   = middleName ? ` ${middleName}` : "";
  const nicknameDisplay = nickname   ? ` (${nickname})` : "";
  const displayName = `${firstName}${middleDisplay}${nicknameDisplay} ${lastName}`;

  const courses = Array.from(document.querySelectorAll(".course-entry")).map((entry) => ({
    number:     esc(entry.querySelector(".course-number").value.trim()),
    name:       esc(entry.querySelector(".course-name").value.trim()),
    reason:     esc(entry.querySelector(".course-reason").value.trim()),
    department: esc(entry.querySelector(".course-department").value.trim())
  })).filter((c) => c.name);

  const links = [1, 2, 3, 4, 5].map((n) => ({
    href: esc(get(`link-${n}-url`)),
    name: esc(get(`link-${n}-name`))
  })).filter((l) => l.href);

  const courseItems = courses.map((c) =>
    `            <li><b>${c.department} ${c.number} &mdash; ${c.name}</b>${c.reason ? `\n              <br><em>${c.reason}</em>` : ""}</li>`
  ).join("\n");

  const linkItems = links.map((l) =>
    `            <li><a href="${l.href}">${l.name}</a></li>`
  ).join("\n");

  const optionalListItems = [
    subjectBg  ? `            <li><b>Subject Background: </b>${subjectBg}</li>` : ""
  ].filter(Boolean).join("\n");

  const optionalParas = [
    funnyThing ? `        <p><b>Something Funny: </b>${funnyThing}</p>` : "",
    share      ? `        <p><b>Something I&apos;d Like to Share: </b>${share}</p>` : ""
  ].filter(Boolean).join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${firstName} ${lastName}</title>
    <link rel="stylesheet" href="styles/default.css">
</head>

<body>
    <header>
        <h1>${firstName} ${lastName}&apos;s ${mascotAdj} ${mascotAnimal} &clubs; ITIS3135</h1>
    </header>
    <main>
        <h2>${displayName}</h2>
        <figure>
            <img src="${imgSrc}" alt="${picCaption}" width="500" height="300">
            <figcaption><em>${picCaption}</em></figcaption>
        </figure>
        <p>${personalStatement}</p>
        <ul>
            <li><b>Personal Background: </b>${personalBg}</li>
            <li><b>Professional Background: </b>${professionalBg}</li>
            <li><b>Academic Background: </b>${academicBg}</li>
${optionalListItems}            <li><b>Primary Computer: </b>${primaryComputer}</li>
            <li><b>Current Courses:</b>
                <ol>
${courseItems}
                </ol>
            </li>
        </ul>
        <blockquote>
            <p>&ldquo;${quote}&rdquo;</p>
            <cite>- ${quoteAuthor}</cite>
        </blockquote>
${optionalParas}        <h3>Links</h3>
        <ul>
${linkItems}
        </ul>
    </main>
</body>

</html>`;

  document.getElementById("form-view").style.display = "none";
  document.getElementById("html-view").style.display = "block";

  const output = document.getElementById("html-output");
  output.value = html;
  output.style.height = "auto";
  output.style.height = output.scrollHeight + "px";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function copyHtml() {
  const text = document.getElementById("html-output").value;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-html-btn");
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = original; }, 2000);
  });
}

function backFromHtml() {
  document.getElementById("html-view").style.display = "none";
  document.getElementById("form-view").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("generate-html-btn").addEventListener("click", generateHtmlPage);
document.getElementById("copy-html-btn").addEventListener("click", copyHtml);
document.getElementById("back-from-html-btn").addEventListener("click", backFromHtml);
