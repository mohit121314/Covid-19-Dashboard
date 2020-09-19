import React, { Component } from "react";
import { connect } from "react-redux";
import "../Home.css";
import { logoutUser } from "../actions";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      global: {},
      countries: [],
    };
  }

  async componentDidMount() {
    await axios.get(`https://api.covid19api.com/summary`).then((resp) => {
      this.setState({
        global: resp.data.Global,
        countries: resp.data.Countries,
      });
    });
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    return (
      <div className="container">
        <header className="header">
          <p>COVID-19</p>
          <i
            title="logout"
            className="fa fa-power-off logout"
            onClick={this.handleLogout}
            aria-hidden="true"
          ></i>
        </header>
        <aside className="aside">
          <h1>World Demographics</h1>
          <dl>
            <div className="dl-group total">
              <dt className="total">Total Cases</dt>
              <dd>{this.state.global.TotalConfirmed}</dd>
            </div>
            <div className="dl-group active">
              <dt className="active">Active Cases</dt>
              <dd>{this.state.global.NewRecovered}</dd>
            </div>
            <div className="dl-group recovered">
              <dt className="recovered">Recovered Cases</dt>
              <dd>{this.state.global.TotalRecovered}</dd>
            </div>
            <div className="dl-group deaths">
              <dt className="deaths">Deaths</dt>
              <dd>{this.state.global.TotalDeaths}</dd>
            </div>
          </dl>
          <hgroup className="newest">
            <h2>+{this.state.global.NewConfirmed}</h2>
            <h3>as of today</h3>
          </hgroup>
        </aside>
        <section className="section">
          <table>
            <caption>Country-Wise Distribution</caption>
            <thead>
              <tr>
                <th>Country</th>
                <th>Active</th>
                <th>Death</th>
                <th>Recovered</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.countries.map((item) => {
                return (
                  <tr>
                    <td>{item.Country}</td>
                    <td>{item.NewConfirmed}</td>
                    <td>{item.TotalDeaths}</td>
                    <td>{item.TotalRecovered}</td>
                    <td>{item.TotalConfirmed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Home);
