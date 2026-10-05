export default function ServicioSelector({ value, onChange }) {

    const servicios = [
        "Corte",
        "Barba",
        "Corte + Barba",
        "Perfilado"
    ];

    return (

        <section>

            <h2>Servicio</h2>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >

                <option value="">
                    Seleccione un servicio
                </option>

                {servicios.map(servicio => (

                    <option
                        key={servicio}
                        value={servicio}
                    >
                        {servicio}
                    </option>

                ))}

            </select>

        </section>

    );

}