const cssStyles = `
  :host {
    --swiftPastePopup-background: #fff;
    --swiftPastePopup-border: #000;
    --swiftPastePopup-text: black;
    --swiftPastePopupInactive-text: #444;
    --swiftPastePopup-input-border: #ccc;
    --swiftPastePopup-input-background: transparent;
    --swiftPastePopup-input-text: inherit;
    --swiftPastePopup-suggestion-selected-background: #f0f0f0;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --swiftPastePopup-background: #333;
      --swiftPastePopup-border: #999;
      --swiftPastePopup-text: #fff;
      --swiftPastePopupInactive-text: #ddd;
      --swiftPastePopup-input-border: #666;
      --swiftPastePopup-input-background: #222;
      --swiftPastePopup-input-text: #fff;
      --swiftPastePopup-suggestion-selected-background: #444;
    }
  }

  .swiftPastePopup__container {
    position: fixed;
    background-color: var(--swiftPastePopup-background);
    border: 1px solid var(--swiftPastePopup-border);
    border-radius: 6px;
    padding: 8px;
    width: 200px;
    color: var(--swiftPastePopup-text);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .swiftPastePopup__input {
    border: 1px solid var(--swiftPastePopup-input-border);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 14px;
    width: 100%;
    margin-bottom: 8px;
    background-color: var(--swiftPastePopup-input-background);
    color: var(--swiftPastePopup-input-text);
  }

  .swiftPastePopup__suggestions {
    margin-top: 8px;
  }

  .swiftPastePopup__suggestion {
    cursor: pointer;
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
