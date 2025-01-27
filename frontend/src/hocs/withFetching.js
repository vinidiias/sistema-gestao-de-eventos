import { useEffect, useState } from "react"
import Loading from "../components/Layout/Loading"

const withFetching = (Component) => {
    return function ComponentFetching({url, id, ...props}) {
        const [data, setData] = useState([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)

        useEffect(() => {
        
            fetch(url, {
                method: 'GET',
                headers: {
                    auth: id
                }
            })
            .then((resp) => resp.json())
            .then((data) => setData(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
        }, [])

        return <>{loading ? <Loading /> : <Component data={data} {...props} />}</>;
    }
}

export default withFetching