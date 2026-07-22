/* Carte interactive des 58 wilayas d'Algérie */
const WILAYA_NAMES = {
  DZ01: "Adrar", DZ02: "Chlef", DZ03: "Laghouat", DZ04: "Oum El Bouaghi",
  DZ05: "Batna", DZ06: "Béjaïa", DZ07: "Biskra", DZ08: "Béchar",
  DZ09: "Blida", DZ10: "Bouira", DZ11: "Tamanrasset", DZ12: "Tébessa",
  DZ13: "Tlemcen", DZ14: "Tiaret", DZ15: "Tizi Ouzou", DZ16: "Alger",
  DZ17: "Djelfa", DZ18: "Jijel", DZ19: "Sétif", DZ20: "Saïda",
  DZ21: "Skikda", DZ22: "Sidi Bel Abbès", DZ23: "Annaba", DZ24: "Guelma",
  DZ25: "Constantine", DZ26: "Médéa", DZ27: "Mostaganem", DZ28: "M'Sila",
  DZ29: "Mascara", DZ30: "Ouargla", DZ31: "Oran", DZ32: "El Bayadh",
  DZ33: "Illizi", DZ34: "Bordj Bou Arreridj", DZ35: "Boumerdès", DZ36: "El Tarf",
  DZ37: "Tindouf", DZ38: "Tissemsilt", DZ39: "El Oued", DZ40: "Khenchela",
  DZ41: "Souk Ahras", DZ42: "Tipaza", DZ43: "Mila", DZ44: "Aïn Defla",
  DZ45: "Naâma", DZ46: "Aïn Témouchent", DZ47: "Ghardaïa", DZ48: "Relizane",
  DZ49: "El M'Ghair", DZ50: "El Menia", DZ51: "Ouled Djellal", DZ52: "Bordj Badji Mokhtar",
  DZ53: "Béni Abbès", DZ54: "Timimoun", DZ55: "Touggourt", DZ56: "Djanet",
  DZ57: "In Salah", DZ58: "In Guezzam",
};

const PIN_IDS = [
  "DZ16", "DZ31", "DZ25", "DZ23", "DZ19", "DZ13",
  "DZ07", "DZ47", "DZ30", "DZ08", "DZ01", "DZ11", "DZ33",
];

function wilayaNumber(id) {
  return id.replace("DZ", "");
}

function wilayaName(id, fallback) {
  return WILAYA_NAMES[id] || fallback || id;
}

async function initAlgeriaMap() {
  const host = document.getElementById("algeria-map-host");
  if (!host) return;

  const tooltip = document.getElementById("map-tooltip");
  const selectedLabel = document.getElementById("map-selected-name");
  const selectedCode = document.getElementById("map-selected-code");

  try {
    const res = await fetch("algeria.svg");
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) throw new Error("SVG invalide");

    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("id", "algeria-map");
    svg.setAttribute("role", "group");
    svg.setAttribute("aria-label", "Carte interactive des 58 wilayas d'Algérie");
    svg.style.width = "100%";
    svg.style.height = "auto";

    // Nettoyer fill/stroke inline
    svg.querySelectorAll("path[id]").forEach((path) => {
      path.removeAttribute("fill");
      path.removeAttribute("stroke");
      path.removeAttribute("stroke-width");
    });

    host.innerHTML = "";
    host.appendChild(document.importNode(svg, true));

    const map = host.querySelector("svg");
    let selectedId = "DZ16";

    function setSelected(id) {
      selectedId = id;
      map.querySelectorAll("path.is-selected").forEach((p) => p.classList.remove("is-selected"));
      const el = map.querySelector(`#${CSS.escape(id)}`);
      if (el) el.classList.add("is-selected");
      if (selectedLabel) selectedLabel.textContent = wilayaName(id, el?.getAttribute("name"));
      if (selectedCode) selectedCode.textContent = `Wilaya ${wilayaNumber(id)}`;
    }

    map.querySelectorAll("path[id]").forEach((path) => {
      const id = path.getAttribute("id");
      const name = wilayaName(id, path.getAttribute("name"));
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", `Wilaya ${wilayaNumber(id)} — ${name}`);

      path.addEventListener("mouseenter", (e) => {
        path.classList.add("is-hover");
        if (!tooltip) return;
        tooltip.style.display = "block";
        tooltip.innerHTML = `<span class="num">${wilayaNumber(id)}</span>${name}`;
      });

      path.addEventListener("mousemove", (e) => {
        if (!tooltip) return;
        const rect = host.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - rect.left}px`;
        tooltip.style.top = `${e.clientY - rect.top}px`;
      });

      path.addEventListener("mouseleave", () => {
        path.classList.remove("is-hover");
        if (tooltip) tooltip.style.display = "none";
      });

      path.addEventListener("click", () => setSelected(id));
      path.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelected(id);
        }
      });
    });

    // Points lumineux
    const ns = "http://www.w3.org/2000/svg";
    PIN_IDS.forEach((id, index) => {
      const path = map.querySelector(`#${CSS.escape(id)}`);
      if (!path || typeof path.getBBox !== "function") return;
      try {
        const box = path.getBBox();
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;
        const g = document.createElementNS(ns, "g");
        g.setAttribute("pointer-events", "none");

        const pulse = document.createElementNS(ns, "circle");
        pulse.setAttribute("cx", cx);
        pulse.setAttribute("cy", cy);
        pulse.setAttribute("r", "10");
        pulse.setAttribute("fill", "#fff");
        pulse.setAttribute("opacity", "0.45");
        pulse.innerHTML = `<animate attributeName="r" values="6;18;6" dur="2.4s" begin="${index * 0.2}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" begin="${index * 0.2}s" repeatCount="indefinite"/>`;

        const outer = document.createElementNS(ns, "circle");
        outer.setAttribute("cx", cx);
        outer.setAttribute("cy", cy);
        outer.setAttribute("r", "6");
        outer.setAttribute("fill", "#fff");

        const inner = document.createElementNS(ns, "circle");
        inner.setAttribute("cx", cx);
        inner.setAttribute("cy", cy);
        inner.setAttribute("r", "2.6");
        inner.setAttribute("fill", "#0D949C");

        g.appendChild(pulse);
        g.appendChild(outer);
        g.appendChild(inner);
        map.appendChild(g);
      } catch (_) {
        /* ignore getBBox errors before layout */
      }
    });

    setSelected(selectedId);
  } catch (err) {
    host.innerHTML = `<p style="padding:2rem;text-align:center;color:#587a80">Impossible de charger la carte.</p>`;
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", initAlgeriaMap);
