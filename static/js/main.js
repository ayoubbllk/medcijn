/* Navigation + interactions locales (sans serveur) */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.querySelector(".mobile-menu");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Sondage santé (feedback local)
  const survey = document.querySelector("[data-survey]");
  if (survey) {
    const correct = Number(survey.dataset.correct || 3);
    const buttons = survey.querySelectorAll(".survey-options button");
    const feedback = survey.querySelector(".survey-feedback");
    let done = false;

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (done) return;
        done = true;
        buttons.forEach((b, i) => {
          if (i === correct) b.classList.add("correct");
          else if (b === btn && i !== correct) b.classList.add("wrong");
          b.disabled = true;
        });
        if (feedback) {
          feedback.classList.add("show");
          feedback.textContent =
            index === correct
              ? "Bonne réponse ! Face, bras, parole : ce sont les signes d'alerte d'un AVC. Appelez le 14."
              : "La bonne réponse est « Toutes ces réponses ». En cas de doute, appelez le 14.";
        }
      });
    });
  }
});
