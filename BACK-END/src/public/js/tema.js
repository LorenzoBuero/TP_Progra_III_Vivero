document.addEventListener("DOMContentLoaded", () => {
  const btnTema = document.getElementById("btn-tema");

  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado === "oscuro") {
    document.body.classList.add("tema-oscuro");
  }

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("tema-oscuro");
      const temaActual = document.body.classList.contains("tema-oscuro") ? "oscuro" : "claro";
      localStorage.setItem("tema", temaActual);
    });
  }
});