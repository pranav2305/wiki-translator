import ProjectUser from "../../../components/ProjectUser";
import { sendReq } from "../../../utils/requests"; 
import { ProjectURL } from "../../../utils/constants";
import { useRef } from "react";

const ProjectUsers = ({projectUsers}) => {

    const new_user = useRef();
    const new_user_role = useRef();

    const addUser = async () => {
        const tokenCookie = document.cookie;
        if (!tokenCookie) {
            router.push('/login');
        }
        const data = JSON.stringify({
            email: new_user.current.value,
            role: new_user_role.current.value
        })
        try {
            const res = await sendReq(`${ProjectURL}${projectUsers.pk}/users/add/`, tokenCookie, "POST", data);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
            router.push('/404');
        }
        
    }
    
    return (
        <div className="container">
            <h1>{projectUsers && projectUsers.title}</h1>
            <div className="users row">
                {projectUsers && projectUsers.users && projectUsers.users.length!==0 && projectUsers.users.map(user => (
                    <ProjectUser key={user.user.pk} user={user.user} role={user.role} />
                ))}
            </div>
            {projectUsers.role == "M" && <div className="add-user">
            <h2>Add user</h2>
                <div className="form-group">
                    <input type="email" id="user_email" ref={new_user}/>
                    <select name="user_roles" id="user_roles" ref={new_user_role}>
                        <option value="M">Manager</option>
                        <option value="A">Annotator</option>
                    </select>
                </div>
                <button onClick={addUser} className="btn btn-primary">Add user</button>
            </div>}
        </div>
    )
}

export default ProjectUsers;

export async function getServerSideProps({query, req, res}) {
    const tokenCookie = req.headers.cookie;
    if (!tokenCookie) {
        res.writeHead(302, {
            Location: '/login'
        });
        res.end();
    }
    var projectUsers = [];
    if (query.id) {
        try {
            projectUsers = await sendReq(`${ProjectURL}${query.id}/users/`, tokenCookie);
        }
        catch (err) {
            console.log(err);
            res.writeHead(302, {
                Location: '/404'
            });
            res.end();
        }
    }
    else {
        res.writeHead(302, {
            Location: '/404'
        });
        res.end();
    }
    return {
        props: {
            projectUsers: projectUsers
        },
    }
}