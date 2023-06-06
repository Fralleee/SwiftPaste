const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  :host {
    --swiftPastePopup-background: #fff;
    --swiftPastePopup-border: #e2e8f0;
    --swiftPastePopup-text: #020406;
    --swiftPastePopupInactive-text: #122436;
    --swiftPastePopup-input-border: #ccc;
    --swiftPastePopup-input-background: transparent;
    --swiftPastePopup-input-text: inherit;
    --swiftPastePopup-suggestion-selected-background: #ffbbfd;
  }

  .swiftPastePopup__container {
    animation: slide-in-left 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    font-family: 'Inter', sans-serif;
    position: fixed;
    background-color: var(--swiftPastePopup-background);
    border: 1px solid var(--swiftPastePopup-border);
    border-radius: 6px;
    padding: 4px;
    width: 200px;
    color: var(--swiftPastePopup-text);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    -webkit-font-smoothing antialiased;
  }

  .swiftPastePopup__input {   
    border: none;
    outline: none;
    padding: 6px 8px;
    font-size: 14px;
    width: 150px;
    background-color: transparent;    
    color: var(--swiftPastePopup-input-text);
  }

  .swiftPastePopup__suggestions {
    max-height: 250px;
    overflow-y: auto;
  }

  .swiftPastePopup__suggestion {
    cursor: pointer;
    font-size: 14px;
    padding: 6px 8px;
    border-radius: 4px;
    color: var(--swiftPastePopupInactive-text);
  }

  .swiftPastePopup__suggestion.selected {
    background-color: var(--swiftPastePopup-suggestion-selected-background);
    color: var(--swiftPastePopup-text);
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-20px) scale(0.8);
      opacity: 0;
    }
    100% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
  }

`

export default cssStyles
