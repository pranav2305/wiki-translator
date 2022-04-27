import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {SignUpURL, Host} from "../utils/constants"
import { useCookies } from "react-cookie";

const Register = () => {

    const router = useRouter();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const password1 = useRef();
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(()=> {
        const tokenCookie = document.cookie;
        if (tokenCookie) {
            router.push("/projects");
        }
    }, [])

    const registerUser = async () => {

        if (password.current.value !== password1.current.value) {
            alert("Passwords do not match");
            return;
        }

        const credentials=JSON.stringify({
            first_name: firstName.current.value,
            last_name:lastName.current.value,
            email:email.current.value,
            password1:password.current.value,
            password2:password1.current.value,
        });

        let res = "";
        
        try {
            res = await fetch(SignUpURL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "*/*",
                  "Accept-Encoding": "gzip, deflate, br",
                  Connection: "keep-alive",
                  "Content-Length": credentials.length,
                  Host: Host,
                },
                body: credentials,
            });

            if (res.status >= 300)
                throw(res);
        } 
        catch (err) {
            console.log(err);
            try {
                const response = await err.json()
                console.log(response, response.errors)
                if (response.non_field_errors)
                    alert(response.non_field_errors[0]);
                else if (response.email)
                    alert(response.email[0]);
                else if (response.password1)
                    alert(response.password1[0]);
                else if (response.password2)
                    alert(response.password2[0]);  
                else if (response.first_name)
                    alert(response.first_name[0]);
                else if (response.last_name)
                    alert(response.last_name[0]);
                else
                    alert("Error registering user");
                return;
            }
            catch {
                alert("Error registering user");
                return;
            }
        }
        if (res.ok) {
            const data = await res.json();
            setCookie("user", data.key, {
                path: "/",
                maxAge: 2592000,
                sameSite: true,
            })
            router.push("/projects");
        }
        else {
            alert("Error registering user");
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" ref={firstName} />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" ref={lastName} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" ref={email} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" ref={password} />
            </div>
            <div className="form-group">
                <label htmlFor="password1">Confirm Password</label>
                <input type="password" className="form-control" id="password1" ref={password1} />
            </div>
            <button type="button" className="btn btn-primary" onClick={registerUser}>Register</button>
        </div>
    );
}

export default Register;