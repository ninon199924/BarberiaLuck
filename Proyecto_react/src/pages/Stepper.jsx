export default function Stepper({ steps, currentStep }) {
    return (
        <div className="stepper">
            {steps.map((step, index) => (
                <div
                    key={step}
                    className={`step ${
                        index <= currentStep ? "active" : ""
                    }`}
                >
                    <span>{index + 1}</span>
                    <p>{step}</p>
                </div>
            ))}
        </div>
    );
}