import React from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import moment from 'moment/min/moment-with-locales';
window.$ = jQuery;

class StopPoint extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            time: '',
            classTime: 'time'
        };

        this.showTime = this.showTime.bind(this)
        this.changeShow = this.changeShow.bind(this)
    }

    showTime(e){
        let time = ''
        const dom = $(e.target);
        const stopId = dom.attr('stationId');
        const bus = dom.attr('bus');
        const api = `https://api.tfl.gov.uk/line/${bus}/arrivals`;

        $.ajax({
            type: 'GET',
            url: api,
            success: dataLoaded,
            async:false
        });

       function dataLoaded(data) {
            const stops = data.filter((item)=>{
                if(item.naptanId === stopId) {
                    return true;
                } else {
                    return false;
                }
            });

            const timeNow = moment(stops[0].timestamp).format();

            const filter =  stops.map((item) => {
                if(moment(item.expectedArrival).isAfter(timeNow)) {
                    return item.expectedArrival;
                }
            });

            filter.sort();
            time = moment(filter[0]).format("HH:mm:ss");
        }

        this.setState({
            time: time,
            classTime: 'timenew'
        })

    }

    changeShow(){
        console.log('ddd')
        this.setState({
            time: '',
            classTime: 'time'
        })
    }

    componentDidMount() {
        $('#forSendBusNumber').bind('click', this.changeShow);
        $('#changeDirection').bind('click', this.changeShow);
    };

    render(){
        return  (<div className="item">
                    <div className="letter"><p>{this.props.params.stopLetter}</p></div>
                    <div className="itemName"><p>{this.props.params.name}</p></div>
                    <div stationId={this.props.params.id} onClick={this.showTime} bus={this.props.bus} className={this.state.classTime}>
                        <div>
                         {this.state.time}
                        </div>
                    </div>
            </div>)
    }
}

module.exports = StopPoint;