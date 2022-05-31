export const isAuth = async () => {
    const resopse = await fetch('/isAuth')

    if (resopse.status !== 200) {
        throw new Error('Auth Error')
    }

    const body = await resopse.json()
    
    return body
}

export const register = async ({email, password}) => {
    const resopse = await fetch('/registration', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const body = await resopse.json()
    
    return body
}

export const login = async ({email, password}) => {

    const resopse = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (resopse.status !== 200) {
        throw new Error('Auth Error')
    }

    const body = await resopse.json()
    
    return body
}