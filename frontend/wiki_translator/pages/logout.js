import { useEffect } from "react";
import { useCookies } from "react-cookie";
import "cookie"
import {useRouter} from "next/router";

const Logout = () => {

    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    useEffect(() => {
        if (!document.cookie && !cookie.parse(document.cookie).user) {
            router.push("/")
        }
        else{
            removeCookie("user");
            router.push("/");
        }
    }, [])

    return (
        <div></div>
    )
}

export default Logout;