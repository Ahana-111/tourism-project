import { Component } from '@angular/core';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent {

  // 🔍 Filtering logic
  filterDestinations() {
    const searchInput = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
    const typeFilter = (document.getElementById("typeFilter") as HTMLSelectElement).value;
    const priceFilter = (document.getElementById("priceFilter") as HTMLSelectElement).value;
    const sortFilter = (document.getElementById("sortFilter") as HTMLSelectElement).value;

    const cards = document.querySelectorAll(".destination-card");

    let cardsArray: HTMLElement[] = Array.from(cards) as HTMLElement[];
    let anyVisible = false; // Track if any card is visible

    // Filter each card
    cardsArray.forEach(card => {
      const title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
      const description = card.querySelector("p")?.textContent?.toLowerCase() || "";
      const type = card.getAttribute("data-type") || "";
      const priceText = card.querySelector(".price")?.textContent || "0";
      const price = parseInt(priceText.replace(/[^0-9]/g, ""), 10);

      let visible = true;

      // 🔍 Search filter
      if (searchInput && !title.includes(searchInput) && !description.includes(searchInput)) {
        visible = false;
      }

      // 🏞 Type filter
      if (typeFilter && type !== typeFilter) {
        visible = false;
      }

      // 💰 Price filter
      if (priceFilter && price > parseInt(priceFilter, 10)) {
        visible = false;
      }

      // Show/hide card
      card.style.display = visible ? "block" : "none";

      if (visible) {
        anyVisible = true;
      }
    });

    // ↕️ Sorting
    if (sortFilter) {
      const container = document.getElementById("destinationsList");
      if (container) {
        cardsArray = cardsArray.filter(card => card.style.display !== "none"); // only visible cards
        cardsArray.sort((a, b) => {
          const priceA = parseInt(a.querySelector(".price")?.textContent?.replace(/[^0-9]/g, "") || "0", 10);
          const priceB = parseInt(b.querySelector(".price")?.textContent?.replace(/[^0-9]/g, "") || "0", 10);

          return sortFilter === "low" ? priceA - priceB : priceB - priceA;
        });

        // Re-append sorted cards
        cardsArray.forEach(card => container.appendChild(card));
      }
    }

    // 🚨 Show/Hide "No Results Found"
    const noResults = document.getElementById("noResults");
    if (noResults) {
      noResults.style.display = anyVisible ? "none" : "block";
    }
  }

  // 🔄 Reset Filters
  resetFilters() {
    // Reset all inputs
    (document.getElementById("searchInput") as HTMLInputElement).value = "";
    (document.getElementById("typeFilter") as HTMLSelectElement).value = "";
    (document.getElementById("priceFilter") as HTMLSelectElement).value = "";
    (document.getElementById("sortFilter") as HTMLSelectElement).value = "";

    // Re-run filter to show all destinations
    this.filterDestinations();
  }

  // 📞 Modal handling
  openModal() {
    const modal = document.getElementById("callbackModal");
    if (modal) modal.style.display = "block";
  }

  closeModal() {
    const modal = document.getElementById("callbackModal");
    if (modal) modal.style.display = "none";
  }

  submitCallback() {
    // Close the modal
    this.closeModal();

    // Show the popup message (green box at bottom)
    const popup = document.getElementById("popupMessage");
    if (popup) {
      popup.style.display = "block";

      // Hide it automatically after 3 seconds
      setTimeout(() => {
        popup.style.display = "none";
      }, 3000);
    }
  }
}