import envConfig from "@configs/env";
import { ILoginFormDataRequest } from "@models/user/request";

export async function loginWithCredentials(credentials: ILoginFormDataRequest) {
    try {
        const response = await fetch(`${envConfig?.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Login API Error Response:', errorText);

            // Parse error message from response
            let errorMessage = `Login failed: ${response.status} ${response.statusText}`;
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
                // If not JSON, use the text directly
                errorMessage = errorText || errorMessage;
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Login API Success Data:', data);
        return data;
    } catch (error: any) {
        console.error("Login service error:", error);
        throw error;
    }
}
