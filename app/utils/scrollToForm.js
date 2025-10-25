// Utility function to scroll to the hero form
export const scrollToHeroForm = (e) => {
  if (e) {
    e.preventDefault();
  }
  
  // Find the questionnaire element
  const questionnaire = document.querySelector('.qualification-questionnaire');
  
  if (questionnaire) {
    // Calculate the position to scroll to (top of form at top of viewport)
    const rect = questionnaire.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = rect.top + scrollTop;
    
    // Smooth scroll to the form
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};