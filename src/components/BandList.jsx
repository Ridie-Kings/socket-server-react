import { useEffect, useState } from "react"

import PropTypes from "prop-types";

export const BandList = ({ data, vote, deleteBand, renameBand }) => {

    const [bands, setBands] = useState(data)

    useEffect(() => {
        setBands(data)
    }, [data])

    const changeName = (e, id) => {
        const newName = e.target.value;

        setBands(bands.map(band => {
            if (band.id === id) band.name = newName;
            return band;
        }))
    }

    const onLostFocus = (id, name) => {
        console.log(id, name);
        renameBand(id, name)
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
                        <button className="button is-danger" onClick={() => deleteBand(band.id)}>Borrar</button>
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

BandList.propTypes = {
    data: PropTypes.array.isRequired,
    vote: PropTypes.func.isRequired,
    deleteBand: PropTypes.func.isRequired,
    renameBand: PropTypes.func.isRequired
}