// 1. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 2. Highlight nav link based on current page
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.style.borderBottom = "2px solid #ffd700";
  }
});

// 3. Formspree contact form handler
if (window.location.pathname.includes("contact.html")) {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        successMessage.style.display = "block";
      } else {
        alert("Oops! Something went wrong. Please try again later.");
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
    }
  });
}

// 4. Fade in animation on scroll with sequence (works site-wide)
const fadeSelectors = ["#heroBanner", "main", "footer"];

// Collect elements from the current page that match the selectors
const fadeElements = fadeSelectors
  .map(sel => document.querySelector(sel))
  .filter(el => el); // remove nulls if some pages don’t have all sections

// Apply initial styles
fadeElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease-out";
});

let currentIndex = 0;

function fadeInSequentially() {
  if (currentIndex < fadeElements.length) {
    const el = fadeElements[currentIndex];
    el.style.opacity = 1;
    el.style.transform = "translateY(0)";
    currentIndex++;
    setTimeout(fadeInSequentially, 400); // delay between fades
  }
}

// Trigger sequence when the first element in the list enters view
if (fadeElements.length > 0) {
  const sequenceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fadeInSequentially();
        sequenceObserver.disconnect(); // run once
      }
    });
  }, { threshold: 0.2 });

  sequenceObserver.observe(fadeElements[0]);
}


// 5. Scroll-to-top button
const scrollBtn = document.getElementById("scrollToTopBtn");

window.onscroll = () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 6. Animate service cards on scroll
const serviceCards = document.querySelectorAll(".service-card");

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

serviceCards.forEach(card => {
  cardObserver.observe(card);
});
