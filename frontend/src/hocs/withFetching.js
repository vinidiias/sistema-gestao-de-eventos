import { useEffect, useState } from "react"
import Loading from "../components/Layout/Loading"

const withFetching = (Component, url) => {
    return function ComponentFetching(props) {
        const [data, setData] = useState([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)

        useEffect(() => {
            setTimeout(() => setLoading(false), 500)
        /*
            fetch(url, {
                method: 'GET',
                headers: {
                    auth: {...}
                }
            })
            .then((resp) => resp.json())
            .then((data) => setData(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
        */
        }, [])

        return <>{loading ? <Loading /> : <Component {...props} />}</>;
    }
}

export default withFetching