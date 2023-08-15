import { text } from '@sveltejs/kit';

const PROXY = 'http://localhost:3000';

export async function GET({ params }) {
    // console.log('aasasasewrqw', request.json());
    const res = await fetch(`${PROXY}/${params.route}`);
    const t = await res.text();
    return text(t, { status: res.status });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }) {
    const body = await request.json();
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    const res = await fetch(`${PROXY}/${params.route}`, options);
    const t = await res.text();
    return text(t, { status: res.status });
}