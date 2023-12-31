import React from 'react'

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
        className='w-0 md:w-full'
    />
  )
}

export default CanvasOverLay