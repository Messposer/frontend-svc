export const rules = {
    email: [
        {
            required: true,
            message: "Please input your email address",
        },
        // {
        //     type: "email",
        //     message: "Please enter email address in format “youremail@example.com”",
        // },
    ],
    first_name: [
        {
            required: true,
            message: "Please input your first name",
        }
    ],
    last_name: [
        {
            required: true,
            message: "Please input your last name",
        },
    ],
    number: [
        {
            required: true,
            message: "Please input your last name",
        },
    ],
    broadCastName: [
        {
            required: true,
            message: "Please input your broadcast name",
        },
    ],
    chooseBroadCastGroup: [
        {
            required: true,
            message: "Please select a broadcast group",
        },
    ],
    autoGenerate: [
        {
            required: true,
            message: "Do you want the AI to auto generate the content for you?",
        },
    ],

    useTemplate: [
        {
            required: true,
            message: "Do you want to use a template for this schedule?",
        },
    ],

    sendDate: [
        {
            required: true,
            message: "When do you want the message to go out?",
        },
    ],

    enterContent: [
        {
            required: true,
            message: "Compose your content",
        },
    ],
    enterSubject: [
        {
            required: true,
            message: "Enter a subject for this content",
        },
    ],
    enterTransporter: [
        {
            required: true,
            message: "Enter a transporter for this content",
        },
    ]
};