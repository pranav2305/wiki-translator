export default function ProjectUser(props) {
    return (
        <div className="user col-md-4">
            <div className="card-container">
                <div className="item-row">
                    <p>Name: </p>
                    <p>{props.user.first_name} {props.user.last_name}</p>
                </div>
                <div className="item-row">
                    <p>Email: </p>
                    <p>{props.user.email}</p>
                </div>
                <div className="item-row">
                    <p>Role: </p>
                    <p>{props.role}</p>
                </div>
            </div>
        </div>
    )
}