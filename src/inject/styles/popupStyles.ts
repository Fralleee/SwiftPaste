const cssStyles = `
  :host {
    --swiftPastePopup-background: #fff;
    --swiftPastePopup-border: #e2e8f0;
    --swiftPastePopup-text: #0f172a;
    --swiftPastePopupInactive-text: #0f172a;
    --swiftPastePopup-input-border: #ccc;
    --swiftPastePopup-input-background: transparent;
    --swiftPastePopup-input-text: inherit;
    --swiftPastePopup-suggestion-selected-background: #f1f5f9;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --swiftPastePopup-background: #030711;
      --swiftPastePopup-border: #1d283a;
      --swiftPastePopup-text: #f8fafc;
      --swiftPastePopupInactive-text: #94b8a3;
      --swiftPastePopup-input-border: #666;
      --swiftPastePopup-input-background: #222;
      --swiftPastePopup-input-text: inherit;
      --swiftPastePopup-suggestion-selected-background: #1d283a;
    }
  }

  .swiftPastePopup__container {
    position: fixed;
    background-color: var(--swiftPastePopup-background);
    border: 1px solid var(--swiftPastePopup-border);
    border-radius: 6px;
    padding: 4px;
    width: 200px;
    color: var(--swiftPastePopup-text);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .swiftPastePopup__input {
    border: none;
    outline: none;
    padding: 6px 8px;
    font-size: 14px;
    max-width: 100%;
    background-color: transparent;    
    color: var(--swiftPastePopup-input-text);
  }

  .swiftPastePopup__suggestions {
    margin-top: 8px;
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
`

export default cssStyles
