import { useState } from "react";
import PropTypes from "prop-types";

export const BandAdd = ({ createBand }) => {

    const [value, setValue] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        if (value.trim().length > 0) {
            createBand(value);
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

BandAdd.propTypes = {
    createBand: PropTypes.func.isRequired
}