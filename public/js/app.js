//flag για το αν ειναι συνδεδεμενος ο χρηστης
let isLoggedIn = false;


// Περιμένουμε να φορτώσει το DOM
document.addEventListener("DOMContentLoaded", () => {

  // ====== DATA ΓΙΑ MAIN (ΚΕΝΤΡΙΚΟ ΜΕΝΟΥ) ======
  const mainContent = {
    bio: `
      <h2>Βιογραφία</h2>
      <p>
        Ο Μίλτος Τεντόγλου είναι Έλληνας αθλητής του στίβου, ειδικευμένος στο άλμα εις μήκος, και αποτελεί έναν από τους κορυφαίους αθλητές παγκοσμίως στο αγώνισμά του. Γεννήθηκε στις 18 Μαρτίου 1998 στα Γρεβενά και έχει καταφέρει να διακριθεί σε όλες τις μεγάλες διεθνείς διοργανώσεις, εκπροσωπώντας την Ελλάδα στο υψηλότερο αγωνιστικό επίπεδο. Η πορεία του χαρακτηρίζεται από συνέπεια, υψηλές επιδόσεις και σημαντικές επιτυχίες, που τον έχουν καθιερώσει ως σημείο αναφοράς στον παγκόσμιο στίβο.
      </p>
    `,
    photos: `
      <h2>Φωτογραφίες</h2>
      <div class="photo-grid">
        <img src="images/photos/photo1.jpg">
        <img src="images/photos/photo2.jpg">
        <img src="images/photos/photo3.jpg">
      </div>
    `,
    awards: `<h2>Διακρίσεις</h2><p>Ο Μίλτος Τεντόγλου κατέχει διακρίσεις σε Ολυμπιακούς Αγώνες, Παγκόσμια και Ευρωπαϊκά Πρωταθλήματα. Με σταθερή παρουσία στην κορυφή του διεθνούς στίβου, έχει χαρίσει στην Ελλάδα μερικές από τις σημαντικότερες στιγμές της σύγχρονης αθλητικής ιστορίας.
Επιλέξτε μία κατηγορία για να δείτε αναλυτικά τις διακρίσεις του.</p>`,
    links: `<h2>Σύνδεσμοι</h2><p>Επιλέξτε κατηγορία.</p>`,
    admin: `
      <h2>Σύνδεση Διαχειριστή</h2>
      <form id="loginForm">
        <input id="username" placeholder="Username"><br><br>
        <input id="password" type="password" placeholder="Password"><br><br>
        <button type="submit">Σύνδεση</button>
      </form>
    `
  };

  // ====== ADMIN CONTENT (ΔΙΑΧΕΙΡΙΣΗ) ======
const adminContent = {
  manageAwards: `
    <h2>Διαχείριση Διακρίσεων</h2>
    <p>Εδώ μπορείτε να προσθέσετε ή να διαγράψετε διακρίσεις.</p>
    <form id="awardForm">
  <input type="text" id="competition" placeholder="Διοργάνωση (πχ. Ολυμπιακοί Αγώνες Τόκιο)" required><br>
  <input type="date" id="date" required><br>
  <input type="text" id="medal" placeholder="Μετάλλιο (πχ. Χρυσό)" required><br>
  <input type="text" id="jump" placeholder="Άλμα (πχ. 8.74)" required><br>
  <select id="category" required>
    <option value="olympic">Ολυμπιακοί</option>
    <option value="world">Παγκόσμια</option>
    <option value="european">Ευρωπαϊκά</option>
  </select><br><br>

  <button type="submit">Προσθήκη Διάκρισης</button>
</form>

<div id="adminAwardsList"></div>
  `,
  manageLinks: `
    <h2>Διαχείριση Συνδέσμων</h2>
    <p>Εδώ μπορείτε να προσθέσετε ή να διαγράψετε συνδέσμους.</p>
    <form id="linkForm">
       <input type="text" id="linkTitle" placeholder="Τίτλος" required>
       <input type="url" id="linkUrl" placeholder="URL" required>

        <select id="linkCategory" required>
    <option value="video">Βίντεο</option>
    <option value="interview">Συνέντευξη</option>
    <option value="article">Άρθρo</option>
  </select>

      <button type="submit">Προσθήκη Συνδέσμου</button>
    </form>

    <div id="adminLinksList"></div>
  `
};


  // ====== SUB CONTENT (ΕΝΑ & ΣΩΣΤΟ) ======
  const subContent = {
    bio: {
      childhood: "<h2>Παιδικά Χρόνια</h2><p>Ο Μίλτος Τεντόγλου μεγάλωσε στα Γρεβενά, όπου από μικρή ηλικία έδειξε ιδιαίτερη αγάπη για τον αθλητισμό. Κατά τη διάρκεια των παιδικών του χρόνων ασχολήθηκε με διάφορα αθλήματα, γεγονός που συνέβαλε στη γενικότερη σωματική του ανάπτυξη και στην καλλιέργεια της αθλητικής του νοοτροπίας. Το περιβάλλον στο οποίο μεγάλωσε και η στήριξη από την οικογένειά του αποτέλεσαν σημαντικούς παράγοντες για τη μετέπειτα ενασχόλησή του με τον στίβο.</p>",
      start: "<h2>Πρώτα Βήματα</h2><p>Τα πρώτα του βήματα στον στίβο έγιναν σε νεαρή ηλικία, όταν άρχισε να προπονείται συστηματικά και να συμμετέχει σε τοπικούς και εθνικούς αγώνες. Σύντομα φάνηκε το ιδιαίτερο ταλέντο του στο άλμα εις μήκος, καθώς σημείωνε επιδόσεις που ξεχώριζαν για την ηλικία του. Μέσα από συνεχή προπόνηση και καθοδήγηση από εξειδικευμένους προπονητές, ο Τεντόγλου άρχισε να εξελίσσεται αγωνιστικά και να θέτει τις βάσεις για μια λαμπρή αθλητική πορεία.</p>",
      career: "<h2>Καριέρα</h2><p>Η αγωνιστική καριέρα του Μίλτου Τεντόγλου χαρακτηρίζεται από σταθερή ανοδική πορεία και διακρίσεις σε κορυφαίο διεθνές επίπεδο. Έχει κατακτήσει μετάλλια σε Ολυμπιακούς Αγώνες, Παγκόσμια και Ευρωπαϊκά Πρωταθλήματα, αποδεικνύοντας τη συνέπειά του στις μεγάλες διοργανώσεις. Η παρουσία του στους αγώνες συνοδεύεται από υψηλό αγωνιστικό επίπεδο και αξιοσημείωτη ψυχραιμία, στοιχεία που τον καθιστούν έναν από τους πιο αξιόπιστους αθλητές του αγωνίσματος.</p>",
      style: "<h2>Αγωνιστικό Στυλ</h2><p>Το αγωνιστικό στυλ του Μίλτου Τεντόγλου διακρίνεται για τη σταθερότητα, την τεχνική αρτιότητα και την εκρηκτικότητα κατά την εκτέλεση του άλματος. Διαθέτει εξαιρετικό συγχρονισμό στην προσέγγιση και στην απογείωση, ενώ παρουσιάζει αξιοσημείωτη ικανότητα να αποδίδει στο μέγιστο σε κρίσιμες στιγμές. Η ψυχραιμία, η αυτοπεποίθηση και η αγωνιστική ωριμότητα που επιδεικνύει τον καθιστούν ιδιαίτερα αποτελεσματικό σε διοργανώσεις υψηλών απαιτήσεων.</p>"
    },
    photos: {
      games:`<h2>Αγώνες</h2><div class="photo-grid">
        <img src="images/photos/photo9.jpg">
        <img src="images/photos/photo10.jpg">
        <img src="images/photos/photo11.jpg">
      </div>
      `,
      olympics:`<h2>Ολυμπιακοί</h2><div class="photo-grid">
        <img src="images/photos/photo4.jpg">
        <img src="images/photos/photo5.jpg">
      </div>
      `,
      training: `<h2>Προπονήσεις</h2><div class="photo-grid">
        <img src="images/photos/photo6.jpg">
        <img src="images/photos/photo7.jpg">
      </div>
      `,
    }
  };

  const asideSections = document.querySelectorAll(".aside-section");
  const navLinks = document.querySelectorAll("nav a");
  const main = document.querySelector("main");

  function hideAllAside() {
    asideSections.forEach(s => s.classList.add("hidden"));
  }

  // ====== NAV ======
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      // Active state για nav
navLinks.forEach(l => l.classList.remove("active"));
link.classList.add("active");
      const section = link.dataset.section;
      hideAllAside();
      document.getElementById(`aside-${section}`)?.classList.remove("hidden");
      if (mainContent[section]) main.innerHTML = mainContent[section];
    });
  });

  // ====== ASIDE ======
  document.querySelectorAll("aside li").forEach(item => {
    item.addEventListener("click", () => {

      // Active state για aside
document.querySelectorAll("aside li").forEach(li => li.classList.remove("active"));
item.classList.add("active");

      const sectionId = item.closest(".aside-section").id.replace("aside-", "");
      const sub = item.dataset.sub;

      if (sectionId === "awards") return loadAwards(sub);
      if (sectionId === "links") return loadLinks(sub);

      // ====== ΔΙΑΧΕΙΡΙΣΗ (ADMIN) ======
if (sectionId === "admin" && sub === "manage-awards") {
  main.innerHTML = adminContent.manageAwards;
  loadAwardsAdmin();
  return;
}

if (sectionId === "admin" && sub === "manage-links") {
  main.innerHTML = adminContent.manageLinks;
  loadLinksAdmin();
  return;
}

// ====== ADMIN → LOGIN (SHOW FORM) ======
if (sectionId === "admin" && sub === "login") {
  main.innerHTML = mainContent.admin;
  return;
}

 // ====== LOGOUT ======
if (sectionId === "admin" && sub === "logout") {

  if (!isLoggedIn) {
    main.innerHTML = "<h2>Δεν είστε συνδεδεμένος</h2>";
    return;
  }

  fetch("/api/logout", { method: "POST" })
    .then(() => {
      isLoggedIn = false;
      main.innerHTML = "<h2>Αποσυνδεθήκατε επιτυχώς</h2>";
    });

  return;
}



      if (subContent[sectionId] && subContent[sectionId][sub]) {
        main.innerHTML = subContent[sectionId][sub];
      }
    });
  });

