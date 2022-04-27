import { useRef } from "react";
import { LangChoicesURL,CreateProjectURL } from "../../utils/constants";
import { sendReq } from "../../utils/requests";
import { useRouter } from "next/router";

const CreateProject = ({choices}) => {

    const router = useRouter();
    const projectTitle = useRef();
    const language = useRef();

    const createProject = async () => {
        console.log(language.current)
        const project = JSON.stringify({
            title: projectTitle.current.value,
            language: language.current.value.split(',')[0]
        })
        console.log(project);
        const tokenCookie = document.cookie;
        if (!tokenCookie) {
            router.push('/login');
        }
        try {
            const new_project = await sendReq(CreateProjectURL, tokenCookie, 'POST', project);
            router.push(`/projects/${new_project.pk}`);
        }
        catch (err) {
            console.log(err);
            router.push('/404');
        }
    }

    return (
        <div className="container">
            <h1>Create Project</h1>
            <div className="form-group">
                <label htmlFor="projectTitle">Project Title</label>
                <input type="text" className="form-control" id="projectTitle" ref={projectTitle} />
            </div>
            <div className="form-group">
                <label htmlFor="language">Language</label>
                <select className="form-control" id="language" ref={language}>
                    {choices.map(choice => (
                        <option key={choices[0]} value={choices[0]}>{choice[1]}</option>
                    ))}
                </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={createProject}>Create</button>
        </div>
    )
}

export default CreateProject;

export async function getServerSideProps(context) {
    const tokenCookie = context.req.headers.cookie;
    if (!tokenCookie) {
        context.res.writeHead(302, {
            Location: '/login'
        });
        context.res.end();
    }
    let choices = [];
    try {
        choices = await sendReq(LangChoicesURL, tokenCookie);
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
            choices: choices
        },
    }
}