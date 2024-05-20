import React from "react";
import ReactDOM from "react-dom";
import * as Components from "../components/UI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const isAuthenticated = !!localStorage.getItem("user");
const LoginSign = () => {
    const [signIn, toggle] = React.useState(true);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/todo");
        }
        
    }, [navigate]);

    const handleSignUp = () => {
        localStorage.setItem("user", JSON.stringify({ email, password }));
        navigate("/todo");
    };

    const handleSignIn = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email === email && user.password === password) {
            navigate("/todo");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="cont">
            <Components.Container>
                <Components.SignUpContainer signingIn={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Components.Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Components.Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>
                <Components.SignInContainer signingIn={signIn}>
                    <Components.Form>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Components.Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                        <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>
                <Components.OverlayContainer signingIn={signIn}>
                    <Components.Overlay signingIn={signIn}>
                        <Components.LeftOverlayPanel signingIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signingIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
};

export default LoginSign;
