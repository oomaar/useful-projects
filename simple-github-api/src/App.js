import { useState, useEffect } from "react";
import { Repos } from "./components";
import {
  Application,
  Navbar,
  SearchContainer,
  Form,
  FormGroup,
  FormInput,
  FormButton,
  Card,
  CardContainer,
  Image,
  CardContent,
  CardHeader,
  CardMeta,
  Span,
} from "./styledApp";

const App = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const setData = ({ name, login, followers, following, public_repos, avatar_url }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  useEffect(() => {
    fetch(`https://api.github.com/users/example`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const handleSearch = e => {
    setUserInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}/repos`)
    // fetch(`"https://api.github.com/repos/trekhleb/angular-library-seed/forks"`)
      .then(res => res.json())
      .then(data => {
      console.log("🚀 ~ file: App.js ~ line 54 ~ App ~ data", data);
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
        };
      });
  };

  return (
    <Application>
      <Navbar>Github Search</Navbar>
      <SearchContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormInput placeholder="Github User" name="githubUser" onChange={handleSearch} />
          </FormGroup>
          <FormButton>Search</FormButton>
        </Form>
      </SearchContainer>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <Application>
          <Card>
            <CardContainer>
              <Image
                src={avatar}
              />
              <CardContent>
                <CardHeader>{name}</CardHeader>
                <CardHeader>{userName}</CardHeader>
                <CardMeta>
                  <Span>{followers} Followers</Span>
                  <Span>{following} Following</Span>
                  <Span>{repos} Repositories</Span>
                </CardMeta>
              </CardContent>
            </CardContainer>
          </Card>
          <Repos />
        </Application>
      )}
    </Application>
  );
};

export default App;
