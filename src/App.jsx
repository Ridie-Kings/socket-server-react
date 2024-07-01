import { useState, useEffect } from "react"
import { BandAdd } from "./components/BandAdd"
import { BandList } from "./components/BandList"
import io from 'socket.io-client'

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  })
  return socket
}

function App() {

  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket])

  useEffect(() => {

    socket.on('connect', () => {
      setOnline(true);
    })

  }, [socket])

  useEffect(() => {

    socket.on('disconnect', () => {
      setOnline(false);
    })

  }, [socket])


  useEffect(() => {

    socket.on('current-bands', (bands) => {
      setBands(bands);
    })

  }, [socket])

  const vote = (id) => {
    socket.emit('vote-band', id)
  }

  const removeBand = (id) => {
    socket.emit('remove-band', id)
  }

  const renameBand = (id, name) => {
    socket.emit('rename-band', { id, name })
  }

  const createBand = (name) => {
    socket.emit('add-band', { name: name })
  }



  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:
          {
            online
              ? <span className="has-text-success">Online</span>
              : <span className="has-text-danger">Offline</span>
          }
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />

      <div className="columns">
        <div className="column is-two-thirds">
          <BandList
            data={bands}
            vote={vote}
            deleteBand={removeBand}
            renameBand={renameBand}
          />
        </div>

        <div className="column is-one-third">
          <BandAdd
            createBand={createBand}
          />
        </div>
      </div>
    </div>
  )
}

export default App
