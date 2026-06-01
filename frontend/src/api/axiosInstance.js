import axios from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

// Track if we are already refreshing
// This prevents multiple requests from all trying to refresh at the same time
let isRefreshing = false;
let failedQueue = [];

function processQueue(error) {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });
    failedQueue = [];
}

axiosInstance.interceptors.response.use(
    // ✅ Success — just return the response normally
    (response) => response,

    // ❌ Error — check if it's a 401
    async (error) => {
        const originalRequest = error.config;

        // If it's a 401 and we haven't already retried this request
        if (error.response?.status === 401 && !originalRequest._retry) {

            // If already refreshing, queue this request and wait
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => axiosInstance(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            // Mark this request as retried so we don't loop forever
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Try to get a new token
                await axiosInstance.post("/user/refresh-token");

                // Token refreshed — process any queued requests
                processQueue(null);

                // Retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // Refresh token also expired — user must login again
                processQueue(refreshError);

                // Clear the page and send to login
                window.location.href = "/login";
                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }

        // For all other errors, just reject normally
        return Promise.reject(error);
    }
);


export default axiosInstance;