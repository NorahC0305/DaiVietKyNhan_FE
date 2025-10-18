import envConfig from "@configs/env";
import { ILoginFormDataRequest } from "@models/user/request";

export async function loginWithCredentials(credentials: ILoginFormDataRequest) {
    try {
        console.log("Login service - URL:", `${envConfig?.NEXT_PUBLIC_API_URL}/auth/login`);
        console.log("Login service - credentials:", credentials);

        const response = await fetch(`${envConfig?.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        console.log("Login service - response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Login service - error response:", errorText);
            throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Login service - success data:", data);
        return data;
    } catch (error) {
        console.error("Login service error:", error);
        throw error;
    }
}
