import React from 'react'

interface BackdropProps {
    onClick: () => void;
}


function CanvasOverLay() {
    React.useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);
  return (
    <div
        style={{
            position:'absolute',
            top:'0',
            height:'110vh',
            background: 'rgba(255, 255, 255, 0.8)',
        }}
        className='w-0 md:w-[90vw]'
    />
  )
}

export default CanvasOverLay