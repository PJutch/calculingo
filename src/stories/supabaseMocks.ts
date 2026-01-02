import { http, HttpResponse } from 'msw';

export const supabaseHandlers = [
    http.post('*/auth/v1/token', async ({ request }) => {
        return new HttpResponse(null, { status: 400 });
    }),

    http.get('*/auth/v1/user', () => {
        return HttpResponse.json({
            id: 'TestUser',
            email: 'user@example.com',
            user_metadata: { name: 'Test User' },
            created_at: new Date().toISOString(),
        });
    }),

    http.post('*/auth/v1/logout', () => {
        return new HttpResponse(null, { status: 204 });
    }),

    http.get('*/rest/v1/collections', async ({ request }) => {
        const url = new URL(request.url);

        let data = [
            {
                id: "collection1",
                name: "Test Collection",
                user_id: "TestUser",
            }
        ]

        return HttpResponse.json(data);
    })
];