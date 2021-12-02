import React,{Component} from 'react'
import './circle.css'
class circle extends Component {
  state = {
    stroke: 0,
    percentage: (4 / 8) * 100,
    p2:false,
    }


  dashrayy_duration = () => {
    setTimeout(() => {
      this.setState({
        p2:true,
      })
    },3000)
  }


  
  circle = () => {
    var val = this.state.percentage-250;
    this.setState({
      stroke: val
    })
            }
 
  componentDidMount() {
    this.dashrayy_duration()
    setTimeout(() => {
    this.circle()
  },3000)
}

/*
  <circle style={{r:"175.5", cx:"350", cy:"350", fill:"transparent", strokeDasharray:"8", strokeDashoffset:'0px'}}></circle>
            <circle id="bar" className='bar' style={{r:"175.5",cx:"350",cy:"350", fill:"transparent", strokeDasharray:"565.48", strokeDashoffset:`${(this.state.stroke)}px`}}></circle>
     <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"/>
     
   <path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)" />
    
565.48   <circle id="bar" className='bar' style={{r:"70",cx:"125",cy:"125", fill:"transparent", strokeDasharray:"165.48", strokeDashoffset:`${175.5-(this.state.stroke)}px`}}></circle>
  


 



*/ 
    render() { 
      return (
        <div onClick={this.circle} className='blure'>

        
          

        <div id="cont" data-name="SVG Skill" className="cont" data-percent="50%" >
       
            
            <svg stroke-dasharray="565.48" stroke-dashoffset="o\0px"   id="svg-s"  style={{ width:"380", height:"380" }} viewBox="50 50 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g   stroke-width="20" transform="translate(175.5,175.5)">
        <path  d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"/>
        <path  d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"/>
        <path  d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)" />
        <path  d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"/>
        </g>
            </svg>
            
          
            <svg stroke-dasharray="-105" strokeDashoffset={`-${105 - (20)}px`}  id="svg" className='svg' style={{ width: "380", height: "380" }} viewBox="50 50 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg">
          
          <g   stroke-width="20" transform="translate(175.5,175.5)">
        <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl5)"/>
         </g>
            </svg>
         

            

            <svg width="0" height="0">
<defs>
<linearGradient id="cl1" gradientUnits="objectBoundingBox" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#15ff00" />
      <stop offset="100%" stop-color="#15ff00"/>
</linearGradient>
<linearGradient   id="cl2" gradientUnits="objectBoundingBox" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#15ff00"/>
    <stop offset="100%" stop-color="#15ff00"/>
 
</linearGradient>
<linearGradient id="cl3" gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="1">
          
<stop offset="0%" stop-color="#15ff00"/>
    <stop offset="50%" stop-color="#15ff00"/>
    <stop offset="100%" stop-color="orange" />

                </linearGradient>
                <linearGradient id="cl4" gradientUnits="objectBoundingBox" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="orange"/>
    <stop offset="50%" stop-color="red"/>
    <stop offset="100%" stop-color="rgba(255, 0, 0, 0.679)" />

</linearGradient>
<linearGradient id="cl5" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0">
    <stop stop-color="rgb(145, 145, 145)"/>
    <stop offset="100%" stop-color="rgb(145, 145, 145)"/>
</linearGradient>

<linearGradient id="cl6" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0">
<stop offset="0%" stop-color="#15ff00"/>
<stop offset="90%" stop-color="orange"/>
    <stop offset="100%" stop-color="red"/>
                </linearGradient>

</defs>
</svg>

          </div>
          <div className='percent'><span>25%</span></div>
          </div>
        );
    }
}
 
export default circle;
