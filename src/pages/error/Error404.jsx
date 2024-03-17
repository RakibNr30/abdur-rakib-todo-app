import FrontLayout from "../../layouts/FrontLayout";

const Error404 = () => {
    return (
        <FrontLayout>
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"><span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for does’t exist.
                </p>
            </div>
        </FrontLayout>
    )
}

export default Error404;