const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  :host {
    --swiftPastePopup-background: #fff;
    --swiftPastePopup-border: #e2e8f0;
    --swiftPastePopup-text: #020406;
    --swiftPastePopupInactive-text: #62666a;
    --swiftPastePopup-input-background: transparent;
    --swiftPastePopup-input-text: inherit;
    --swiftPastePopup-suggestion-selected-background: #e2e8f0;
  }

  .swiftPastePopup__container {
    display: flex;
    flex-direction: column-reverse;
    box-sizing: border-box;
    animation: scale-in 160ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    font-family: 'Inter', sans-serif;
    position: fixed;
    background-color: var(--swiftPastePopup-background);
    border: 1px solid var(--swiftPastePopup-border);
    border-radius: 6px;
    max-width: 280px;
    padding: 4px;
    color: var(--swiftPastePopup-text);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    -webkit-font-smoothing antialiased;
  }

  .swiftPastePopup__container.up {
    flex-direction: column;
  }
  
  .swiftPastePopup__container:not(.up) .swiftPastePopup__suggestions {
    border-top: 1px solid var(--swiftPastePopup-border);
  }

  .swiftPastePopup__container.up .swiftPastePopup__suggestions {
    border-bottom: 1px solid var(--swiftPastePopup-border);
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  .input-wrapper > svg {
    display: flex;
    align-items: center;
    position: relative;
    padding: 12px 0 10px 12px;
    fill: var(--swiftPastePopup-border);
  }

  .swiftPastePopup__input {   
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 10px 12px;
    font-size: 14px;
    width: 100%;
    background-color: transparent;    
    color: var(--swiftPastePopup-input-text);
  }

  .swiftPastePopup__suggestions {
    max-height: 250px;
    overflow-y: auto;
    padding: 4px 4px 0 0;    
    margin: 0;
    list-style: none;
  }
  
  .swiftPastePopup__suggestions:empty:after {
    display: block;
    font-size: 14px;
    color: var(--swiftPastePopupInactive-text);
    content: "No matches found";
    text-align: center;
    width: 100%;
    padding: 12px 0;
  }

  .swiftPastePopup__suggestion {
    display: flex;
    gap: 1em;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 14px;
    color: var(--swiftPastePopupInactive-text);
  }
  
  .swiftPastePopup__suggestion > div.value {
    flex: 1;
    color: rgba(0,0,0,.25);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .swiftPastePopup__suggestion.selected {
    background-color: var(--swiftPastePopup-suggestion-selected-background);
    color: var(--swiftPastePopup-text);
  }

  @keyframes scale-in {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    margin: 4px;
    padding: 4px;
    border-radius: 2px;
    background-color: var(--swiftPastePopup-border);
  }
   
  ::-webkit-scrollbar-thumb {
    background: #FF499B; 
    border-radius: 2px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #dF297B; 
  }
`

export default cssStyles
