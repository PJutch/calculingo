import { http, HttpResponse } from 'msw';

export const supabaseHandlers = [
    http.post('*/auth/v1/token', async ({ request }) => {
        return new HttpResponse(null, { status: 400 });
    }),

    http.get('*/auth/v1/user', () => {
        return HttpResponse.json({
            id: 'user1',
            email: 'user@example.com',
            user_metadata: { name: 'Test User' },
            created_at: new Date().toISOString(),
        });
    }),

    http.post('*/auth/v1/logout', () => {
        return new HttpResponse(null, { status: 204 });
    }),

    http.get('*/rest/v1/collections', async ({ request }) => {
        let data: any = [
            {
                id: "collection1",
                name: "Test Collection",
                user_id: "user1",
            }
        ];

        const url = new URL(request.url);
        if (url.searchParams.get('id') !== null) {
            data = data[0];
        }

        return HttpResponse.json(data);
    }),

    http.get('*/rest/v1/tasks', async ({ request }) => {
        let data: any = [
            {
                id: "task1",
                formula: "\\sqrt x",
                collection: "collection1",
                user_id: "user1"
            }
        ];

        const url = new URL(request.url);
        if (url.searchParams.get('id') !== null) {
            data = data[0];
        }

        return HttpResponse.json(data);
    }),

    http.get('*/rest/v1/options', async ({ request }) => {
        let data: any = [
            {
                id: "option1",
                formula: "\\frac 1 2",
                is_right: false,
                task: "task1",
                user_id: "user1"
            },
            {
                id: "option2",
                formula: "\\ln \\gamma",
                is_right: false,
                task: "task1",
                user_id: "user1"
            },
            {
                id: "option3",
                formula: "x^{0.5}",
                is_right: true,
                task: "task1",
                user_id: "user1"
            },
            {
                id: "option4",
                formula: "\\int_{-\\infty}^{\\infty}{x dx}",
                is_right: false,
                task: "task1",
                user_id: "user1"
            },
        ];

        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (id !== null) {
            data = data.filter((option: { id: string }) => option.id === id)[0];
        }

        return HttpResponse.json(data);
    }),
];