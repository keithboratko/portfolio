function projectSelect() {
  document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("mouseover", () => {
      project.querySelectorAll("button").forEach((button) => {
        button.classList.remove("hidden");
      });
    });
    project.addEventListener("mouseout", () => {
      project.querySelectorAll("button").forEach((button) => {
        button.classList.add("hidden");
      });
    });
  });
}

function verifyInput() {
  document.querySelector(".send-button").addEventListener("click", () => {
    document.querySelectorAll(".input-item").forEach((item) => {
      if (item.querySelector("input").value == "") {
        item.querySelector(".error-message").classList.remove("hidden");
      }
      if (!item.querySelector("input").checkValidity()) {
        item.querySelector(".invalid-email").classList.remove("hidden");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  projectSelect();
  verifyInput();
});
