import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react'


const Analytics = () => {

    let [state, setState] = useState(null);

    useEffect(() => {

        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser()
                setState(response)
            } catch (err) {
                console.error(err)
                setState(null)
            }
        })()

    }, []);

    if (!state) return <AmplifyLoadingSpinner />

    return (
        <div className='Analytics'>
            Here will be analytics
        </div>
    )

}

export default Analytics