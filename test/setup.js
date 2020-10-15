import "whatwg-fetch";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {});

afterEach(async () => {
    const session = JSON.parse(
        localStorage.getItem("app-session-local") || "{}",
    );

    if (session.jwt) {
        await fetch(`http://localhost:1337/database/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${session.jwt}`,
            },
        });
    }
});
