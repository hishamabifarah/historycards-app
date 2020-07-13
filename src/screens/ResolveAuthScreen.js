import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/authContext";
import SplashScreen from "./SplashScreen";

const ResolveAuthScreen = () => {

    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, []);

     return null;
    // return <SplashScreen/>

};

export default ResolveAuthScreen;