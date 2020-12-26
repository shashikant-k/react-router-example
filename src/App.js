import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Header from './Header';

const Country = ({ country }) => {
  const { country: countryName, countryCode, capital } = country;
  return (
    <div className="Country">
      <h1>{countryName}</h1>
      <p>
        The country is {countryName} that has a code of{' '}
        <code>{countryCode}</code>, which has its capital in {capital}.
      </p>
    </div>
  );
};

const LeftSideBar = ({ countries, match }) => {
  // console.log(match);
  return (
    <div className="list-group mt-2">
      {countries.map((country, key) => (
        <Link
          to={country.countryCode}
          key={key}
          className={
            'list-group-item list-group-item-action' +
            (match.params.countryID === country.countryCode ? ' active' : '')
          }
        >
          {country.country}
        </Link>
      ))}
    </div>
  );
};
class App extends Component {
  state = {
    countries: []
  };

  componentDidMount() {
    fetch('/data.json')
      .then(res => res.json())
      .then(countries => this.setState({ countries }));
  }
  render() {
    const { countries } = this.state;
    return (
      <Router>
        <div className="App">
          <Header dark={true}>
            <Link to="/" className="navbar-brand">
              Countries
            </Link>
          </Header>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <Route
                  path={['/:countryID', '/']}
                  render={({ match }) => (
                    <LeftSideBar match={match} countries={countries} />
                  )}
                />
              </div>
              <div className="col-6">
                <Route path="/" exact={true}>
                  <h1>Welcome to Countries</h1>
                  <p>Click on the items in left to see more details.</p>
                </Route>
                {this.state.countries.length > 0 && (
                  <Route
                    path="/:countryID"
                    render={({ match }) => (
                      <Country
                        country={this.state.countries.find(
                          country =>
                            country.countryCode === match.params.countryID
                        )}
                      />
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
