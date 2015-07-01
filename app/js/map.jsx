var React = require("react");
var L = require('leaflet');

var TorqueLayer = require('./lib/torque_layer.js');

var Map = React.createClass({

  createMap(element) {
    window.map = L.map(element, {minZoom: 1, maxZoom: 5});

    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
      attribution: '',
      subdomains: '1234'
    }).addTo(map);

    new TorqueLayer(map, {
      callback: this.props.onTimeChange
    });

    return map;
  },

  setupMap() {
    this.map.setView([this.props.lat, this.props.lon], this.props.zoom);
  },

  componentDidUpdate() {
    console.log('update');
  },

  componentDidMount() {
    if (this.props.createMap) {
      this.map = this.props.createMap(this.getDOMNode());
    } else {
      this.map = this.createMap(this.getDOMNode());
    }

    this.setupMap();
  },

  render() {
    return (<div className="map"> </div>);
  }

});

module.exports = Map;
