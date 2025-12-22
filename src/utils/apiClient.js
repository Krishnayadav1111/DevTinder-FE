import axios from 'axios';
import _get from 'lodash/get';
import { API_BASE_URL } from './constants';
import { helpingMethod } from './helpers';
import { removeUser as logout } from '../store/userSlice';

let store;

export const setAxiosStore = (reduxStore) => {
    store = reduxStore;
};

// Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Referer': API_BASE_URL,
    },
    // Ensure arrays are serialized as repeated keys without []
    // Use function form for compatibility across axios versions
    paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') return;
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item === undefined || item === null || item === '') return;
                    searchParams.append(key, String(item));
                });
            } else {
                searchParams.append(key, String(value));
            }
        });
        return searchParams.toString();
    },
});

// Interceptor (REQUEST)
apiClient.interceptors.request.use(
    (config) => {
        const storeData = store ? store.getState() : {};
        // Adjust based on your Redux slice structure
        // Assuming 'user' slice contains the auth info
        const user = _get(storeData, "user");
        const token = user?.token; // Adjust property name if needed (e.g. accessToken)

        const { contentType } = config;

        // Store skipToast flag for response interceptor
        const requestData = config.data || {};
        const requestParams = config.params || {};

        // Handle skipToast for both FormData (string values) and regular objects (boolean values)
        let skipToast = false;

        if (requestData instanceof FormData) {
            // For FormData, check if skipToast exists and has truthy value
            skipToast =
                requestData.has('skipToast') &&
                (requestData.get('skipToast') === 'true' || requestData.get('skipToast') === true);
        } else {
            // For regular objects, check boolean or string values
            skipToast =
                requestData.skipToast === true ||
                requestData.skipToast === 'true' ||
                requestParams.skipToast === true ||
                requestParams.skipToast === 'true';
        }

        // Store skipToast flag in config for response interceptor
        config._skipToast = skipToast;

        // Set content-type for multipart uploads
        if (contentType === 'MULTIPART') {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        // Set Authorization token
        config.headers.accept = `application/json`;
        if (token) {
            // config.headers.Authorization = `Bearer ${token}`;
            // Some simple apps might use just the token or a specific header
            // But standard is Bearer
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Note: If you use cookie-based auth, you might need { withCredentials: true } in create()

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor (RESPONSE)
apiClient.interceptors.response.use(
    (response) => {
        // Handle successful responses - show success toast for POST, PUT, DELETE
        const method = response.config?.method?.toLowerCase();

        // Check if skipToast flag was set during request or in response payload
        const skipToast = response.config?._skipToast === true || response.data?.skipToast === true;
        // If API explicitly returns success=false (or misspelled sucess=false), show error toast with message
        const apiSuccessFlag =
            (Object.prototype.hasOwnProperty.call(response.data || {}, 'success') ? response.data.success : undefined) ??
            (Object.prototype.hasOwnProperty.call(response.data || {}, 'sucess') ? response.data.sucess : undefined);

        if (!skipToast && apiSuccessFlag === false) {
            const apiErrorMsg = response.data?.message || response.data?.msg || 'Request failed';
            helpingMethod.showToaster(apiErrorMsg, 'error');
            return response;
        }
        if (!skipToast && ['post', 'put', 'delete', 'patch'].includes(method)) {
            const successMessage =
                response.data?.msg ||
                (method === 'post'
                    ? 'Created successfully'
                    : method === 'put'
                        ? 'Updated successfully'
                        : method === 'delete'
                            ? 'Deleted successfully'
                            : 'Updated successfully');

            // Only show toaster if we have a specific message or it's a mutation
            // helpingMethod.showToaster(successMessage, 'success');

            // Original code showed success toast for all these methods.
            // But we should be careful not to spam if no message is provided.
            // However the snippet explicitly does this.
            if (response.data?.message || response.data?.msg) {
                helpingMethod.showToaster(successMessage, 'success');
            }
        }

        return response;
    },
    (error) => {
        const status = _get(error, 'response.status');
        const reqData = _get(error, 'response.data');
        const errorMessage = reqData?.message || reqData?.msg || error.message || 'Unknown error';
        const errorList = Array.isArray(reqData?.errors) ? reqData.errors : [];

        switch (status) {
            case 401:
                // Handle unauthorized errors - dispatch logout
                if (store) {
                    store.dispatch(logout());
                }
                helpingMethod.showToaster(errorMessage || 'Session expired. Please login again.', 'error');
                // You might want to redirect here as well if you have access to router
                break;

            case 409:
                helpingMethod.showToaster(errorMessage || 'Conflict error', 'error');
                break;

            default:
                // Show toast for other errors unless explicitly skipped
                if (!reqData?.skipToastMsg) {
                    if (errorList.length > 0) {
                        errorList.forEach((msg) => {
                            const text = typeof msg === 'string' ? msg : String(msg);
                            helpingMethod.showToaster(text, 'error');
                        });
                    } else {
                        helpingMethod.showToaster(errorMessage || 'Something went wrong', 'error');
                    }
                }
                break;
        }

        return Promise.reject({
            message: errorMessage,
            status,
            data: reqData,
        });
    }
);

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await apiClient({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                });
                return { data: result.data };
            } catch (axiosError) {
                const err = axiosError;
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };

export default apiClient;
