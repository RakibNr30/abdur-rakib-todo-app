const todos = [
    {
        "id": "3ed97930-69fd-4e58-a420-f1e09ed27886",
        "title": "In quis justo.",
        "details": "In congue. Etiam justo. Etiam pretium iaculis justo.",
        "priority": 10,
        "status": 2,
        "end_time": "2024-01-05T01:18:33Z",
        "created_at": "2024-03-11T06:37:45Z",
        "updated_at": "2024-03-04T18:21:46Z"
    },
    {
        "id": "3934e3b9-a78a-48b8-b442-60ba94b351aa",
        "title": "Praesent lectus.",
        "details": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "priority": 4,
        "status": 5,
        "end_time": "2023-11-06T14:02:00Z",
        "created_at": "2023-10-15T08:24:43Z",
        "updated_at": "2024-02-01T07:32:55Z"
    },
    /*{
        "id": "7487283d-f5bb-4091-9302-1eedb7780a3f",
        "title": "Morbi ut odio.",
        "details": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        "priority": 5,
        "status": 5,
        "end_time": "2023-04-16T21:26:18Z",
        "created_at": "2023-09-15T10:33:00Z",
        "updated_at": "2023-12-14T15:21:24Z"
    },
    {
        "id": "44127b98-e0d1-4e8a-9734-5b386533596a",
        "title": "Morbi ut odio.",
        "details": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        "priority": 7,
        "status": 2,
        "end_time": "2023-07-18T17:21:37Z",
        "created_at": "2024-02-21T13:38:26Z",
        "updated_at": "2023-09-12T05:21:58Z"
    },
    {
        "id": "f03f097f-b174-4af0-b60d-f4c80092ab14",
        "title": "Integer non velit.",
        "details": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "priority": 2,
        "status": 4,
        "end_time": "2023-11-12T19:27:05Z",
        "created_at": "2023-12-23T23:37:13Z",
        "updated_at": "2023-12-04T20:57:55Z"
    },
    {
        "id": "c7938abe-2aed-489e-99ae-a1a0d230a978",
        "title": "Nulla facilisi.",
        "details": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
        "priority": 2,
        "status": 4,
        "end_time": "2023-05-28T07:04:24Z",
        "created_at": "2024-01-13T10:53:47Z",
        "updated_at": "2023-08-05T01:17:57Z"
    },
    {
        "id": "02f0f59d-85bd-4694-8424-af64666441fa",
        "title": "Mauris lacinia sapien quis libero.",
        "details": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        "priority": 8,
        "status": 5,
        "end_time": "2023-07-20T22:42:29Z",
        "created_at": "2023-05-30T08:54:56Z",
        "updated_at": "2024-01-04T08:32:02Z"
    },
    {
        "id": "9dcceaa6-2cac-4d7d-8b2c-c6eb4ba08081",
        "title": "Nunc purus.",
        "details": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        "priority": 2,
        "status": 1,
        "end_time": "2023-12-13T13:19:43Z",
        "created_at": "2023-05-26T02:18:05Z",
        "updated_at": "2023-07-02T20:43:46Z"
    },
    {
        "id": "0204a076-f51f-45d5-8969-b4b8b948af02",
        "title": "Etiam justo.",
        "details": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
        "priority": 1,
        "status": 3,
        "end_time": "2023-12-30T08:28:58Z",
        "created_at": "2023-07-23T23:10:55Z",
        "updated_at": "2023-05-16T19:57:31Z"
    },
    {
        "id": "bbbaf136-077f-4d60-986d-377a3c6c45b1",
        "title": "Mauris sit amet eros.",
        "details": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
        "priority": 1,
        "status": 3,
        "end_time": "2023-03-24T16:09:28Z",
        "created_at": "2024-02-26T13:57:23Z",
        "updated_at": "2024-01-06T11:05:16Z"
    },
    {
        "id": "52cd92eb-69de-4763-97d2-53cf709eeb92",
        "title": "In hac habitasse platea dictumst.",
        "details": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
        "priority": 8,
        "status": 2,
        "end_time": "2023-08-27T10:07:06Z",
        "created_at": "2023-07-07T06:30:20Z",
        "updated_at": "2024-02-04T02:23:39Z"
    },
    {
        "id": "5e59c31e-8ca8-4aa6-9b44-fe5e2af32696",
        "title": "Etiam justo.",
        "details": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
        "priority": 9,
        "status": 5,
        "end_time": "2023-06-25T01:14:15Z",
        "created_at": "2023-09-13T13:54:17Z",
        "updated_at": "2024-01-04T14:41:01Z"
    },
    {
        "id": "96077607-a195-4d39-b179-beece0abadc1",
        "title": "Mauris lacinia sapien quis libero.",
        "details": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
        "priority": 6,
        "status": 2,
        "end_time": "2023-12-10T22:00:01Z",
        "created_at": "2023-06-16T03:01:08Z",
        "updated_at": "2023-10-24T22:54:41Z"
    },
    {
        "id": "9501859e-cd0c-440b-8088-7cc12203d1d0",
        "title": "Aenean fermentum.",
        "details": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "priority": 7,
        "status": 3,
        "end_time": "2023-11-16T05:21:21Z",
        "created_at": "2024-01-31T06:00:01Z",
        "updated_at": "2024-03-07T11:55:46Z"
    },
    {
        "id": "def6405e-a3f2-4966-b364-03fa424a202e",
        "title": "Etiam faucibus cursus urna.",
        "details": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        "priority": 8,
        "status": 3,
        "end_time": "2023-10-18T05:15:50Z",
        "created_at": "2023-03-27T03:09:39Z",
        "updated_at": "2024-01-28T09:58:22Z"
    },
    {
        "id": "8d0330f9-39fe-45f1-b3c6-f664fa8c8577",
        "title": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
        "details": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        "priority": 1,
        "status": 1,
        "end_time": "2024-02-08T13:59:41Z",
        "created_at": "2023-09-04T21:08:29Z",
        "updated_at": "2024-01-22T15:27:31Z"
    },
    {
        "id": "d5f08674-9ee7-4dfc-aa4b-3e6c36a49339",
        "title": "Nulla ac enim.",
        "details": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
        "priority": 2,
        "status": 4,
        "end_time": "2023-08-06T15:21:21Z",
        "created_at": "2023-06-07T11:23:56Z",
        "updated_at": "2023-08-07T10:21:04Z"
    },
    {
        "id": "6d3b8c3d-86fe-4b88-83bd-b807246d50fb",
        "title": "Etiam vel augue.",
        "details": "In congue. Etiam justo. Etiam pretium iaculis justo.",
        "priority": 3,
        "status": 5,
        "end_time": "2023-05-15T01:34:09Z",
        "created_at": "2023-07-03T00:03:17Z",
        "updated_at": "2023-12-17T14:51:14Z"
    },
    {
        "id": "f160ef06-957f-4f4f-a4b2-5e8a86155b26",
        "title": "Nunc nisl.",
        "details": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "priority": 10,
        "status": 3,
        "end_time": "2024-02-01T00:40:06Z",
        "created_at": "2023-04-29T01:51:36Z",
        "updated_at": "2023-03-21T21:19:06Z"
    },*/
];

export {todos}