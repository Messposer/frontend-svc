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
    category_name: [
        {
            required: true,
            message: "Please enter a category name",
        }
    ],
    category_description: [
        {
            required: true,
            message: "Please input your category description",
        }
    ],
    product_name: [
        {
            required: true,
            message: "Please enter a category name",
        }
    ],
    product_description: [
        {
            required: true,
            message: "Please input your category description",
        }
    ],
    product_category: [
        {
            required: true,
            message: "Please select a category your photo belongs to",
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
    senderFromEmail: [
        {
            required: true,
            message: "Please select a from email",
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