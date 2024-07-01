import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {

    const [value, setValue] = useState('')
    const { socket } = useContext(SocketContext)

    const onSubmit = (e) => {
        e.preventDefault();
        if (value.trim().length > 0) {
            socket.emit('add-band', { name: value })
            setValue('');
        }
    }

    return (
        <>
            <h3>Agregar Banda</h3>

            <form onSubmit={onSubmit}>
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Añade una banda"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>

            </form>
        </>
    )
}
