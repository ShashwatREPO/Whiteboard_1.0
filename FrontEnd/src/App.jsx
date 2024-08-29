import { useLayoutEffect, useRef, useState } from 'react'

function App() {
  const CanvasRef = useRef(null);
  const [elements , setElements] = useState([]);
  const [drawingState , setDrawingState] = useState(false);


  const LineTool = (x1,y1,x2,y2)=>{
       const canvas = CanvasRef.current;
    const ctx = canvas.getContext('2d');
    if(!ctx){
      console.log("error");
      return;
    }
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
    return {x1,y1,x2,y2};  
  }
  
  useLayoutEffect(()=>{
    const canvas = CanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0,0,canvas.width , canvas.height);

    //ctx is not passing
    elements.forEach((ele)=>{LineTool(ele.x1 , ele.y1 , ele.x2 , ele.y2)});
    
  },[elements]);

  const startDrawing = (event) =>{
    setDrawingState(true);

    const {clientX,clientY} = event;
    console.log(clientX , clientY);
    const line = LineTool(clientX , clientY , clientX , clientY);
    console.log([...elements]);
    setElements((ele)=>[...ele, line]);

  }
 
  const finishDrawing = ()=>{
    setDrawingState(false);

  }

  const draw = (event)=>{
    if(!drawingState) return;

    const {clientX , clientY} = event;
    console.log(clientX,clientY);
    const index = elements.length - 1;
    console.log(index);
    const {x1,y1} = elements[index];

    const updatedLine = LineTool(x1 , y1 , clientX , clientY);


    const copyElement = [...elements];
    copyElement[index] = updatedLine;
    setElements(copyElement);

  }


  return (
   <canvas ref={CanvasRef} width={window.innerWidth} height={window.innerHeight} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} >

   </canvas>
  )
}

export default App
