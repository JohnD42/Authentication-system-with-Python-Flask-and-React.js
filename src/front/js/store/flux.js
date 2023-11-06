const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			userData: null
		},
		actions: {
			setToken: (token) => {
				setStore({token: token})
			},
			setUserData: (data) => {
				setStore({userData: data})
			}
		}
	};
};

export default getState;
