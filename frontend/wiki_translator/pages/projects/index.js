import { GetProjectsURL } from "../../utils/constants";
import { sendReq } from "../../utils/requests";

const Projects = ({projects}) => {

    return(
        <div className="container">
            <h1>Projects</h1>
            <div>
                {projects.map(project => (
                    <div key={project.project.pk}>
                        <p>{project.project.title}</p>
                        <p>{project.project.language}</p>
                        <p>{project.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects;

export async function getServerSideProps(context){
    const tokenCookie = context.req.headers.cookie;
    if (!tokenCookie) {
        context.res.writeHead(302, {
            Location: '/login'
        });
        context.res.end();
    }
    var projects = [];
    try {
        projects = await sendReq(GetProjectsURL, tokenCookie);
    }
    catch (err) {
        console.log(err);
        context.res.writeHead(302, {
            Location: '/404'
        });
        context.res.end();
    }
    
    return {
        props: {
            projects: projects
        },
    }
}
