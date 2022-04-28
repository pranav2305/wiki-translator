import { useCookies } from "react-cookie"

export default function MainNavbar () {

    const [cookies, setCookie] = useCookies(["user"]);

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Wiki Translator</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                    {cookies.user!=null && <li class="nav-item">
                        <a class="nav-link" href="/projects">Projects</a>
                    </li>}
                    {cookies.user && <li class="nav-item">
                        <a class="nav-link" href="/projects/create">Create Project</a>
                    </li>}
                    {cookies.user && <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>}
                    {!cookies.user && <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>}
                    {!cookies.user && <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>}
                </ul>
                </div>
            </div>
        </nav>
    )
}