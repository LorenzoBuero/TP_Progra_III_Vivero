document.addEventListener("DOMContentLoaded", () => {
  const btnTema = document.getElementById("btn-tema");

  // Aplicar el tema al cargar la página
  if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("tema-oscuro");
  }

  // Manejar el click en el botón para alternar el tema
  if (btnTema) {
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("tema-oscuro");

      if (document.body.classList.contains("tema-oscuro")) {
        localStorage.setItem("tema", "oscuro");
      } else {
        localStorage.setItem("tema", "claro");
      }
    });
  }
});