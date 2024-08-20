const API = 'https://flag-gilt.vercel.app/api/challenge'
const TOKEN = 'uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA='
const headers = new Headers()
headers.append('Authorization', `Bearer ${TOKEN}`)


const next = async (cursor) => {

    const body = cursor ? { cursor } : {}
    const res = await fetch(API, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = res.json()

    return data;

}



async function main() {

    let cursor
    for (let i = 0; i < 500; i++) {
        const res = await next(cursor)
        console.log(`Cursor[${i}]: ${res.message}`)
        cursor = res.nextCursor

        if (res.flag) {
            console.log(`result: ${res.flag}`)
            break
        }

        if (!cursor) {
            break
        }
    }
}


main()