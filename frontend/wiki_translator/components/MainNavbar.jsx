import { useCookies } from "react-cookie"

export default function MainNavbar () {

    const [cookies, setCookie] = useCookies(["user"]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Wiki Translator</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    {cookies.user!=null && <li className="nav-item">
                        <a className="nav-link" href="/projects">Projects</a>
                    </li>}
                    {cookies.user && <li className="nav-item">
                        <a className="nav-link" href="/projects/create">Create Project</a>
                    </li>}
                    {cookies.user && <li className="nav-item">
                        <a className="nav-link" href="/logout">Logout</a>
                    </li>}
                    {!cookies.user && <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>}
                    {!cookies.user && <li className="nav-item">
                        <a className="nav-link" href="/register">Register</a>
                    </li>}
                </ul>
                </div>
            </div>
        </nav>
    )
}