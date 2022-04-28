export default function ProjectUser(props) {
    return (
        <div className="user col-md-4">
            <p>{props.user.first_name} {props.user.last_name}</p>
            <p>{props.user.email}</p>
            <p>{props.role}</p>
        </div>
    )
}