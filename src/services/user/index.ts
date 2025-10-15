import http from "@configs/fetch"
import qs from "qs";
import { IQueryRequest } from "@models/common/request";
import { IUpdateMeBodySchema } from "@models/user/request";

const userService = {
    getMe: async () => {
        return await http.get("/auth/me", {
            next: { tags: ['userProfile'] }
        });
    },
    getUsers: async (params?: IQueryRequest & { sortBy?: string; sortOrder?: 'asc' | 'desc' }) => {
        const qsParts: string[] = [];

        // Handle sorting
        if (params?.sortBy && params?.sortOrder) {
            const prefix = params.sortOrder === 'desc' ? '-' : '';
            qsParts.push(`sort:${prefix}${params.sortBy}`);
        } else {
            // Default sort
            qsParts.push('sort:-createdAt', 'sort:-status');
        }

        if (params?.status) {
            qsParts.push(`status=${params.status}`);
        }

        if (params?.search) {
            qsParts.push(`name:like=${params.search}`);
        }

        if (params?.email) {
            qsParts.push(`email:like=${params.email}`);
        }

        const qsValue = qsParts.join(',');

        const finalParams = {
            qs: qsValue,
            currentPage: params?.page,
            pageSize: params?.limit,
        };

        const queryString = qs.stringify(finalParams, {
            skipNulls: true
        });

        return await http.get(`/user/user-list?${queryString}`, {
            next: { tags: ['modifyUser'] }
        });
    },
    updateMe: async (data: IUpdateMeBodySchema) => {
        return await http.put("/auth/me", data);
    }
}


export default userService