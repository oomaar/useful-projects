import { useEffect, useState } from "react";
import {
    Container,
    SearchUser,
} from "./styledRepos";

const Repos = () => {
    const [input, setInput] = useState("");
    const [forked, setForked] = useState([]);
    

    useEffect(() => {
        fetch(`https://api.github.com/repos/${input}/forks`)
            // .then(res => res.json())
            .then(data => {
                // console.log("🚀 ~ file: repos.js ~ line 15 ~ useEffect ~ data", data);
                setForked(data);
            });
    }, []);

    console.log("🚀 ~ file: repos.js ~ line 10 ~ Repos ~ forked", forked);

    return (
        <Container>
            <SearchUser value={input} onChange={e => setInput(e.target.value)} />
        </Container>
    );
};

export default Repos;
