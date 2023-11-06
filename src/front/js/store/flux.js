const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			userData: null,
			keys: [],
			values: []
		},
		actions: {
			setToken: (token) => {
				setStore({token: token})
			},
			setUserData: (data) => {
				setStore({userData: data})
			},
			addKey: (key) => {
				setStore({keys: [...getStore().keys, key]})
			},
			addValue: (value) => {
				setStore({values: [...getStore().values, value]})
			},
			removeToken: () => {
				setStore({token: null})
			}
		}
	};
};

export default getState;
