import { LitElement, html, css } from 'lit';

export class HaxUseCaseCard extends LitElement {
  static get properties() {
    return {
      useCase: { type: Object },
      selected: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .card {
        background: white;
        border-radius: 8px;
        border: 1px solid #eee;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .card.selected {
        border-color: #0066cc;
        box-shadow: 0 0 0 1px #0066cc;
      }

      .card-preview {
        aspect-ratio: 16/9;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eee;
      }

      .preview-placeholder {
        color: #999;
        font-size: 0.875rem;
      }

      .card-content {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .card-title {
        font-size: 1rem;
        font-weight: 500;
        margin: 0 0 0.5rem 0;
        color: #333;
      }

      .card-description {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 1rem;
        flex: 1;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid #eee;
      }

      .rating {
        display: flex;
        gap: 0.25rem;
      }

      .rating-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ccc;
      }

      .select-button {
        padding: 0.5rem 1rem;
        background: #333;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
      }

      .select-button:hover {
        background: #0066cc;
      }
    `;
  }

  render() {
    const { id, title, description } = this.useCase;

    return html`
      <div class="card ${this.selected ? 'selected' : ''}">
        <div class="card-preview">
          <span class="preview-placeholder">Course</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${title}</h3>
          <p class="card-description">${description}</p>
          <div class="card-footer">
            <div class="rating">
              <span class="rating-dot"></span>
              <span class="rating-dot"></span>
              <span class="rating-dot"></span>
            </div>
            <button 
              class="select-button"
              @click=${() => this.dispatchEvent(new CustomEvent('select-use-case', { detail: id }))}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('hax-use-case-card', HaxUseCaseCard);