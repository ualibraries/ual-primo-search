import React, { Component } from 'react'
import config from '../app.config'

class App extends Component {
  state = {
    searchType: 'any,contains',
    searchQuery: '',
    primoQuery: ''
  }

  buildPrimoQuery = cb => {
    this.setState(
      {
        primoQuery: `${this.state.searchType},${this.state.searchQuery}`
      },
      cb != null ? cb() : null
    )
  }

  handleSearchTypeChange = event => {
    this.setState({ searchType: event.target.value }, () => {
      this.buildPrimoQuery()
    })
  }

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.target.value }, () => {
      this.buildPrimoQuery()
    })
  }

  handleSearchSubmit = event => {
    event.preventDefault()
    if (this.state.searchQuery.length) {
      this.buildPrimoQuery(window.document.forms['primoSearchForm'].submit())
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <h2 className="title">Library search</h2>

          <form
            name="primoSearchForm"
            role="search"
            method="get"
            action={`${config.domain}/primo_library/libweb/action/dlSearch.do`}
          >
            <div className="fields">
              <div className="field">
                <select
                  name="type"
                  id=""
                  onChange={this.handleSearchTypeChange}
                  className="query-type"
                >
                  <option value="any,contains" selected="selected">
                    Keyword
                  </option>
                  <option value="title,contains">Title</option>
                  <option value="creator,contains">Author</option>
                  <option value="lsr01,contains">Call number</option>
                </select>
              </div>

              <div className="field field-grow">
                <input
                  type="text"
                  name=""
                  id=""
                  value={this.state.searchQuery}
                  onChange={this.handleSearchQueryChange}
                  className="query-text"
                  placeholder="Search for books, articles, almost anything..."
                />

                <input
                  type="submit"
                  value="Search"
                  onClick={this.handleSearchSubmit}
                  className="query-submit"
                  title="Search library resources"
                />
              </div>
            </div>
            <input
              name="institution"
              value={config.institution}
              type="hidden"
            />

            <input name="vid" value={config.vid} type="hidden" />

            <input
              name="query"
              id="primoQuery"
              type="hidden"
              value={this.state.primoQuery}
            />
          </form>

          <div className="other-search">
            <div className="other-search-col">
              <a
                href="https://databases.library.arizona.edu"
                className="button"
                role="button"
              >
                See all databases
              </a>
            </div>

            <div className="other-search-col">
              <a
                href={`${
                  config.domain
                }/primo-explore/jsearch?vid=01UA&lang=en_US`}
                className="button"
                role="button"
              >
                Find a journal
              </a>
            </div>

            <div className="other-search-col">
              <a
                href={`${
                  config.domain
                }/primo-explore/search?sortby=rank&vid=01UA&lang=en_US&pcAvailability=true`}
                className="button button-link"
                role="button"
              >
                Advanced search
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          .wrapper {
            padding: 1rem;
            background-color: #0c234b;
            font-family: 'MiloWeb', sans-serif;
          }

          @media (min-width: 540px) {
            .wrapper {
              padding: 1.5rem 2rem;
            }
          }

          .title {
            margin: 0 0 1rem 0;
            color: #ffffff;
            font-weight: normal;
            font-size: 2rem;
          }

          @media (min-width: 540px) {
            .fields {
              display: flex;
              margin-bottom: 1rem;
            }
          }

          .field {
            margin-bottom: 1rem;
          }

          @media (min-width: 540px) {
            .field {
              margin-bottom: 0;
            }
          }

          .field-grow {
            position: relative;
            flex: 1;
          }

          .query-type {
            width: 100%;
            padding: 0.75rem 1.5rem 0.75rem 0.75rem;
            border: 0;
            border-radius: 0;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132.94 66.47"><title>dropdown-arrow</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="132.94 0 66.47 66.47 0 0 132.94 0" fill="%23227db2"/></g></g></svg>');
            background-size: 10px;
            background-position: 90% center;
            background-repeat: no-repeat;
            background-color: #ffffff;
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          @media (min-width: 540px) {
            .query-type {
              width: auto;
              margin-right: 1rem;
            }
          }

          .query-text {
            box-sizing: border-box;
            width: 100%;
            max-width: 100%;
            display: block;
            padding: 0.75rem;
            border: 0;
            border-bottom: 1px solid #fff;
          }

          .query-submit {
            position: absolute;
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            width: 1.5rem;
            height: 1.25rem;
            display: block;
            border: 0;
            outline: none;
            padding: 0;
            background-color: #ffffff;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.88 21.87"><title>search-icon</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Page-1"><g id="Artboard-Copy"><g id="Group-11"><g id="Group-2"><path id="search---anticon" d="M21.63,20.36a.93.93,0,0,1,0,1.27.92.92,0,0,1-.63.24.82.82,0,0,1-.61-.24l-5-5a9.19,9.19,0,0,1-6,2.15A9,9,0,0,1,2.75,16,9,9,0,0,1,0,9.38,9,9,0,0,1,2.75,2.75,9,9,0,0,1,9.38,0,9,9,0,0,1,16,2.75a9,9,0,0,1,2.75,6.63,9.19,9.19,0,0,1-2.15,6Zm-9.3-3.95a7.82,7.82,0,0,0,4.08-4.08A7.54,7.54,0,0,0,17,9.38a7.55,7.55,0,0,0-.58-3,7.82,7.82,0,0,0-4.08-4.08,7.54,7.54,0,0,0-2.95-.58,7.55,7.55,0,0,0-3,.58A7.7,7.7,0,0,0,4,4,7.29,7.29,0,0,0,2.37,6.42a7.23,7.23,0,0,0-.61,3,7.22,7.22,0,0,0,.61,2.95A7.29,7.29,0,0,0,4,14.76a7.7,7.7,0,0,0,2.43,1.65,7.55,7.55,0,0,0,3,.58A7.54,7.54,0,0,0,12.33,16.41Z" fill="%23227db2"/></g></g></g></g></g></g></svg>');
            background-repeat: no-repeat;
            background-position: center center;
            color: rgba(255, 0, 0, 0);
            text-indent: -1000px;
          }

          .query-submit:hover {
            cursor: pointer;
          }

          .button {
            display: inline-block;
            padding: 0.75rem 1rem;
            background-color: #394c69;
            color: #ffffff;
            text-decoration: none;
            transition: background-color 0.2s ease;
          }

          .button:hover {
            background-color: #4d678f;
          }

          .button-link {
            background-color: transparent;
            text-decoration: underline;
          }

          @media (min-width: 540px) {
            .other-search {
              display: flex;
            }
          }

          .other-search-col {
            margin-bottom: 1rem;
          }

          @media (min-width: 540px) {
            .other-search-col {
              margin-right: 1rem;
            }
          }

          .other-search-col:last-child {
            margin-bottom: 0;
          }

          @media (min-width: 540px) {
            .other-search-col:last-child {
              flex: 1;
              margin-right: 0;
              text-align: right;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default App
