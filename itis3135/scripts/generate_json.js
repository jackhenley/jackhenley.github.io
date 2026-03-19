function generateJson() {
  if (!validateForm()) return;

  const get = (id) => document.getElementById(id).value.trim();
  const optional = (id) => get(id) || undefined;

  const pictureFile = document.getElementById("picture").files[0];
  const imagePath = pictureFile ? `images/${pictureFile.name}` : "images/introPhoto.jpg";

  const courses = Array.from(document.querySelectorAll(".course-entry")).map((entry) => ({
    department: entry.querySelector(".course-department").value.trim(),
    number:     entry.querySelector(".course-number").value.trim(),
    name:       entry.querySelector(".course-name").value.trim(),
    reason:     entry.querySelector(".course-reason").value.trim()
  })).filter((c) => c.name);

  const links = [1, 2, 3, 4, 5].map((n) => ({
    name: get(`link-${n}-name`),
    href: get(`link-${n}-url`)
  })).filter((l) => l.href);

  const json = {
    first_name:              get("first-name"),
    preferred_name:          optional("nickname"),
    middle_initial:          optional("middle-name"),
    last_name:               get("last-name"),
    divider:                 get("divider"),
    mascot_adjective:        get("mascot-adjective"),
    mascot_animal:           get("mascot-animal"),
    image:                   imagePath,
    image_caption:           get("picture-caption"),
    personal_statement:      get("personal-statement"),
    personal_background:     get("personal-background"),
    professional_background: get("professional-background"),
    academic_background:     get("academic-background"),
    subject_background:      optional("subject-background"),
    primary_computer:        get("primary-computer"),
    courses,
    links
  };

  document.getElementById("form-view").style.display = "none";
  document.getElementById("json-view").style.display = "block";

  const output = document.getElementById("json-output");
  output.value = JSON.stringify(json, null, 2);
  output.style.height = "auto";
  output.style.height = output.scrollHeight + "px";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function copyJson() {
  const text = document.getElementById("json-output").value;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-json-btn");
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = original; }, 2000);
  });
}

function backFromJson() {
  document.getElementById("json-view").style.display = "none";
  document.getElementById("form-view").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("generate-json-btn").addEventListener("click", generateJson);
document.getElementById("copy-json-btn").addEventListener("click", copyJson);
document.getElementById("back-from-json-btn").addEventListener("click", backFromJson);
