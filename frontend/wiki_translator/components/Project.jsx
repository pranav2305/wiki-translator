import Link from "next/link"

export default function Project (props) {
    return (
        <div className="project col-md-4">
            <div className="card-container">
                <div className="item-row">
                <p>Title: </p>
                    <Link href={`/projects/${props.project.pk}`}><p class="link">{props.project.title}</p></Link>
                </div>
                <div className="item-row">
                    <p>Language: </p>
                    <p>{props.project.language}</p>
                </div>
                <div className="item-row">
                    <p>Your Role: </p>
                    <p>{props.role}</p>
                </div>
            </div>
        </div>
    )
} 