function contentDisplay() {
	var content_classes = [];
  
    document.querySelectorAll(".category-button").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".category-button").forEach((button) => {
                button.classList.remove("active");
            })
            button.classList.add("active");
            button_classes = button.classList;
            document.querySelectorAll(".content").forEach((content) => {
                content.classList.add("hidden");
                content_classes = content.classList;
                content_classes.forEach((content_class) => {
                    button_classes.forEach((button_class) => {
                    if (content_class == button_class) {
                        content.classList.remove("hidden");
                    }
                })
                })
            })
            if (button.classList.contains("two")) {
                document.querySelector(".planet-image").src = "assets/planet-" + document.querySelector(".planet-name").textContent.toLowerCase() + "-internal.svg";
            }
            else {
                document.querySelector(".planet-image").src = "assets/planet-" + document.querySelector(".planet-name").textContent.toLowerCase() + ".svg";
            }
            if (button.classList.contains("three")) {
                document.querySelector(".geology").classList.remove("hidden-image");
            }
            else {
                document.querySelector(".geology").classList.add("hidden-image");
            }
        })
    })
}

function menuDisplay() {
    document.querySelector(".mobile-menu-button").addEventListener("click", () => {
        if (document.querySelector(".mobile-planet-menu").style.display == "flex") {
            document.querySelector(".mobile-planet-menu").style.display = "none";

        }
        else {
            document.querySelector(".mobile-planet-menu").style.display = "flex";
        }
    })
}

document.addEventListener("DOMContentLoaded", (event) => {
	contentDisplay();
    menuDisplay();
});