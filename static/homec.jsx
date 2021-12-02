import React,{Component} from 'react'
import './homec.css'
import './circle.css'
import Circle from './circle'


//transform="translate(175.5,175.5)"  stroke-dasharray="69, 100"

class Homec extends Component {
    render() { 
        return <div className="homec">
           <div className="homex">
           <div className="homex1">
           <Circle/>
                </div>
                
            
           </div>
        </div>;
    }
}
 
export default Homec;
