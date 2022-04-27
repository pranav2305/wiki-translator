
export default function Project (props) {
    return (
        <div className="project">
            <p>{props.project.title}</p>
            <p>{props.project.language}</p>
            <p>{props.role}</p>
        </div>
    )
} 