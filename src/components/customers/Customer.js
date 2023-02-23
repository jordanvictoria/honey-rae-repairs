import { Link } from "react-router-dom"

export const Customer = ({ id, name }) => {
    return <section className="customer">
                    <div>
                        <Link to={`/customers/${id}`}>Name: {name}</Link>
                    </div>
                </section>
}