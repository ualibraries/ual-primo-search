import React, { Component } from 'react'
import config from '../app.config'
import queryString from 'query-string'

class App extends Component {
  state = {
    searchType: 'any,contains', // default search type: Keyword
    searchQuery: '',
    params: ''
  }

  searchParams = () => {
    let params = {
      query: `${this.state.searchType},${this.state.searchQuery}`,
      search_scope: 'Everything',
      tab: 'default_tab',
      lang: 'en_US',
      institution: config.institution,
      vid: config.vid,
    }

    let queryString = ''
    let numArgs = 0

    // Change the parameters based on the users choice of:
    // Keyword, Title, Author, Call number
    switch (this.state.searchType) {
      // Title
      case 'title,contains':
        params['mode'] = 'advanced'
        break
      // Author
      case 'creator,contains':
        // Adding the `,AND` prevents Primo from discarding the text after a 
        // comma in a search string containing a comma
        params.query += ',AND'
        params['mode'] = 'advanced'
        break
      // Call number
      case 'lsr01,contains':
        params['mode'] = 'advanced'
        break
      // Keyword (or anything else)
      default:
        break
    }

    for (let element in params) {
      queryString += `${element}=${params[element]}`
      numArgs++

      // Don't add '&' after the last parameter
      if (numArgs < Object.keys(params).length) {
        queryString += '&'
      }
    }

    return queryString
  }

  buildPrimoQuery = cb => {
    this.setState(
      {
        params: this.searchParams()
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
      this.trackEvent('Library search', 'search', this.state.searchQuery)

      window.location.href =
        `${config.domain}/primo-explore/search?${this.state.params}`
    }
  }

  // Track an event in Google analytics
  trackEvent = (category, action, label) => {
    if (typeof ga !== 'undefined') {
      ga('send', 'event', category, action, label)
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
            onSubmit={this.handleSearchSubmit}
          >
            <div className="fields">
              <div className="field">
                <select
                  id="ual-primo-search-type"
                  onChange={this.handleSearchTypeChange}
                  className="query-type"
                  value={this.state.searchType}
                >
                  <option value="any,contains">Keyword</option>
                  <option value="title,contains">Title</option>
                  <option value="creator,contains">Author</option>
                  <option value="lsr01,contains">Call number</option>
                </select>
              </div>

              <div className="field field-grow">
                <input
                  type="text"
                  id="ual-primo-search-text"
                  value={this.state.searchQuery}
                  onChange={this.handleSearchQueryChange}
                  className="query-text"
                  placeholder="Search for books, articles, almost anything..."
                />

                <input
                  type="submit"
                  value="Search"
                  className="query-submit"
                  title="Search library resources"
                  id="ual-primo-search-submit"
                />
              </div>
            </div>
          </form>

          <div className="other-search">
            <div className="other-search-col">
              <a
                href="https://databases.library.arizona.edu"
                className="button"
                role="button"
                id="ual-primo-search-see-all-databases"
                onClick={this.trackEvent(
                  'Library search',
                  'databases',
                  'See all databases'
                )}
              >
                See all databases
              </a>
            </div>

            <div className="other-search-col">
              <a
                href={`${
                  config.domain
                }/primo-explore/jsearch?vid=${config.vid}&lang=en_US`}
                className="button"
                role="button"
                id="ual-primo-search-find-a-journal"
                onClick={this.trackEvent(
                  'Library search',
                  'journal',
                  'Find a journal'
                )}
              >
                Find a journal
              </a>
            </div>

            <div className="other-search-col">
              <a
                href={`${
                  config.domain
                }/primo-explore/search?sortby=rank&vid=${config.vid}&lang=en_US&mode=advanced`}
                className="button button-link"
                role="button"
                id="ual-primo-search-advanced-search"
                onClick={this.trackEvent(
                  'Library search',
                  'advanced',
                  'Advanced search'
                )}
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

          h2.title {
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
            height: auto;
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
            height: auto;
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
            background-color: #ffffff;
            cursor: pointer;
          }

          .button {
            display: inline-block;
            margin: 0;
            padding: 0.5rem 1rem;
            border: 0;
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
              margin-bottom: 0;
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
