import { z } from "zod";

/**
 * Login form data request
 */
export const loginFormDataRequest = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export type LoginFormDataRequest = z.infer<typeof loginFormDataRequest>;
//-----------------End-Login-Request-----------------//