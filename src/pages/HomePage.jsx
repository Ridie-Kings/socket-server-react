import { useContext } from "react"
import { SocketContext } from "../context/SocketContext";
import { BandAdd } from "../components/BandAdd"
import { BandList } from "../components/BandList"
import { BandChart } from "../components/BandChart";

function HomePage() {

  const { online } = useContext(SocketContext)

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
        <div className="column">
          <BandChart />
        </div>
      </div>

      <div className="columns">
        <div className="column is-two-thirds">
          <BandList />
        </div>

        <div className="column is-one-third">
          <BandAdd />
        </div>
      </div>
    </div>
  )
}

export default HomePage
