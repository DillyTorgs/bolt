import { LitElement, html, css } from 'lit';

export class HaxFilterSidebar extends LitElement {
  static get properties() {
    return {
      availableTags: { type: Array },
      activeFilters: { type: Array }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background: white;
        height: 100%;
        border-right: 1px solid #eee;
      }

      .sidebar {
        padding: 1rem;
      }

      .section {
        margin-bottom: 2rem;
      }

      .section-title {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: #333;
      }

      .filter-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .filter-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 4px;
      }

      .filter-item:hover {
        background: #f5f5f5;
      }

      .filter-item.active {
        background: #e6f0ff;
        color: #0066cc;
      }

      .filter-item input[type="checkbox"] {
        margin: 0;
      }

      .filter-item label {
        cursor: pointer;
        font-size: 0.9rem;
      }

      .favorites {
        margin-top: auto;
      }
    `;
  }

  render() {
    const categories = [
      { title: 'Template', items: ['Portfolio', 'Course', 'Resume', 'Blog', 'Research Website'] },
      { title: 'Template', items: ['Portfolio', 'Course', 'Resume', 'Blog', 'Research Website'] },
      { title: 'Template', items: ['Portfolio', 'Course', 'Resume', 'Blog', 'Research Website'] },
      { title: 'My favorites', items: [] }
    ];

    return html`
      <div class="sidebar">
        <div class="search">
          <input type="search" placeholder="🔍">
        </div>

        ${categories.map(category => html`
          <div class="section">
            <h3 class="section-title">${category.title}</h3>
            <div class="filter-list">
              ${category.items.map(item => html`
                <div class="filter-item ${this.activeFilters?.includes(item) ? 'active' : ''}">
                  <input 
                    type="checkbox" 
                    id=${item}
                    .checked=${this.activeFilters?.includes(item)}
                    @change=${() => this.dispatchEvent(new CustomEvent('toggle-filter', { detail: item }))}
                  >
                  <label for=${item}>${item}</label>
                </div>
              `)}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('hax-filter-sidebar', HaxFilterSidebar);