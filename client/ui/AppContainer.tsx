import * as React from 'react'

export default React.createClass({
  render() {
    return (
      <div id="app">
        <nav className="nav negative band">
          <header>
            NP Complete
            <ul className="nav-list nav-list-horizontal">
              <li className="active">Home</li>
              <li>About</li>
            </ul>
          </header>
        </nav>
        {this.props.children}
      </div>
    );
  }
});
