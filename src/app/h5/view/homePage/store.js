'use strict';
import React,{Component} from 'react';
import { List, Button, Toast  } from 'antd-mobile';
import { InputLabel } from 'comp';
import { request, openurl, getUserInfo } from 'util';
import { Map, Markers, InfoWindow } from 'react-amap';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: null,
            center: null,
            position: {
                longitude: null,
                latitude: null
            },
            nickName: null,
            curVisibleWindow: false
        }
        this.markersEvents = {
            click: (MapsOption, marker) => {
                const {N,Q} = MapsOption.lnglat;
                const {nickName} = marker.Pg.extData;
                this.setState({
                    position:{
                        longitude: N,
                        latitude: Q
                    },
                    curVisibleWindow: true,
                    nickName: nickName
                });
            }
        }
    }
    componentWillMount () {
        request.userMapList({
            data:{},
            ok:(res) => {
                let data = res.data;
                if(data.length<=0) return false;
                this.setState({
                    markers:data.map(
                        item => ({
                            position: {
                                latitude:item.latitude||39.9243254649,
                                longitude:item.longitude||116.4035636823
                            },
                            nickName: item.nickName
                        })
                    ),
                    center: {
                        latitude:data[0].latitude||39.9243254649,
                        longitude:data[0].longitude||116.4035636823
                    }
                })
            }
        })
    }
    render() {
        return (
            <div className='store' style={{height: `${document.documentElement.clientHeight - 45}px`}}>
                <Map plugins={['ToolBar']} center={this.state.center} zoom={11} resizeEnable={true} events={{
                    click:()=> {this.setState({curVisibleWindow:false})}
                }}>
                    <Markers markers={this.state.markers} content={'dasdsa'} events={this.markersEvents}/>
                    <InfoWindow
                        position={this.state.position}
                        visible={this.state.curVisibleWindow}
                        isCustom
                        offset={[-5,-10]}
                    >
                        <p>{this.state.nickName}</p>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}