// ====== FETCH AWARDS ======
function loadAwards(category) {
  fetch(`/api/awards?category=${category}`)
    .then(r => r.json())
    .then(data => {

      /* ====== TABLE (DESKTOP / TABLET) ====== */
      let tableHTML = `
        <div class="awards-table">
          <h2>Διακρίσεις</h2>
          <table>
            <thead>
              <tr>
                <th>Διοργάνωση</th>
                <th>Ημερομηνία</th>
                <th>Μετάλλιο</th>
                <th>Άλμα (Μέτρα)</th>
              </tr>
            </thead>
            <tbody>
      `;

      data.forEach(a => {
        tableHTML += `
          <tr>
            <td>${a.competition}</td>
            <td>${a.date}</td>
            <td>${a.medal}</td>
            <td>${a.jump}</td>
          </tr>
        `;
      });

      tableHTML += `
            </tbody>
          </table>
        </div>
      `;

      /* ====== CARDS (MOBILE) ====== */
      let cardsHTML = `<div class="awards-cards">`;

      data.forEach(a => {
        cardsHTML += `
          <div class="award-card">
            <h3>${a.competition}</h3>
            <p><strong>Ημερομηνία:</strong> ${a.date}</p>
            <p><strong>Μετάλλιο:</strong> ${a.medal}</p>
            <p><strong>Άλμα:</strong> ${a.jump} μ.</p>
          </div>
        `;
      });

      cardsHTML += `</div>`;

      main.innerHTML = tableHTML + cardsHTML;
    });
}


