import Link from "next/link"

export default function Project (props) {
    return (
        <div className="project col-md-4">
            <Link href={`/projects/${props.project.pk}`}><p class="link">{props.project.title}</p></Link>
            <p>{props.project.language}</p>
            <p>{props.role}</p>
        </div>
    )
} 