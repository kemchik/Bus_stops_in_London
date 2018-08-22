import React from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
import StopPoint from './stoppoint.jsx'
import Map from './map.jsx'

class StopPoints extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            stopPoints: '',
            directionName: "Bus number wasn't entered",
            pointWithId: '',
            chose: false
        };

        this.busNumberFromInp = '';
        this.direction = 'outbound';
        this.choiceBus = this.choiceBus.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.getData = this.getData.bind(this);
    }

    choiceBus() {
        this.busNumberFromInp = $('#busNumber').val();
        this.getData();
    }

    getData(){
        const api = `https://api.tfl.gov.uk/line/${this.busNumberFromInp}/route/sequence/${this.direction}`;
        let stopPoints = '';
        let directionName = '';

        const get = $.ajax({
             type: 'GET',
             url: api,
             success: dataLoaded,
             async:false
         });

         function dataLoaded(data) {

             stopPoints = data.stopPointSequences[0].stopPoint;
             directionName = data.orderedLineRoutes[0].name
         }

        if(get.statusText === 'error'){
            alert('Please enter a correct bus number')
        } else {
            $('html, body').animate({ scrollTop: $('#stopPoints').offset().top }, 500);
            this.setState({
                stopPoints: stopPoints,
                directionName: directionName.replace('&harr;', '-'),
                chose: true
            });
        }


    }

    changeDirection(){
        if(this.direction === 'outbound'){
            this.direction = 'inbound';
        } else {
            this.direction = 'outbound';
        }

        this.getData()
    }

    componentDidMount() {
        $('#forSendBusNumber').bind('click', this.choiceBus);
        $('#changeDirection').bind('click', this.changeDirection);
    };

    render(){
           return (
               <div className="points">
                   <div id="pointing">
                       <div>
                           <h3>{this.state.directionName}</h3>
                           <button id='changeDirection'></button>
                           {Array.from(this.state.stopPoints).map((item) => {
                               return (<StopPoint params = {item} bus={this.busNumberFromInp} direction = {this.state.direction}/>)
                           })}
                       </div>
                   </div>
                   <div>
                       <Map params={this.state.stopPoints}/>
                   </div>
                </div>
        )
    }
}

module.exports = StopPoints;