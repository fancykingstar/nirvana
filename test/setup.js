import "whatwg-fetch";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {});

afterEach(async () => {
    const session = JSON.parse(
        localStorage.getItem("app-session-local") || "{}",
    );

    if (session.jwt) {
        // if there's a JWT, that means the test modified the database, so reset it and clear the JWT

        await fetch(`http://localhost:1337/database/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${session.jwt}`,
            },
        }).then((x) => x.json());

        localStorage.removeItem("app-session-local");
    }
});
