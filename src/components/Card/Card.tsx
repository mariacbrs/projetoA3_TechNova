import './Card.css';

type CardProps = {
    readonly title: string;
    readonly description: string;
    readonly booking: string;
};

export function Card({ title, description, booking }: CardProps) {
    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <a href={booking} className="card-link">Agende Agora</a>
        </div>
    );
}
