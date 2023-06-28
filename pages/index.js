import { useRouter } from "next/router";
import { useEffect } from "react";
let main = "";
const Index = () => {
  const router = useRouter();
  useEffect(() => {
    const login = localStorage.getItem("login");
    let main = "signup";
    if (login === "true") {
      main = "home";
    }
    if (login === "false") {
      main = "login";
    }
    router.push("/" + main);
  }, []);

  return;
};

export default Index;
Index.getLayout = (page) => page;