function loadAwardsAdmin() {
  fetch("/api/awards")
    .then(r => r.json())
    .then(data => {
      let html = "<h3>Υπάρχουσες Διακρίσεις</h3><ul>";

      data.forEach((a, index) => {
        html += `
          <li>
            ${a.competition} (${a.date})
            <button data-index="${index}" class="delete-award">✖</button>
          </li>
        `;
      });

      html += "</ul>";
      document.getElementById("adminAwardsList").innerHTML = html;

      document.querySelectorAll(".delete-award").forEach(btn => {
        btn.addEventListener("click", () => {
          deleteAward(btn.dataset.index);
        });
      });
    });
}



function deleteAward(index) {
  if (!confirm("Είστε σίγουρος ότι θέλετε να διαγράψετε τη διάκριση;")) {
    return;
  }
  fetch(`/api/awards/${index}`, {
    method: "DELETE"
  }).then(() => {
    loadAwardsAdmin();
  });
}




// ====== FETCH LINKS ======
function loadLinks(category) {
  fetch(`/api/links?category=${category}`)
    .then(r => r.json())
    .then(data => {
      let html = `
        <h2>Σύνδεσμοι</h2>
        <table>
          <tbody>
      `;

      data.forEach(l => {
        html += `
          <tr>
            <td>
              <a href="${l.url}" target="_blank" class="link-item">
                ${l.title}
              </a>
            </td>
          </tr>
        `;
      });

      html += `
          </tbody>
        </table>
      `;

      main.innerHTML = html;
    });
}

