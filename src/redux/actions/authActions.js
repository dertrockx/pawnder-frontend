import { auth } from "constants/ActionTypes"

export function login(loginType) {
    return (dispatch) => {
        dispatch({
            type: auth.LOGIN_PENDING,
            payload: {
                loginType,
            }
        });

        const hasError = false; //backend
        setTimeout(() => {
            if(hasError) {
                dispatch({
                    type: auth.LOGIN_FAILED,
                    payload: {
                        errorMessage: 'Something went wrong. Please try again later.',
                    }
                });
            } else {
                dispatch({
                    type: auth.LOGIN_COMPLETED,
                });
            }
        }, 3000);
    };
}

export function logout() {
    return {
        type: auth.LOGOUT, 
    };
}