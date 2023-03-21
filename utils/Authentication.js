import React from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

export function Authentication() {
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribeFromAuthStatuChanged;
    }, []);

    return {
        user
    };
}