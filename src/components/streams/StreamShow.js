import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount(){
    const { id } = this.props.match.params

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  // any rendering of component we try to build the player
  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy()
  }

  // we created this helper method so that when we first load the page and the component mounts without any information, we dont get any errors
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    
    const { id } = this.props.match.params

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }
  
  render() {
    if (!this.props.stream){
      return <div>Loading...</div>
    }

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{this.props.stream.title}</h1>
        <h5>{this.props.stream.description}</h5>
      </div>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)