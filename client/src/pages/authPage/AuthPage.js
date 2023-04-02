import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import Lottie from "react-lottie";
import animationData from "../../lotties/137560-sea-walk.json";

import cl from "./AuthPage.module.css";

export const AuthPage = () => {
    const { t } = useTranslation();

    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isValidLogin, setIsValidLogin] = useState(false);
    const [isValidPass, setIsValidPass] = useState(false);

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isShowVisibleButton, setIsShowVisibleButton] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    useEffect(() => {
        document
            .getElementById("email")
            .addEventListener("blur", (e) =>
                validationInputs(e.target.name, e.target.value)
            );
        document
            .getElementById("password")
            .addEventListener("blur", (e) =>
                validationInputs(e.target.name, e.target.value)
            );
    }, []);

    const toggleVisiblePassword = (event, value) => {
        event.preventDefault();
        setIsVisiblePassword(value);
    };

    document.getElementById("password");

    const changeHandler = (event) => {
        if (event.target.name === "password" && event.target.value.length > 0) {
            setIsShowVisibleButton(true);
        } else {
            setIsShowVisibleButton(false);
        }

        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const validationInputs = (inputName, inputValue) => {
        if (inputName === "email") {
            const emailInput = document.getElementById("email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            setIsValidLogin(emailRegex.test(inputValue));

            if (!emailRegex.test(inputValue) && inputValue !== "") {
                emailInput.classList.remove("valid");
                emailInput.classList.remove("invalid");

                emailInput.classList.add("invalid");
            } else if (emailRegex.test(inputValue) && inputValue !== "") {
                emailInput.classList.remove("valid");
                emailInput.classList.remove("invalid");

                emailInput.classList.add("valid");
            } else if (!(inputValue !== "")) {
                emailInput.classList.remove("valid");
                emailInput.classList.remove("invalid");
            }
        }

        if (inputName === "password") {
            if (inputValue.length >= 8) {
                setIsValidPass(true);
            } else {
                setIsValidPass(false);
            }
        }
    };

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {
                ...form,
            });
            message(data.message);
            loginHandler();
        } catch (error) {}
    };

    const loginHandler = async (e) => {
        e.preventDefault();

        if (isValidLogin && isValidPass) {
            try {
                const data = await request("/api/auth/login", "POST", {
                    ...form,
                });
                auth.login(data.token, data.userId, data.tokenExp);
            } catch (error) {}
        } else {
        }
    };

    return (
        <div className={cl.page_auth}>
            <div className={cl.container}>
                <form className="col s12">
                    <div className={`col s6 offset-s3 ${cl.container_block}`}>
                        <div className={cl.container_lottie_walker}>
                            <div className={cl.lottie_walker}>
                                <Lottie
                                    options={defaultOptions}
                                    height={100}
                                    width={100}
                                />
                            </div>
                        </div>

                        <div className={cl.titleLogo}>VLR CRM</div>
                        <div className={cl.container_main}>
                            <div className={cl.container_main_block}>
                                <span className={cl.container_block_title}>
                                    {t("Authorization")}
                                </span>
                                <div className={cl.container_block_inputs}>
                                    <div className="input-field">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="validate"
                                            onChange={changeHandler}
                                            autoComplete="username"
                                            value={form.email}
                                        />
                                        <label htmlFor="email">
                                            {t("Email")}
                                        </label>
                                        <span
                                            className="helper-text"
                                            data-error={t("Incorrect email")}
                                        ></span>
                                    </div>

                                    <div className="input-field">
                                        <input
                                            id="password"
                                            type={
                                                isVisiblePassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            className="validate"
                                            onChange={changeHandler}
                                            autoComplete="current-password"
                                            minLength="8"
                                            value={form.password}
                                        />

                                        <div className={cl.password_button}>
                                            {isShowVisibleButton ? (
                                                <button
                                                    className={
                                                        cl.toggle_visible_password
                                                    }
                                                    onMouseDown={(event) => toggleVisiblePassword(event, true)}
                                                    onMouseUp={(event) => toggleVisiblePassword(event, false)}
                                                >
                                                    &#128065;
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                        </div>

                                        <label htmlFor="password">
                                            {t("Password")}
                                        </label>
                                        <span
                                            className="helper-text"
                                            data-error={t(
                                                "Password (8 characters minimum)"
                                            )}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.action_buttons}>
                                <button
                                    className={cl.action_buttons_login}
                                    style={{ marginRight: 10 }}
                                    disabled={loading}
                                    onClick={loginHandler}
                                >
                                    {t("login")}
                                </button>

                                <button
                                    className={cl.action_buttons_register}
                                    onClick={registerHandler}
                                    disabled={loading}
                                >
                                    {t("register")}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};