function loadLinksAdmin() {
  fetch("/api/links")
    .then(r => r.json())
    .then(data => {
      let html = "<h3>Υπάρχοντες Σύνδεσμοι</h3><ul>";

      data.forEach((link, index) => {
        html += `
          <li>
            ${link.title} (${link.category})
            <button class="delete-link" data-index="${index}">✖</button>
          </li>
        `;
      });

      html += "</ul>";
      document.getElementById("adminLinksList").innerHTML = html;

      document.querySelectorAll(".delete-link").forEach(btn => {
        btn.addEventListener("click", () => {
          deleteLink(btn.dataset.index);
        });
      });
    });
}

function deleteLink(index) {
   if (!confirm("Είστε σίγουρος ότι θέλετε να διαγράψετε τον σύνδεσμο;")) {
    return;
  }
  fetch(`/api/links/${index}`, {
    method: "DELETE"
  }).then(() => {
    loadLinksAdmin();
  });
}




  // ====== LOGIN ======
  document.addEventListener("submit", e => {
    if (e.target.id === "loginForm") {
      e.preventDefault();
      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      })
      .then(r => {
  if (r.ok) {
    isLoggedIn = true;
    main.innerHTML = "<h2>Συνδεθήκατε επιτυχώς</h2>";
  } else {
    alert("Λάθος στοιχεία");
  }
});

    }
  });

});

// ====== ADD AWARD (ADMIN) ======
document.addEventListener("submit", e => {
  if (e.target.id === "awardForm") {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Πρέπει να είστε συνδεδεμένος ως διαχειριστής");
      return;
    }

    const competition = document.getElementById("competition").value;
    const rawDate = document.getElementById("date").value;

let formattedDate = "";
if (rawDate) {
  const [year, month, day] = rawDate.split("-");
  formattedDate = `${day}/${month}/${year}`;
}

    const medal = document.getElementById("medal").value;
    const jump = document.getElementById("jump").value;
    const category = document.getElementById("category").value;

    fetch("/api/awards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        competition,
        date: formattedDate,
        medal,
        jump,
        category
      })
    }).then(r => {
      if (r.ok) {
        e.target.reset();
        loadAwardsAdmin();
      } else {
        alert("Αποτυχία προσθήκης διάκρισης");
      }
    });
  }
});

// ====== ADD LINK (ADMIN) ======
document.addEventListener("submit", e => {
  if (e.target.id === "linkForm") {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Πρέπει να είστε συνδεδεμένος ως διαχειριστής");
      return;
    }

    const title = document.getElementById("linkTitle").value;
    const url = document.getElementById("linkUrl").value;
    const category = document.getElementById("linkCategory").value;

    fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        url,
        category
      })
    }).then(r => {
      if (r.ok) {
        e.target.reset();
        loadLinksAdmin();
      } else {
        alert("Αποτυχία προσθήκης συνδέσμου");
      }
    });
  }
});

