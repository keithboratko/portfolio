function projectSelect() {
  document.querySelectorAll(".project").forEach((project) => {
    if (window.innerWidth >= 480) {
      querySelectorAll("a").forEach((link) => {
        if (link.classList.contains("hidden")) {
          link.classList.remove("hidden");
        }
      })
      
    }
    project.addEventListener("mouseover", () => {
      project.querySelectorAll("a").forEach((link) => {
        link.classList.remove("hidden");
      });
    });
    project.addEventListener("mouseout", () => {
      project.querySelectorAll("a").forEach((link) => {
        link.classList.add("hidden");
      });
    });
  });
}

// function verifyInput() {
//   document.querySelector(".send-button").addEventListener("click", () => {
//     document.querySelectorAll(".input-item").forEach((item) => {
//       if (item.querySelector("input").value == "") {
//         item.querySelector(".error-message").classList.remove("hidden");
//       }
//       if (!item.querySelector("input").checkValidity()) {
//         item.querySelector(".invalid-email").classList.remove("hidden");
//       }
//     });
//   });
// }

  function openInNewTab() {

    document.querySelectorAll(".github-link").forEach((githubButton) => {
      githubButton.addEventListener("click", () => {
        window.open('https://www.github.com/keithboratko', '_blank').focus();
      })
    })
    document.querySelectorAll(".linkedin-link").forEach((linkedinButton) => {
      linkedinButton.addEventListener("click", () => {
        window.open('https://www.linkedin.com/in/keith-boratko-7b1813337/', '_blank').focus();
      })
    })

  }

  // function removeHidden() {
  //   if (window.innerWidth >= 480) {
  //     document.querySelectorAll("a").forEach((link) => {
  //       if (link.classList.contains("hidden")) {
  //         link.classList.remove("hidden");
  //       }

  //     }) 
      
  //   }
  // }

document.addEventListener("DOMContentLoaded", (event) => {
  projectSelect();
  // verifyInput();
  openInNewTab();
  // removeHidden();
});
