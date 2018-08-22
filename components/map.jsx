import React from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
window.$ = jQuery;

class MapContainer extends React.Component {

    constructor(props){
        super(props);
    }

  render(){
     return (
         <div className='map'>
             <Map google={this.props.google}
                  initialCenter = {{
                      lat: 51.4819605,
                      lng: -0.1373887
                  }}
                  zoom={10}
                  className='compMap'
             >
                 {Array.from(this.props.params).map((item) => {
                             return (<Marker
                                     title={item.name}
                                     label={item.stopLetter}
                                     position={{lat: item.lat, lng: item.lon}}
                                 />
                             )
                    })
                 }
              </Map>
         </div>
    );
  };
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyB55zCy1WjzgFOaO63fQSR-Q9WJPoBe-P0')
})(MapContainer)