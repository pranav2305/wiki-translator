import { GetProjectsURL } from "../../utils/constants";
import { sendReq } from "../../utils/requests";
import Project from "../../components/Project";

const Projects = ({projects}) => {

    return(
        <div className="container">
            <h1>Projects</h1>
            <div>
                {projects.map(project => (
                    <Project key={project.project.pk} project={project.project} role={project.role} />
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
