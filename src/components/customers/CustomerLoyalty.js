import { Link } from "react-router-dom"

export const CustomerLoyalty = ({ id, name }) => {
    return <section className="customer">
                    <div>
                        <Link to={`/customers/${id}`}>Name: {name}</Link>
                    </div>
                </section>
}