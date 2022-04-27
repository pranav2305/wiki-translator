import { useRef, useEffect } from "react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import {LogInURL, Host} from "../utils/constants";

const Login = () => {

    useEffect(() => {
        const tokenCookie = document.cookie;
        if (tokenCookie) {
            router.push("/projects");
        }
    }, [])

    const router = useRouter();
    const [cookies, setCookie] = useCookies(['user']);
    const email = useRef();
    const password = useRef();
    const login = async () => {
        const credentials=JSON.stringify({
            email: email.current.value,
            password:password.current.value,
        });
        const response=await fetch(LogInURL,{method:'POST',headers:{
            'Content-Type': 'application/json',
            'Accept':'*/*',
            'Accept-Encoding':'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Content-Length':credentials.length,
            'Host':Host
          },body:credentials});
      
          if(response.ok){
            const data = await response.json();
            setCookie("user", data.key, {
              path: "/",
              maxAge: 2592000,
              sameSite: true,
            })
            router.push("/projects");
          }
          else{
            alert("Incorrect email or password");
          }
    };
    return (
        <div className="container">
        <h1>Login</h1>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" ref={email} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" ref={password} />
        </div>
        <button type="button" className="btn btn-primary" onClick={login}>Login</button>
        </div>
    );
}

export default Login;
