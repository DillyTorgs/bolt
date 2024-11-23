import { LitElement, html, css } from 'lit';
import './components/hax-use-case-card.js';
import './components/hax-filter-sidebar.js';

export class HaxUseCaseApp extends LitElement {
  static get properties() {
    return {
      useCases: { type: Array },
      activeFilters: { type: Array },
      activeUseCase: { type: String },
      sortBy: { type: String },
      availableTags: { type: Array },
      searchQuery: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100vh;
        background: #f0f2f5;
      }

      .header {
        background: #666;
        color: white;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .logo {
        font-weight: bold;
        font-size: 1.2rem;
      }

      .header-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .search-box {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 200px;
      }

      .main-content {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 0;
        height: calc(100vh - 48px);
      }

      .journey-title {
        padding: 1rem;
        font-size: 1.5rem;
        margin: 0;
        color: #333;
      }

      .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: white;
        border-bottom: 1px solid #eee;
      }

      .results-count {
        color: #666;
      }

      .cards-container {
        padding: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
        overflow-y: auto;
        height: calc(100vh - 160px);
      }

      .tag-filters {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
      }

      .tag-filter {
        padding: 0.25rem 0.75rem;
        background: #eee;
        border-radius: 15px;
        font-size: 0.875rem;
        cursor: pointer;
      }

      .tag-filter.active {
        background: #0066cc;
        color: white;
      }
    `;
  }

  constructor() {
    super();
    this.useCases = [];
    this.activeFilters = [];
    this.activeUseCase = null;
    this.sortBy = 'title';
    this.availableTags = [];
    this.searchQuery = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadUseCases();
  }

  async loadUseCases() {
    try {
      const response = await fetch('/src/lib/use-case-data.json');
      const json = await response.json();
      this.useCases = json.data;
      this.extractTags();
    } catch (error) {
      console.error('Error loading use cases:', error);
    }
  }

  extractTags() {
    const tags = new Set();
    this.useCases.forEach(useCase => {
      useCase.tags.forEach(tag => tags.add(tag));
    });
    this.availableTags = Array.from(tags);
  }

  handleToggleFilter(tag) {
    if (this.activeFilters.includes(tag)) {
      this.activeFilters = this.activeFilters.filter(t => t !== tag);
    } else {
      this.activeFilters = [...this.activeFilters, tag];
    }
  }

  handleSearch(e) {
    this.searchQuery = e.target.value.toLowerCase();
  }

  getFilteredUseCases() {
    let filtered = this.useCases;
    
    if (this.searchQuery) {
      filtered = filtered.filter(useCase => 
        useCase.title.toLowerCase().includes(this.searchQuery) ||
        useCase.description.toLowerCase().includes(this.searchQuery)
      );
    }

    if (this.activeFilters.length > 0) {
      filtered = filtered.filter(useCase => 
        useCase.tags.some(tag => this.activeFilters.includes(tag))
      );
    }

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  render() {
    const filteredUseCases = this.getFilteredUseCases();

    return html`
      <div class="header">
        <div class="header-left">
          <div class="logo">HAX LOGO</div>
          <div class="header-controls">
            <select>
              <option>Merlin</option>
            </select>
            <input 
              type="search" 
              class="search-box" 
              placeholder="Search Sites"
              @input=${this.handleSearch}
            >
          </div>
        </div>
        <div class="user-info">
          acct name
        </div>
      </div>

      <div class="main-content">
        <hax-filter-sidebar
          .availableTags=${this.availableTags}
          .activeFilters=${this.activeFilters}
          @toggle-filter=${(e) => this.handleToggleFilter(e.detail)}
        ></hax-filter-sidebar>

        <div class="content-area">
          <h1 class="journey-title">&lt;New Journey&gt;</h1>
          
          <div class="tag-filters">
            ${this.availableTags.slice(0, 4).map(tag => html`
              <span 
                class="tag-filter ${this.activeFilters.includes(tag) ? 'active' : ''}"
                @click=${() => this.handleToggleFilter(tag)}
              >${tag}</span>
            `)}
          </div>

          <div class="results-header">
            <div class="results-count">${filteredUseCases.length} results</div>
          </div>

          <div class="cards-container">
            ${filteredUseCases.map(useCase => html`
              <hax-use-case-card
                .useCase=${useCase}
                ?selected=${this.activeUseCase === useCase.id}
                @select-use-case=${(e) => this.activeUseCase = e.detail}
              ></hax-use-case-card>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('hax-use-case-app', HaxUseCaseApp);