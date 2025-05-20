/**
 * Adhesive Recommendations
 * 
 * Handles the functionality for the adhesive recommendations component.
 * Updates required quantities when the main product quantity changes.
 * Allows selection of adhesive options.
 */
class AdhesiveRecommendations {
  constructor() {
    this.quantityInput = null;
    this.requiredQuantityElements = [];
    this.adhesiveOptions = [];
    this.selectedAdhesives = new Set();
    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.quantityInput = document.querySelector('.quantity__input');
      this.requiredQuantityElements = document.querySelectorAll('.required-quantity');
      this.adhesiveOptions = document.querySelectorAll('.adhesive-option');
      
      if (this.quantityInput) {
        this.setupEventListeners();
        
        // Select the first adhesive option by default (skip the "none" option)
        const adhesiveOptions = Array.from(this.adhesiveOptions).filter(
          option => !option.classList.contains('adhesive-option--none')
        );
        
        if (adhesiveOptions.length > 0) {
          // Select the first actual adhesive option
          this.selectOption(adhesiveOptions[0]);
        }
      }
    });
  }
  
  /**
   * Select a specific option
   * @param {HTMLElement} option - The adhesive option element to select
   */
  selectOption(option) {
    if (!option) return;
    
    const adhesiveId = option.getAttribute('data-adhesive-id');
    
    // Deselect all options first
    this.adhesiveOptions.forEach(opt => {
      opt.classList.remove('selected');
    });
    
    // Select the specified option
    option.classList.add('selected');
    
    // Update the selected adhesives set
    this.selectedAdhesives.clear();
    this.selectedAdhesives.add(adhesiveId);
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Update required quantities when the main product quantity changes
    this.quantityInput.addEventListener('change', () => this.updateRequiredQuantities());
    
    // Also listen for clicks on the quantity buttons
    const quantityButtons = document.querySelectorAll('.quantity__button');
    if (quantityButtons.length) {
      quantityButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Use setTimeout to ensure the quantity has been updated before calculating
          setTimeout(() => this.updateRequiredQuantities(), 10);
        });
      });
    }
    
    // Make adhesive options selectable
    this.adhesiveOptions.forEach(option => {
      option.addEventListener('click', () => this.toggleAdhesiveSelection(option));
    });
  }
  
  /**
   * Toggle the selection state of an adhesive option (radio button behavior)
   * @param {HTMLElement} option - The adhesive option element
   */
  toggleAdhesiveSelection(option) {
    const adhesiveId = option.getAttribute('data-adhesive-id');
    
    if (option.classList.contains('selected')) {
      // Deselect if already selected
      option.classList.remove('selected');
      this.selectedAdhesives.clear();
    } else {
      // Deselect all other options first (radio button behavior)
      this.adhesiveOptions.forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Select the clicked option
      option.classList.add('selected');
      
      // Clear previous selection and add the new one
      this.selectedAdhesives.clear();
      this.selectedAdhesives.add(adhesiveId);
    }
    
    // Here you could trigger other actions when selection changes
    // For example, updating a hidden input with the selected adhesive
    console.log('Selected adhesive:', Array.from(this.selectedAdhesives)[0] || 'none');
  }

  /**
   * Update the required quantities based on the main product quantity
   */
  updateRequiredQuantities() {
    const currentQuantity = parseInt(this.quantityInput.value, 10) || 1;
    
    this.requiredQuantityElements.forEach(element => {
      const ratio = parseFloat(element.getAttribute('data-ratio')) || 1;
      const requiredQuantity = Math.ceil(currentQuantity * ratio);
      
      // Update the quantity
      element.textContent = requiredQuantity;
      
      // Update the price in the ratio text if possible
      const priceElement = element.nextElementSibling;
      if (priceElement && priceElement.classList.contains('adhesive-option__ratio')) {
        const originalText = priceElement.textContent;
        const parts = originalText.split(' - ');
        
        if (parts.length > 1) {
          // Get the price from data attribute if available
          const priceStr = element.getAttribute('data-price');
          if (priceStr) {
            // Extract just the number from the price string (remove currency symbol)
            const priceMatch = priceStr.match(/[\d,.]+/);
            if (priceMatch) {
              const price = parseFloat(priceMatch[0].replace(/,/g, ''));
              const totalPrice = (price * requiredQuantity).toFixed(2);
              
              // Format the price with the same currency symbol
              const currencySymbol = priceStr.replace(/[\d,.\s]/g, '');
              const formattedPrice = `${currencySymbol}${totalPrice}`;
              
              // Update just the price part
              priceElement.textContent = `${parts[0]} - ${formattedPrice}`;
            }
          }
        }
      }
    });
  }
}

// Initialize the component
new AdhesiveRecommendations();
