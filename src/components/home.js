import React from 'react';


class Home extends React.Component {

    constructor(props) {
      super(props);
      this.state = { width: 0, height: 0 };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
      return (
        <div>
        <div id="SSLink" style={{marginLeft:this.state.width*.65, marginTop:this.state.height*.215}}>
          <div></div>
        </div>
        </div>

      );
    }
  }

  export default Home;
