import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {

    const [bands, setBands] = useState([])
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        })

        return () => socket.off('current-bands')
    }, [socket])

    const changeName = (e, id) => {
        const newName = e.target.value;

        setBands(bands.map(band => {
            if (band.id === id) band.name = newName;
            return band;
        }))
    }

    const onLostFocus = (id, name) => {
        socket.emit('rename-band', { id, name })
    }

    const vote = (id) => {
        socket.emit('vote-band', id)
    }

    const removeBand = (id) => {
        socket.emit('remove-band', id)
    }


    const createRows = () => {
        return (

            bands.map((band) => (
                <tr key={band.id}>
                    <td>
                        <button
                            className="button is-primary"
                            onClick={() => vote(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        <input className="input" value={band.name} onChange={(e) => changeName(e, band.id)} onBlur={() => onLostFocus(band.id, band.name)} />

                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button className="button is-danger" onClick={() => removeBand(band.id)}>Borrar</button>
                    </td>
                </tr>
            ))

        )
    }
    return (
        <>
            <h3>Lista de Bandas</h3>

            <table className="table is-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}
