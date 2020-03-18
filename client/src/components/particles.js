import React from 'react';
import Particles from 'react-particles-js';

class ParticleComponent extends React.Component{
    render(){
        return(
            <div style={{backgroundColor:"#ffffff", position:"absolute", top:0, left:0, width:"100%", height:"100%"}}>
            <Particles
                params={{
                    "particles": {
                        "color": {
                            "value": "ed8be8"
                        },
                        "number": {
                            "value": 50
                        },
                        "size": {
                            "value": 3
                        },
                        "line_linked": {
                            "color": '44b5ea'
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }}
            />
            </div>
        )
    }
}

export default ParticleComponent;