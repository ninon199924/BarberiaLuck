import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

    return (

        <>

            <section className="hero">

                <div className="container hero-content">

                    <div>

                        <h1>
                            Barbería Luck
                        </h1>

                        <p>
                            Cortes clásicos y modernos con atención profesional.
                            Reservá tu turno de forma rápida y sencilla.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/Reservar_turno"
                                className="btn-primary"
                            >
                                Reservar turno
                            </Link>

                            <Link
                                to="/MisTurnos"
                                className="btn-secondary"
                            >
                                Mis Turnos
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            <section className="services section">

                <div className="container">

                    <h2 className="title">
                        Nuestros servicios
                    </h2>

                    <div className="cards">

                        <article className="card">
                            <h3>💈 Corte</h3>
                            <p>Cortes clásicos y modernos.</p>
                        </article>

                        <article className="card">
                            <h3>🧔 Barba</h3>
                            <p>Perfilado y arreglo profesional.</p>
                        </article>

                        <article className="card">
                            <h3>✨ Perfilado</h3>
                            <p>Terminaciones precisas.</p>
                        </article>

                    </div>

                </div>

            </section>

            <section className="benefits section">

                <div className="container">

                    <h2 className="title">
                        ¿Por qué elegirnos?
                    </h2>

                    <div className="benefit-cards">

                        <article className="benefit-card">
                            <div className="benefit-icon">📅</div>
                            <h3>Reserva online</h3>
                            <p>
                                Reservá tu turno de forma rápida y sencilla.
                            </p>
                        </article>

                        <article className="benefit-card">
                            <div className="benefit-icon">🤝</div>
                            <h3>Atención personalizada</h3>
                            <p>
                                Recibí una atención pensada para vos.
                            </p>
                        </article>

                        <article className="benefit-card">
                            <div className="benefit-icon">⏰</div>
                            <h3>Horarios flexibles</h3>
                            <p>
                                Elegí el día y horario que mejor te convenga.
                            </p>
                        </article>

                        <article className="benefit-card">
                            <div className="benefit-icon">✂️</div>
                            <h3>Profesionales</h3>
                            <p>
                                Contamos con profesionales preparados y experimentados.
                            </p>
                        </article>

                    </div>

                </div>

            </section>

        </>

    );

}
