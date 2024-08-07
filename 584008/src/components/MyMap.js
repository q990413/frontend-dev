import React, { useState } from "react"
import { Map, Marker } from "pigeon-maps"

function MyMap({ latitude, longitude }) {
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  return (
    <Map height={400} width={500} defaultCenter={[latitude, longitude]} defaultZoom={3.5}>
      <Marker 
        width={50}
        anchor={[latitude, longitude]} 
        color={color} 
        onClick={() => setHue(hue + 20)} 
      />
    </Map>
  )
}

export default MyMap;
